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
import { ScDateTimeSegment } from '../segmented-input/date-time-segment';
import {
  SC_SEGMENTED_INPUT,
  SC_SEGMENTED_INPUT_TEMPLATE,
  type ScDateTimeFields,
  ScSegmentedInput,
  scHourCycle,
} from '../segmented-input/segmented-input';

/** A part of the time: its hour, minute, second, or AM/PM. */
export type ScTimeInputPart = 'hour' | 'minute' | 'second' | 'dayPeriod';

/**
 * A time, typed part by part — hour, minute (second), AM/PM — in the order,
 * the separators and the clock of its locale. Each part is an input (a
 * spin button, the number pad on a phone): digits fill it and move on,
 * the arrows step it, Backspace takes a digit back. A `[formField]`:
 * `Temporal.PlainTime`, or `null` until every part is filled. Named by its
 * `scField`'s label.
 */
@Component({
  selector: 'div[scTimeInput]',
  exportAs: 'scTimeInput',
  imports: [NgTemplateOutlet, ScDateTimeSegment],
  // Its parts (scDateTimeSegment) read it, and hand it what is typed.
  providers: [{ provide: SC_SEGMENTED_INPUT, useExisting: ScTimeInput }],
  template: SC_SEGMENTED_INPUT_TEMPLATE,
  host: { 'data-slot': 'time-input' },
  encapsulation: ViewEncapsulation.None,
})
export class ScTimeInput
  extends ScSegmentedInput<Temporal.PlainTime>
  implements FormValueControl<Temporal.PlainTime | null>
{
  /** The time: `[formField]` or `[(value)]`; `null` until every part is filled. */
  readonly value = model<Temporal.PlainTime | null>(null);
  /** A 12- or 24-hour clock; the locale's by default. */
  readonly hourCycle = input<12 | 24 | undefined>(undefined);
  /** The smallest part it shows. */
  readonly granularity = input<'hour' | 'minute' | 'second'>('minute');
  /** The hour always in two digits (`09`); the locale's way by default. */
  override readonly leadingZeros = input(false, {
    transform: booleanAttribute,
  });
  /** The earliest time; an earlier one is marked invalid. */
  readonly minTime = input<Temporal.PlainTime | undefined>(undefined);
  /** The latest time; a later one is marked invalid. */
  readonly maxTime = input<Temporal.PlainTime | undefined>(undefined);

  readonly current = this.value;

  protected readonly formatOptions = computed<Intl.DateTimeFormatOptions>(
    () => {
      const granularity = this.granularity();
      return {
        hour: 'numeric',
        minute: granularity === 'hour' ? undefined : '2-digit',
        second: granularity === 'second' ? '2-digit' : undefined,
        hourCycle: scHourCycle(this.locale, this.hourCycle()),
      };
    },
  );

  /** Outside `minTime` / `maxTime`. */
  readonly outOfRange = computed(() => {
    const value = this.value();
    const min = this.minTime();
    const max = this.maxTime();
    return (
      !!value &&
      ((!!min && Temporal.PlainTime.compare(value, min) < 0) ||
        (!!max && Temporal.PlainTime.compare(value, max) > 0))
    );
  });

  protected write(value: Temporal.PlainTime | null): void {
    this.value.set(value);
  }

  protected fromFields(fields: ScDateTimeFields): Temporal.PlainTime | null {
    if (fields.hour === undefined) return null;
    const granularity = this.granularity();
    return Temporal.PlainTime.from(
      {
        hour: fields.hour,
        minute: granularity === 'hour' ? 0 : (fields.minute ?? 0),
        second: granularity === 'second' ? (fields.second ?? 0) : 0,
      },
      { overflow: 'reject' },
    );
  }

  protected fieldsOf(value: Temporal.PlainTime): ScDateTimeFields {
    return { hour: value.hour, minute: value.minute, second: value.second };
  }

  protected fromIso(text: string): Temporal.PlainTime | null {
    if (!/^\d{2}:\d{2}(:\d{2})?$/.test(text)) return null;
    return this.fromFields(this.fieldsOf(Temporal.PlainTime.from(text)));
  }

  protected same(a: Temporal.PlainTime, b: Temporal.PlainTime): boolean {
    return a.equals(b);
  }
}
