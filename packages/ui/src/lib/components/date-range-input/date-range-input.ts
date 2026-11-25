import {
  Directive,
  ElementRef,
  HostAttributeToken,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import type { ScCalendarRange, ScCalendarValue } from '../calendar';
import {
  SC_DATE_INPUT_HOST,
  type ScDateInputHost,
} from '../date-input/date-input-host';
import { SC_FIELD } from '../field';

/**
 * A range of days, typed: your two `scDateInput`s — `part="start"` and
 * `part="end"`, named by you — and what you put between them, in one box. Its
 * value is `{ from, to }`: each end writes its side once whole. A
 * `[formField]`. An end on the wrong side, or a day outside the limits, is
 * marked invalid. In a Date Range Picker, the value and the limits are the
 * picker's.
 */
@Directive({
  selector: 'div[scDateRangeInput]',
  exportAs: 'scDateRangeInput',
  // Its two ends (scDateInput) write into it, not into each other.
  providers: [
    {
      provide: SC_DATE_INPUT_HOST,
      useFactory: () => inject(ScDateRangeInput).ɵends,
    },
  ],
  host: {
    'data-slot': 'date-range-input',
    role: 'group',
    '[attr.id]': 'id()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.data-disabled]': 'isDisabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
    '[attr.data-invalid]': 'markedInvalid() || null',
    '[attr.data-empty]': 'current() === null || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScDateRangeInput implements FormValueControl<ScCalendarRange | null> {
  private readonly field = inject(SC_FIELD, { optional: true });
  /** A Date Range Picker it is in: the value and the limits are its. */
  private readonly picker = inject(SC_DATE_INPUT_HOST, {
    optional: true,
    skipSelf: true,
  });
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly styles = injectStyle().segmentedInput;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  readonly labelledByInput = input('', { alias: 'aria-labelledby' });

  /** The range: `[formField]` or `[(value)]` — `{ from, to }`, or `null`. In a picker, the picker's. */
  readonly value = model<ScCalendarRange | null>(null);
  // TODO(angular): the bounds go once Signal Forms' min() / max() take
  // Temporal dates (docs/todo.md, "Date bounds from the form").
  /** The first day, for both ends; an earlier one is marked invalid. */
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  /** The last day, for both ends; a later one is marked invalid. */
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);
  /** Days that can't be picked, at either end: marked invalid. */
  readonly unavailable = input<(date: Temporal.PlainDate) => boolean>(
    () => false,
  );
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it — both ends (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** The range now: its own — or its picker's. */
  readonly current = computed<ScCalendarRange | null>(() => {
    const value = this.picker ? this.picker.value() : this.value();
    return value &&
      !(value instanceof Temporal.PlainDate) &&
      !Array.isArray(value)
      ? (value as ScCalendarRange)
      : null;
  });

  /** Disabled — or its picker is. */
  readonly isDisabled = computed(
    () => this.disabled() || !!this.picker?.disabled(),
  );

  /** Invalid once touched — or its picker's. */
  private readonly showInvalid = computed(() =>
    this.picker ? this.picker.showInvalid() : this.invalid() && this.touched(),
  );

  /** An end can't be picked, or they're the wrong way round. */
  readonly outOfRange = computed(() => {
    const range = this.current();
    if (!range) return false;
    const { from, to } = range;
    return (
      (!!from && !this.canPick(from)) ||
      (!!to && !this.canPick(to)) ||
      (!!from && !!to && Temporal.PlainDate.compare(to, from) < 0)
    );
  });

  private readonly markedInvalid = computed(
    () => this.outOfRange() || this.showInvalid(),
  );

  private readonly id = computed(
    () => this.idInput() || this.field?.id() || null,
  );
  private readonly labelledBy = computed(
    () =>
      this.labelledByInput() ||
      (this.field && !this.ariaLabel ? `${this.field.id()}-label` : null),
  );

  /** What its ends write into: this range, read and written — their leaving is the range's to say. */
  readonly ɵends: ScDateInputHost = {
    value: Object.assign(
      computed<ScCalendarValue>(() => this.current()),
      { set: (value: ScCalendarValue) => this.write(value) },
    ),
    disabled: this.isDisabled,
    readonlyState: computed(() => this.readonly()),
    requiredState: computed(() => this.required()),
    showInvalid: this.showInvalid,
    canPick: (date) => this.canPick(date),
    // Leaving one end for the other is not leaving the range: onFocusOut says.
    touch: { emit: () => undefined },
  };

  private readonly class = computed(() =>
    cn(
      this.styles.root,
      'gap-1',
      // In an input group: the group draws the box.
      'in-data-[slot=input-group]:h-full in-data-[slot=input-group]:w-auto in-data-[slot=input-group]:flex-1 in-data-[slot=input-group]:rounded-none in-data-[slot=input-group]:border-0 in-data-[slot=input-group]:bg-transparent in-data-[slot=input-group]:shadow-none in-data-[slot=input-group]:ring-0 in-data-[slot=input-group]:has-[:focus-visible]:ring-0 in-data-[slot=input-group]:data-invalid:ring-0 dark:in-data-[slot=input-group]:bg-transparent',
      this.classInput(),
    ),
  );

  /** A day within the limits — the picker's, or its own — not unavailable. */
  canPick(date: Temporal.PlainDate): boolean {
    if (this.picker) return this.picker.canPick(date);
    const min = this.minDate();
    const max = this.maxDate();
    return (
      (!min || Temporal.PlainDate.compare(date, min) >= 0) &&
      (!max || Temporal.PlainDate.compare(date, max) <= 0) &&
      !this.unavailable()(date)
    );
  }

  /** Empties both ends. */
  clear(): void {
    this.write(null);
  }

  /** Focus on the start's first part (Signal Forms calls it, for an error). */
  focus(options?: FocusOptions): void {
    this.host
      .querySelector<HTMLElement>('[data-slot="date-time-segment"]')
      ?.focus(options);
  }

  private write(value: ScCalendarValue): void {
    const range = (value as ScCalendarRange | null) ?? null;
    if (this.picker) this.picker.value.set(range);
    else this.value.set(range);
  }

  private onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && this.host.contains(next)) return;
    if (this.picker) this.picker.touch.emit();
    else this.touch.emit();
  }
}
