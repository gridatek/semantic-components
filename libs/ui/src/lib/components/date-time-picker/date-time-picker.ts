import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import type { ScCalendarValue } from '../calendar';
import { ScDateTimeInput } from '../date-time-input/date-time-input';
import { ScPopoverProvider } from '../popover';
import type { ScTimeInputPart } from '../time-input';
import {
  SC_TIME_COLUMNS,
  type ScTimeColumnsHost,
  type ScTimePickerValue,
  scTimeColumnValues,
  scTimeEnabled,
} from '../time-picker/time-columns';
import { ScTimePickerColumns } from '../time-picker/time-picker-columns';
import { ScDateTimePickerTrigger } from './date-time-picker-trigger';

/**
 * A date and a time — typed in its `scDateTimeInput`, or picked in a popover:
 * the day in your `scCalendar`, the time in the Time Picker's columns
 * (`scTimePickerColumns`) beside it. The value, the locale, the clock and the
 * limits are the input's: put `[formField]` on it. A day picked sets the date
 * parts, a time the time's — at once, as typing does; the popover stays open
 * for the other. Enter in the columns, Escape or a click outside closes it,
 * focus back on the trigger.
 */
@Directive({
  selector: 'div[scDateTimePicker]',
  exportAs: 'scDateTimePicker',
  // The time columns (scTimePickerColumns) read it, and set its input's parts.
  providers: [{ provide: SC_TIME_COLUMNS, useExisting: ScDateTimePicker }],
  host: {
    'data-slot': 'date-time-picker',
    '[class]': 'class()',
  },
})
export class ScDateTimePicker implements ScTimeColumnsHost {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Minutes between the minute column's values. */
  readonly minuteStep = input(1);
  /** Seconds between the second column's values. */
  readonly secondStep = input(1);
  /** A day picked moves on to the time, each time pick to the next column; the popover closes once the value is whole. False: it stays open until Enter, Escape or a click outside. */
  readonly closeOnPick = input(true, { transform: booleanAttribute });

  /** The date-time input: the value, the locale, the clock, the limits. */
  readonly dateTimeInput = contentChild.required(ScDateTimeInput, {
    descendants: true,
  });
  private readonly popover = contentChild(ScPopoverProvider, {
    descendants: true,
  });
  /** The time columns, in the popover: a day picked moves on to them. */
  private readonly timeColumns = contentChild(ScTimePickerColumns, {
    descendants: true,
  });
  private readonly trigger = contentChild(
    forwardRef(() => ScDateTimePickerTrigger),
    { descendants: true, read: ElementRef<HTMLElement> },
  );

  /** The time columns beside the calendar: as tall as it. */
  readonly fillHeight = true;

  /** The input the time columns set. */
  readonly segmentedInput = computed(() => this.dateTimeInput());

  /** The columns' values, by part. */
  readonly values = computed(() =>
    scTimeColumnValues(
      this.dateTimeInput().twelveHours(),
      this.minuteStep(),
      this.secondStep(),
    ),
  );

  /** The calendar's day: the input's date parts, once whole. */
  readonly date = computed(() => {
    const { year, month, day } = this.dateTimeInput().parts();
    return year && month && day
      ? Temporal.PlainDate.from({ year, month, day })
      : null;
  });
  /** The calendar's first day: the input's `minDateTime`'s. */
  readonly minDate = computed(() =>
    this.dateTimeInput().minDateTime()?.toPlainDate(),
  );
  /** The calendar's last day: the input's `maxDateTime`'s. */
  readonly maxDate = computed(() =>
    this.dateTimeInput().maxDateTime()?.toPlainDate(),
  );
  /** The calendar's unavailable days: the input's. */
  readonly unavailable = computed(() => this.dateTimeInput().unavailable());

  private readonly class = computed(() => cn('block', this.classInput()));

  constructor() {
    // Closed: touched — and focus back on the trigger if it was in the
    // panel (Safari does not focus a clicked button).
    const document = inject(DOCUMENT);
    let wasOpen = false;
    effect(() => {
      const open = this.popover()?.open() ?? false;
      untracked(() => {
        if (wasOpen && !open) {
          this.dateTimeInput().touch.emit();
          const active = document.activeElement;
          if (
            !active ||
            active === document.body ||
            active.closest('.cdk-overlay-container')
          )
            this.trigger()?.nativeElement.focus();
        }
        wasOpen = open;
      });
    });
  }

  /** The calendar's `(valueChange)`: the day picked sets the date parts — and on to the time. */
  pickDate(value: ScCalendarValue): void {
    if (!(value instanceof Temporal.PlainDate)) return;
    this.dateTimeInput().ɵsetParts({
      year: value.year,
      month: value.month,
      day: value.day,
    });
    // On to the time.
    this.timeColumns()?.focusFirst();
  }

  /** A time's part picked in its column: set, as typed. */
  pick(type: ScTimeInputPart, value: ScTimePickerValue): void {
    this.dateTimeInput().ɵset(type, value);
  }

  /** Closes the popover. */
  close(): void {
    this.popover()?.open.set(false);
  }

  /**
   * A time's value can be picked: on the day chosen, some time with it falls
   * within `minDateTime` and `maxDateTime`. A day outside them: none.
   */
  enabled(type: ScTimeInputPart, value: ScTimePickerValue): boolean {
    const input = this.dateTimeInput();
    const day = this.date();
    const min = input.minDateTime();
    const max = input.maxDateTime();
    if (!day || (!min && !max)) return true;
    const compare = Temporal.PlainDate.compare;
    if (min && compare(day, min.toPlainDate()) < 0) return false;
    if (max && compare(day, max.toPlainDate()) > 0) return false;
    return scTimeEnabled(
      type,
      value,
      input.parts(),
      input.twelveHours(),
      min && compare(day, min.toPlainDate()) === 0
        ? min.toPlainTime()
        : undefined,
      max && compare(day, max.toPlainDate()) === 0
        ? max.toPlainTime()
        : undefined,
    );
  }
}
