import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import type { ScCalendarRange } from '../calendar';
import { ScDateTimeSegment } from '../segmented-input/date-time-segment';
import {
  SC_SEGMENTED_INPUT,
  SC_SEGMENTED_INPUT_TEMPLATE,
  type ScDateTimeFields,
  ScSegmentedInput,
} from '../segmented-input/segmented-input';
import { SC_DATE_INPUT_HOST } from './date-input-host';

/**
 * A date, typed part by part — day, month, year — in the order and with the
 * separators of its locale. Each part is an input (a spin button, the number
 * pad on a phone): digits fill it and move on, the arrows step it, Backspace
 * takes a digit back. A `[formField]`: `Temporal.PlainDate`, or `null` until
 * every part is filled. Named by its `scField`'s label. In a date picker it
 * is the picker's value — a range's end with `part`.
 */
@Component({
  selector: 'div[scDateInput]',
  exportAs: 'scDateInput',
  imports: [NgTemplateOutlet, ScDateTimeSegment],
  // Its parts (scDateTimeSegment) read it, and hand it what is typed.
  providers: [{ provide: SC_SEGMENTED_INPUT, useExisting: ScDateInput }],
  template: SC_SEGMENTED_INPUT_TEMPLATE,
  host: { 'data-slot': 'date-input' },
  encapsulation: ViewEncapsulation.None,
})
export class ScDateInput
  extends ScSegmentedInput<Temporal.PlainDate>
  implements FormValueControl<Temporal.PlainDate | null>
{
  /** Its Date Picker or Date Range Input, if any: the value and the limits are its. */
  private readonly picker = inject(SC_DATE_INPUT_HOST, { optional: true });

  /** The date: `[formField]` or `[(value)]`; `null` until every part is filled. In a date picker, the picker's. */
  readonly value = model<Temporal.PlainDate | null>(null);
  /** In a date picker's range: the end it is. */
  readonly part = input<'start' | 'end' | undefined>(undefined);
  // TODO(angular): minDate / maxDate go once Signal Forms' min() / max()
  // take Temporal dates (docs/todo.md, "Date bounds from the form").
  // Angular: https://github.com/angular/angular/issues/67643
  /** The first day; an earlier one is marked invalid (in a picker: the picker's). */
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  /** The last day; a later one is marked invalid (in a picker: the picker's). */
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);
  /** Days that can't be picked — weekends, holidays: marked invalid. */
  readonly unavailable = input<(date: Temporal.PlainDate) => boolean>(
    () => false,
  );

  /** Read-only — or its date range input is. */
  override readonly isReadonly = computed(
    () => this.readonly() || !!this.picker?.readonlyState?.(),
  );
  /** Required — or its date range input is. */
  override readonly isRequired = computed(
    () => this.required() || !!this.picker?.requiredState?.(),
  );
  /** Disabled — or its date picker is. */
  override readonly isDisabled = computed(
    () => this.disabled() || !!this.picker?.disabled(),
  );

  override readonly id = computed(
    () =>
      this.idInput() ||
      (this.part() === 'end' ? null : this.field?.id()) ||
      null,
  );

  /** Its day: its value — or, in a date picker, the picker's (a range's end). */
  readonly date = computed<Temporal.PlainDate | null>(() => {
    if (!this.picker) return this.value();
    const value = this.picker.value();
    const part = this.part();
    if (!part) return value instanceof Temporal.PlainDate ? value : null;
    const range = value as ScCalendarRange | null;
    return (part === 'start' ? range?.from : range?.to) ?? null;
  });
  readonly current = this.date;

  protected readonly formatOptions = computed<Intl.DateTimeFormatOptions>(
    () => ({ year: 'numeric', month: '2-digit', day: '2-digit' }),
  );

  /** Not a day that can be picked: outside the limits, unavailable — or a range's end on the wrong side. */
  readonly outOfRange = computed(() => {
    const date = this.date();
    if (!date) return false;
    if (this.picker) {
      if (!this.picker.canPick(date)) return true;
      const range = this.picker.value() as ScCalendarRange | null;
      if (this.part() === 'end' && range?.from)
        return Temporal.PlainDate.compare(date, range.from) < 0;
      if (this.part() === 'start' && range?.to)
        return Temporal.PlainDate.compare(date, range.to) > 0;
      return false;
    }
    const min = this.minDate();
    const max = this.maxDate();
    return (
      (!!min && Temporal.PlainDate.compare(date, min) < 0) ||
      (!!max && Temporal.PlainDate.compare(date, max) > 0) ||
      this.unavailable()(date)
    );
  });

  override readonly showInvalid = computed(
    () =>
      this.outOfRange() ||
      (this.picker
        ? this.picker.showInvalid()
        : this.invalid() && this.touched()),
  );

  override onTouched(): void {
    if (this.picker) this.picker.touch.emit();
    else this.touch.emit();
  }

  /** The day, written: its value — or the picker's (a range's end). */
  protected write(date: Temporal.PlainDate | null): void {
    if (!this.picker) {
      this.value.set(date);
      return;
    }
    const part = this.part();
    if (!part) {
      this.picker.value.set(date);
      return;
    }
    const range = this.picker.value() as ScCalendarRange | null;
    const next =
      part === 'start'
        ? { from: date ?? undefined, to: range?.to }
        : { from: range?.from, to: date ?? undefined };
    this.picker.value.set(next.from || next.to ? next : null);
  }

  protected fromFields(fields: ScDateTimeFields): Temporal.PlainDate | null {
    if (!fields.year || !fields.month || !fields.day) return null;
    return Temporal.PlainDate.from(
      { year: fields.year, month: fields.month, day: fields.day },
      { overflow: 'reject' },
    );
  }

  protected fieldsOf(value: Temporal.PlainDate): ScDateTimeFields {
    return { year: value.year, month: value.month, day: value.day };
  }

  protected fromIso(text: string): Temporal.PlainDate | null {
    return /^\d{4}-\d{2}-\d{2}$/.test(text)
      ? Temporal.PlainDate.from(text)
      : null;
  }

  protected same(a: Temporal.PlainDate, b: Temporal.PlainDate): boolean {
    return a.equals(b);
  }
}
