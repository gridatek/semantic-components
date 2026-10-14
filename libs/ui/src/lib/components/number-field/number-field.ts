import {
  Component,
  DestroyRef,
  InjectionToken,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { bindInput } from '../../utils';
import { ScField } from '../field';
import {
  decimalPlaces,
  numberFormatter,
  parseNumber,
} from './number-field-format';

export const SC_NUMBER_FIELD = new InjectionToken<ScNumberField>(
  'SC_NUMBER_FIELD',
);

/** How long an announced value stays in the live region (as the APG's). */
const ANNOUNCEMENT_DURATION = 2000;

/** How big a step: Alt for `smallStep`, Shift (or Page Up / Down) for `largeStep`. */
export type ScNumberFieldStepSize = 'small' | 'normal' | 'large';

/**
 * A number field, as Base UI's NumberField: holds the value — a number or
 * none — its bounds and steps, and formats it for the locale. Its parts:
 * `scNumberFieldInput`, `scNumberFieldIncrement` / `scNumberFieldDecrement` (in a
 * `scNumberFieldGroup`), `scNumberFieldScrubArea`. A Signal Forms control: bind
 * `[formField]` here (`min` / `max` / `required` / `disabled` come from the
 * schema). It is a `scField` too (label, description and errors are tied
 * to the input), whose `id`, `orientation` and `class` it takes. With a
 * `name`, a hidden input submits the value as a plain number ("1234.5", not
 * the "1.234,50 €" shown).
 */
@Component({
  selector: 'div[scNumberField]',
  exportAs: 'scNumberField',
  hostDirectives: [
    { directive: ScField, inputs: ['id', 'orientation', 'class'] },
  ],
  providers: [{ provide: SC_NUMBER_FIELD, useExisting: ScNumberField }],
  host: {
    'data-slot': 'number-field',
    '[attr.data-readonly]': 'readonly() || null',
  },
  template: `
    <ng-content />
    <span class="sr-only" role="status" data-slot="number-field-status">{{
      announcement()
    }}</span>
    @if (name()) {
      <input
        type="hidden"
        [name]="name()"
        [value]="value() ?? ''"
        [disabled]="disabled()"
      />
    }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ScNumberField implements FormValueControl<number | null> {
  private readonly field = inject(ScField);

  readonly value = model<number | null>(null);
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);
  /** The arrow keys' and buttons' step. */
  readonly step = input(1);
  /** With Alt held. */
  readonly smallStep = input(0.1);
  /** With Shift held, and Page Up / Page Down. */
  readonly largeStep = input(10);
  /** Steps land on multiples of `step` (from `min`, or 0). */
  readonly snapOnStep = input(false, { transform: booleanAttribute });
  /** The locale the value is written and read in (the browser's by default). */
  readonly locale = input<string | undefined>(undefined);
  /** How the value is written (currency, percent, unit, decimals…). */
  readonly format = input<Intl.NumberFormatOptions>({});
  /** The mouse wheel steps the value while the input has focus. */
  readonly allowWheelScrub = input(false, { transform: booleanAttribute });

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  readonly name = input('');

  /** Focus left the input (Signal Forms marks the field touched). */
  readonly touch = output<void>();
  /** The value was committed: on blur, Enter, a step, the end of a scrub. */
  readonly valueCommitted = output<number | null>();

  /** The input's id (the buttons control it), set by `scNumberFieldInput`. */
  readonly inputId = signal<string | null>(null);
  /** Commits what's being typed before a step (set by `scNumberFieldInput`). */
  flushInput: () => void = () => undefined;
  /** Focuses the input (set by `scNumberFieldInput`). */
  focusInput: (options?: FocusOptions) => void = () => undefined;

  /** Focuses the input — Signal Forms does, to show an invalid field. */
  focus(options?: FocusOptions): void {
    this.focusInput(options);
  }

  /**
   * The value a button stepped to, read out (a live region: focus is on the
   * button, not the input); cleared after a while.
   */
  protected readonly announcement = signal('');
  private announcementTimeout: ReturnType<typeof setTimeout> | undefined;

  /** Reads the value out (the buttons do, after a step). */
  announce(): void {
    this.announcement.set(this.formattedValue());
    clearTimeout(this.announcementTimeout);
    this.announcementTimeout = setTimeout(
      () => this.announcement.set(''),
      ANNOUNCEMENT_DURATION,
    );
  }

  readonly formatter = computed(() =>
    numberFormatter(this.locale(), this.format()),
  );

  /** The value as written, for `aria-valuetext` and the input. */
  readonly formattedValue = computed(() => this.formatValue(this.value()));

  /** Whether the value can still go up / down. */
  readonly canIncrement = computed(() => {
    if (this.disabled() || this.readonly()) return false;
    const value = this.value();
    const max = this.max();
    return value === null || max === undefined || value < max;
  });
  readonly canDecrement = computed(() => {
    if (this.disabled() || this.readonly()) return false;
    const value = this.value();
    const min = this.min();
    return value === null || min === undefined || value > min;
  });

  /** The step for a size, or for the keys held during an event. */
  stepSize(size: ScNumberFieldStepSize | KeyboardEvent | MouseEvent): number {
    const kind =
      typeof size === 'string'
        ? size
        : size.shiftKey
          ? 'large'
          : size.altKey
            ? 'small'
            : 'normal';
    return kind === 'large'
      ? this.largeStep()
      : kind === 'small'
        ? this.smallStep()
        : this.step();
  }

  increment(amount = this.step()): void {
    this.stepBy(amount);
  }

  decrement(amount = this.step()): void {
    this.stepBy(-amount);
  }

  /** Moves the value by an amount (from the min, or 0, when empty). */
  stepBy(amount: number): void {
    if (this.disabled() || this.readonly()) return;
    const current = this.value();
    let next: number;
    if (current === null) {
      // From none: the minimum, or 0 (kept within the bounds).
      next = this.min() ?? 0;
    } else if (this.snapOnStep()) {
      const base = this.min() ?? 0;
      const size = Math.abs(amount);
      const steps = (current - base) / size;
      // To the next multiple that way (or one step on from one).
      const snapped =
        amount > 0 ? Math.floor(steps + 1e-9) + 1 : Math.ceil(steps - 1e-9) - 1;
      next = base + snapped * size;
    } else {
      next = current + amount;
    }
    this.setValue(this.round(next, amount));
    this.valueCommitted.emit(this.value());
  }

  /** To the minimum / maximum (Home / End). */
  toMin(): void {
    const min = this.min();
    if (min === undefined || this.disabled() || this.readonly()) return;
    this.setValue(min);
    this.valueCommitted.emit(this.value());
  }

  toMax(): void {
    const max = this.max();
    if (max === undefined || this.disabled() || this.readonly()) return;
    this.setValue(max);
    this.valueCommitted.emit(this.value());
  }

  /** Sets the value, kept within the bounds (none for null). */
  setValue(value: number | null): void {
    if (this.disabled() || this.readonly()) return;
    if (value === null || Number.isNaN(value)) {
      this.value.set(null);
      return;
    }
    const min = this.min();
    const max = this.max();
    let clamped = value;
    if (min !== undefined && clamped < min) clamped = min;
    if (max !== undefined && clamped > max) clamped = max;
    this.value.set(clamped);
  }

  /** The value written in the locale and format ('' for none). */
  formatValue(value: number | null): string {
    return value === null ? '' : this.formatter().format(value);
  }

  /** Text read as a number (null when empty, NaN when not a number). */
  parse(text: string): number | null {
    return parseNumber(text, this.formatter());
  }

  /** Rid of floating point noise (0.1 + 0.2): to the decimals in play. */
  private round(value: number, step: number): number {
    const decimals = Math.max(
      decimalPlaces(step),
      decimalPlaces(this.value() ?? 0),
      decimalPlaces(this.min() ?? 0),
    );
    return Number(value.toFixed(Math.min(decimals, 20)));
  }

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.announcementTimeout));
    // The field's state follows the number's (`data-disabled`, `data-invalid`).
    bindInput(this.field.disabledInput, this.disabled);
    bindInput(
      this.field.invalidInput,
      computed(() => this.invalid() && this.touched()),
    );
  }
}
