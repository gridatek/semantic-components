import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  model,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { ɵchosenHourCycle } from '../../utils';
import { ScDateTimeSegment } from '../segmented-input/date-time-segment';
import {
  SC_SEGMENTED_INPUT,
  SC_SEGMENTED_INPUT_TEMPLATE,
  type ScDateTimeFields,
  ScSegmentedInput,
  scHourCycle,
} from '../segmented-input/segmented-input';

/**
 * A date and a time, typed part by part — day, month, year, hour, minute
 * (second), AM/PM — in the order, the separators and the clock of its locale
 * ("11/02/2026, 2:30 PM"). Each part is an input (a spin button, the number
 * pad on a phone), as in the Date and Time Inputs. A `[formField]`:
 * `Temporal.PlainDateTime`, or `null` until every part is filled. Named by
 * its `scField`'s label. In a `scDateTimePicker` the picker reads it.
 */
@Component({
  selector: 'div[scDateTimeInput]',
  exportAs: 'scDateTimeInput',
  imports: [NgTemplateOutlet, ScDateTimeSegment],
  // Its parts (scDateTimeSegment) read it, and hand it what is typed.
  providers: [{ provide: SC_SEGMENTED_INPUT, useExisting: ScDateTimeInput }],
  template: SC_SEGMENTED_INPUT_TEMPLATE,
  host: { 'data-slot': 'date-time-input' },
  encapsulation: ViewEncapsulation.None,
})
export class ScDateTimeInput
  extends ScSegmentedInput<Temporal.PlainDateTime>
  implements FormValueControl<Temporal.PlainDateTime | null>
{
  /** The date and time: `[formField]` or `[(value)]`; `null` until every part is filled. */
  readonly value = model<Temporal.PlainDateTime | null>(null);
  /** The user's clock, if they chose one: before this part's `hourCycle`. */
  private readonly chosenHourCycle = ɵchosenHourCycle();
  /** A 12- or 24-hour clock; the locale's by default. */
  readonly hourCycle = input<12 | 24 | undefined>(undefined);
  /** The smallest part it shows. */
  readonly granularity = input<'hour' | 'minute' | 'second'>('minute');
  /** The hour always in two digits (`09`); the locale's way by default. */
  override readonly leadingZeros = input(false, {
    transform: booleanAttribute,
  });
  // TODO(angular): the bounds go once Signal Forms' min() / max() take
  // Temporal values (docs/todo.md, "Date bounds from the form").
  /** The earliest date and time; an earlier one is marked invalid. */
  readonly minDateTime = input<Temporal.PlainDateTime | undefined>(undefined);
  /** The latest date and time; a later one is marked invalid. */
  readonly maxDateTime = input<Temporal.PlainDateTime | undefined>(undefined);
  /** Days that can't be picked — weekends, holidays: marked invalid. */
  readonly unavailable = input<(date: Temporal.PlainDate) => boolean>(
    () => false,
  );

  readonly current = this.value;

  readonly formatOptions = computed<Intl.DateTimeFormatOptions>(() => {
    const granularity = this.granularity();
    return {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: granularity === 'hour' ? undefined : '2-digit',
      second: granularity === 'second' ? '2-digit' : undefined,
      hourCycle: scHourCycle(
        this.locale,
        this.hourCycle(),
        this.chosenHourCycle(),
      ),
    };
  });

  /** Outside `minDateTime` / `maxDateTime`, or on an unavailable day. */
  readonly outOfRange = computed(() => {
    const value = this.value();
    if (!value) return false;
    const min = this.minDateTime();
    const max = this.maxDateTime();
    return (
      (!!min && Temporal.PlainDateTime.compare(value, min) < 0) ||
      (!!max && Temporal.PlainDateTime.compare(value, max) > 0) ||
      this.unavailable()(value.toPlainDate())
    );
  });

  write(value: Temporal.PlainDateTime | null): void {
    this.value.set(value);
  }

  fromFields(fields: ScDateTimeFields): Temporal.PlainDateTime | null {
    if (
      !fields.year ||
      !fields.month ||
      !fields.day ||
      fields.hour === undefined
    )
      return null;
    const granularity = this.granularity();
    return Temporal.PlainDateTime.from(
      {
        year: fields.year,
        month: fields.month,
        day: fields.day,
        hour: fields.hour,
        minute: granularity === 'hour' ? 0 : (fields.minute ?? 0),
        second: granularity === 'second' ? (fields.second ?? 0) : 0,
      },
      { overflow: 'reject' },
    );
  }

  fieldsOf(value: Temporal.PlainDateTime): ScDateTimeFields {
    return {
      year: value.year,
      month: value.month,
      day: value.day,
      hour: value.hour,
      minute: value.minute,
      second: value.second,
    };
  }

  fromIso(text: string): Temporal.PlainDateTime | null {
    if (!/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?$/.test(text)) return null;
    return this.fromFields(
      this.fieldsOf(Temporal.PlainDateTime.from(text.replace(' ', 'T'))),
    );
  }

  same(a: Temporal.PlainDateTime, b: Temporal.PlainDateTime): boolean {
    return a.equals(b);
  }
}
