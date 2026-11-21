import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  LOCALE_ID,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { ScPopoverProvider } from '../popover';
import { ScTimeInput, type ScTimeInputPart } from '../time-input';
import {
  SC_TIME_COLUMNS,
  type ScTimeColumnsHost,
  type ScTimePickerValue,
  scTimeColumnValues,
  scTimeEnabled,
} from './time-columns';
import { ScTimePickerTrigger } from './time-picker-trigger';

type DurationFormat = new (
  locale: string,
  options: { style: 'short' },
) => { format(duration: Record<string, number>): string };

/**
 * A time — typed in its `scTimeInput`, or picked in columns (hour | minute
 * (| second) | AM/PM, `scTimePickerColumns`) in a popover. The value, the
 * locale, the clock and the limits are the time input's: put `[formField]`
 * on it. A pick sets its part at once, as typing does; Enter, Escape or a
 * click outside closes, focus back on the trigger. For a range's end,
 * `startTime`: earlier times can't be picked, and the duration
 * (`scTimePickerDuration`) counts from it.
 */
@Directive({
  selector: 'div[scTimePicker]',
  exportAs: 'scTimePicker',
  // Its columns (scTimePickerColumns) read it, and set its time input's parts.
  providers: [{ provide: SC_TIME_COLUMNS, useExisting: ScTimePicker }],
  host: {
    'data-slot': 'time-picker',
    '[class]': 'class()',
  },
})
export class ScTimePicker implements ScTimeColumnsHost {
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Minutes between the minute column's values. */
  readonly minuteStep = input(1);
  /** Seconds between the second column's values. */
  readonly secondStep = input(1);
  /** A range's start: earlier times can't be picked; the duration counts from it. */
  readonly startTime = input<Temporal.PlainTime | undefined>(undefined);

  /** The time input: the value, the locale, the clock, the limits. */
  readonly timeInput = contentChild.required(ScTimeInput, {
    descendants: true,
  });
  private readonly popover = contentChild(ScPopoverProvider, {
    descendants: true,
  });
  private readonly trigger = contentChild(
    forwardRef(() => ScTimePickerTrigger),
    { descendants: true, read: ElementRef<HTMLElement> },
  );

  /** The columns' values, by part. */
  readonly values = computed(() =>
    scTimeColumnValues(
      this.timeInput().twelveHours(),
      this.minuteStep(),
      this.secondStep(),
    ),
  );

  /** The input the columns set: its time input. */
  readonly segmentedInput = computed(() => this.timeInput());

  /** The earliest time that can be picked: the later of `minTime` and `startTime`. */
  private readonly earliest = computed(() => {
    const min = this.timeInput().minTime();
    const start = this.startTime();
    if (!min || !start) return min ?? start;
    return Temporal.PlainTime.compare(min, start) > 0 ? min : start;
  });

  /** How long from `startTime` to the value — in the locale's words; empty without both. */
  readonly duration = computed(() => {
    const start = this.startTime();
    const value = this.timeInput().value();
    if (!start || !value || Temporal.PlainTime.compare(value, start) <= 0)
      return '';
    const { hours, minutes, seconds } = start.until(value);
    const Format = (Intl as unknown as { DurationFormat?: DurationFormat })
      .DurationFormat;
    const parts = {
      ...(hours ? { hours } : {}),
      ...(minutes ? { minutes } : {}),
      ...(seconds ? { seconds } : {}),
    };
    if (Format)
      return new Format(this.locale, { style: 'short' }).format(parts);
    // No Intl.DurationFormat: each unit by itself.
    return Object.entries(parts)
      .map(([unit, amount]) =>
        new Intl.NumberFormat(this.locale, {
          style: 'unit',
          unit: unit.slice(0, -1),
          unitDisplay: 'short',
        }).format(amount),
      )
      .join(' ');
  });

  private readonly class = computed(() => cn('block', this.classInput()));

  constructor() {
    // Closed: touched — and focus back on the trigger if it was in the
    // panel, which leaves after its animation (Safari does not focus a
    // clicked button: there is nothing for the panel to restore).
    const document = inject(DOCUMENT);
    let wasOpen = false;
    effect(() => {
      const open = this.popover()?.open() ?? false;
      untracked(() => {
        if (wasOpen && !open) {
          this.timeInput().touch.emit();
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

  /** A part's value picked in its column: set, as typed. */
  pick(type: ScTimeInputPart, value: ScTimePickerValue): void {
    this.timeInput().ɵset(type, value);
  }

  /** The current time, on the steps — and closed. */
  now(): void {
    const now = Temporal.Now.plainTimeISO();
    const granularity = this.timeInput().granularity();
    const minuteStep = Math.max(1, this.minuteStep());
    const secondStep = Math.max(1, this.secondStep());
    this.timeInput().value.set(
      Temporal.PlainTime.from({
        hour: now.hour,
        minute:
          granularity === 'hour' ? 0 : now.minute - (now.minute % minuteStep),
        second:
          granularity === 'second' ? now.second - (now.second % secondStep) : 0,
      }),
    );
    this.close();
  }

  /** Closes the popover. */
  close(): void {
    this.popover()?.open.set(false);
  }

  /**
   * A value can be picked: some time with it — and the other parts as they
   * are — falls within `minTime` (or `startTime`) and `maxTime`.
   */
  enabled(type: ScTimeInputPart, value: ScTimePickerValue): boolean {
    const input = this.timeInput();
    return scTimeEnabled(
      type,
      value,
      input.parts(),
      input.twelveHours(),
      this.earliest(),
      input.maxTime(),
    );
  }
}
