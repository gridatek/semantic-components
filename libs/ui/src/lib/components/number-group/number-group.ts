import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  DestroyRef,
  InjectionToken,
  LOCALE_ID,
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
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { bindInput } from '../../utils';
import { ScField } from '../field';
import { decimalPlaces, numberFormatter, parseNumber } from './number-format';

export const SC_NUMBER_GROUP = new InjectionToken<ScNumberGroup>(
  'SC_NUMBER_GROUP',
);

/** How long an announced value stays in the live region (as the APG's). */
const ANNOUNCEMENT_DURATION = 2000;

/** How big a step: Alt for `smallStep`, Shift (or Page Up / Down) for `largeStep`. */
export type ScNumberStepSize = 'small' | 'normal' | 'large';

/** How the group lays out the input and its buttons. */
export type ScNumberGroupVariant = 'split' | 'stacked';

const stacked = cn(
  'grid grid-cols-[1fr_auto] grid-rows-[1.5rem_1.5rem] *:focus-visible:relative *:focus-visible:z-10',
  // The input spans both rows, its text at the start.
  '*:data-[slot=number-input]:col-start-1 *:data-[slot=number-input]:row-span-2 *:data-[slot=number-input]:row-start-1',
  '*:data-[slot=number-input]:h-auto *:data-[slot=number-input]:rounded-e-none *:data-[slot=number-input]:text-start',
  // Increment over decrement, each a row (24px: the minimum target size).
  '*:data-[slot=number-increment]:col-start-2 *:data-[slot=number-increment]:row-start-1',
  '*:data-[slot=number-increment]:h-auto *:data-[slot=number-increment]:rounded-s-none *:data-[slot=number-increment]:rounded-b-none *:data-[slot=number-increment]:border-s-0',
  '*:data-[slot=number-decrement]:col-start-2 *:data-[slot=number-decrement]:row-start-2',
  '*:data-[slot=number-decrement]:h-auto *:data-[slot=number-decrement]:rounded-s-none *:data-[slot=number-decrement]:rounded-t-none *:data-[slot=number-decrement]:border-s-0 *:data-[slot=number-decrement]:border-t-0',
);

/** One focus (or invalid) ring round the input and its buttons, not the input's own. */
const ring = cn(
  'rounded-lg',
  'has-[[data-slot=number-input]:focus-visible]:ring-3 has-[[data-slot=number-input]:focus-visible]:ring-ring/50',
  'has-[[data-slot=number-input][aria-invalid=true]]:ring-3 has-[[data-slot=number-input][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot=number-input][aria-invalid=true]]:ring-destructive/40',
  '*:data-[slot=number-input]:focus-visible:ring-0 *:data-[slot=number-input]:aria-invalid:ring-0',
);

/**
 * A number input, as Base UI's NumberField: the input and its buttons, joined
 * with one focus ring, holding the value — a number or none — its bounds and
 * steps, formatted for the locale. A Signal Forms control: bind `[formField]`
 * here (`min` / `max` / `required` / `disabled` come from the schema). In a
 * `scField`, as any input: its label, description and errors; a
 * `scNumberScrubArea` round the label reaches it through the field. With a
 * `name`, a hidden input submits the value as a plain number ("1234.5", not
 * the "1.234,50 €" shown). `split` (the default): decrement, input,
 * increment, in the order written. `stacked`: the input, then increment over
 * decrement — whatever the order written.
 */
@Component({
  selector: 'div[scNumberGroup]',
  exportAs: 'scNumberGroup',
  providers: [{ provide: SC_NUMBER_GROUP, useExisting: ScNumberGroup }],
  host: {
    'data-slot': 'number-group',
    role: 'group',
    '[attr.data-variant]': 'variant()',
    '[attr.data-readonly]': 'readonly() || null',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
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
export class ScNumberGroup implements FormValueControl<number | null> {
  private readonly controlGroupStyles = injectStyle().controlGroup;
  private readonly announcer = inject(LiveAnnouncer);
  /** The field it is in (its label, descriptions, errors). */
  private readonly field = inject(ScField, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScNumberGroupVariant>('split');

  private readonly class = computed(() =>
    cn(
      this.variant() === 'stacked'
        ? stacked
        : this.controlGroupStyles({ orientation: 'horizontal' }),
      ring,
      this.classInput(),
    ),
  );

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
  /** The locale: `LOCALE_ID` — the app's, or one provided for this section. */
  private readonly locale = inject(LOCALE_ID);
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

  /** The input's id (the buttons control it), set by `scNumberInput`. */
  readonly inputId = signal<string | null>(null);
  /** Commits what's being typed before a step (set by `scNumberInput`). */
  flushInput: () => void = () => undefined;
  /** Focuses the input (set by `scNumberInput`). */
  focusInput: (options?: FocusOptions) => void = () => undefined;

  /** Focuses the input — Signal Forms does, to show an invalid field. */
  focus(options?: FocusOptions): void {
    this.focusInput(options);
  }

  /**
   * Reads out the value a button stepped to (the buttons do: focus is on the
   * button, not the input) — through the page's live region (CDK's
   * announcer), cleared after a while: not a region of its own in the group,
   * whose first and last children are its buttons (their corners).
   */
  announce(): void {
    void this.announcer.announce(
      this.formattedValue(),
      'polite',
      ANNOUNCEMENT_DURATION,
    );
  }

  readonly formatter = computed(() =>
    numberFormatter(this.locale, this.format()),
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
  stepSize(size: ScNumberStepSize | KeyboardEvent | MouseEvent): number {
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
    // The field it is in: its state follows the number's (`data-disabled`,
    // `data-invalid`), and its scrub area (around the label, outside this
    // group) reaches it.
    const field = this.field;
    if (field) {
      bindInput(field.disabledInput, this.disabled);
      bindInput(
        field.invalidInput,
        computed(() => this.invalid() && this.touched()),
      );
      field.control.set(this);
      inject(DestroyRef).onDestroy(() => {
        if (field.control() === this) field.control.set(null);
      });
    }
  }
}
