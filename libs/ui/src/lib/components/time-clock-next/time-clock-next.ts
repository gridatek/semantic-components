import {
  Directive,
  ElementRef,
  LOCALE_ID,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import { scHourCycle } from '../segmented-input/segmented-input';

/** What the dial shows: the hours, the minutes or the seconds. */
export type ScTimeClockNextView = 'hours' | 'minutes' | 'seconds';

/**
 * A time picked on a clock face — the hour, then the minute (then the second)
 * — by pointer (mouse, touch, pen: click or drag) or keyboard. Each pick moves
 * on to the next view, as the pickers do. The numbers are the locale's; 12
 * hours with AM/PM, or 24 with 13–00 on an inner ring. A `[formField]`:
 * `Temporal.PlainTime`, or `null`. Its parts write their own content:
 * `scTimeClockNextHeader`, `scTimeClockNextDial`.
 */
@Directive({
  selector: 'div[scTimeClockNext]',
  exportAs: 'scTimeClockNext',
  host: {
    'data-slot': 'time-clock',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScTimeClockNext implements FormValueControl<Temporal.PlainTime | null> {
  private readonly locale = inject(LOCALE_ID);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The time: `[formField]` or `[(value)]`. */
  readonly value = model<Temporal.PlainTime | null>(null);
  /** What the dial shows; each pick moves on to the next. */
  readonly view = model<ScTimeClockNextView>('hours');
  /** A 12- or 24-hour clock; the locale's by default. */
  readonly hourCycle = input<12 | 24 | undefined>(undefined);
  /** The smallest part it picks. */
  readonly granularity = input<'hour' | 'minute' | 'second'>('minute');
  /** Minutes between the ones that can be picked. */
  readonly minuteStep = input(1);
  /** Seconds between the ones that can be picked. */
  readonly secondStep = input(1);
  /** The earliest time that can be picked. */
  readonly minTime = input<Temporal.PlainTime | undefined>(undefined);
  /** The latest time that can be picked. */
  readonly maxTime = input<Temporal.PlainTime | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** 12 hours (with AM/PM), or 24. */
  readonly twelveHours = computed(
    () => scHourCycle(this.locale, this.hourCycle()) === 'h12',
  );

  /** The views it has, in order. */
  readonly views = computed<ScTimeClockNextView[]>(() => {
    const granularity = this.granularity();
    if (granularity === 'hour') return ['hours'];
    if (granularity === 'minute') return ['hours', 'minutes'];
    return ['hours', 'minutes', 'seconds'];
  });

  /** It can't be changed: disabled or read-only. */
  readonly locked = computed(() => this.disabled() || this.readonly());

  private readonly formatter = computed(() => {
    const granularity = this.granularity();
    return new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: granularity === 'hour' ? undefined : '2-digit',
      second: granularity === 'second' ? '2-digit' : undefined,
      hourCycle: this.twelveHours() ? 'h12' : 'h23',
    });
  });

  /** The time as the locale writes it — the dial's `aria-valuetext`. */
  readonly text = computed(() => {
    const value = this.value();
    return value ? this.formatter().format(value) : '';
  });

  private readonly parts = computed(() =>
    this.formatter().formatToParts(
      this.value() ?? Temporal.PlainTime.from('12:00'),
    ),
  );

  /** The part a view shows, as the locale writes it — or the empty mark. */
  partText(view: ScTimeClockNextView): string {
    if (!this.value()) return '––';
    const type =
      view === 'hours' ? 'hour' : view === 'minutes' ? 'minute' : 'second';
    return this.parts().find((part) => part.type === type)?.value ?? '';
  }

  /** The text between the hour and the minute (`:`, ` h `…). */
  readonly separator = computed(() => {
    const parts = this.parts();
    const hour = parts.findIndex((p) => p.type === 'hour');
    return parts[hour + 1]?.type === 'literal' ? parts[hour + 1].value : ':';
  });

  /** AM or PM, as the locale writes it. */
  periodText(period: 'am' | 'pm'): string {
    return (
      new Intl.DateTimeFormat(this.locale, {
        hour: 'numeric',
        hourCycle: 'h12',
      })
        .formatToParts(
          Temporal.PlainTime.from(period === 'am' ? '09:00' : '21:00'),
        )
        .find((part) => part.type === 'dayPeriod')?.value ?? period
    );
  }

  /** Each view's name, in the locale's words. */
  readonly names = computed(() => {
    const names = new Intl.DisplayNames(this.locale, {
      type: 'dateTimeField',
    });
    return {
      hours: names.of('hour') ?? '',
      minutes: names.of('minute') ?? '',
      seconds: names.of('second') ?? '',
    } as Record<ScTimeClockNextView, string>;
  });

  /** The numbers on the dial, in the locale's digits. */
  readonly number = computed(() => ({
    plain: new Intl.NumberFormat(this.locale, { useGrouping: false }),
    padded: new Intl.NumberFormat(this.locale, {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
  }));

  /** AM until noon — the value's, or AM. */
  readonly period = computed<'am' | 'pm'>(() =>
    (this.value()?.hour ?? 0) < 12 ? 'am' : 'pm',
  );

  private readonly class = computed(() =>
    cn('inline-flex flex-col items-center gap-3', this.classInput()),
  );

  /** Minutes, or seconds, between the ones that can be picked. */
  stepOf(view: 'minutes' | 'seconds'): number {
    const step = Math.round(
      view === 'minutes' ? this.minuteStep() : this.secondStep(),
    );
    return step > 0 && step <= 60 ? step : 1;
  }

  /** Some time from `from` to `to` falls within `minTime` / `maxTime`. */
  private within(from: Temporal.PlainTime, to: Temporal.PlainTime): boolean {
    const min = this.minTime();
    const max = this.maxTime();
    return (
      (!min || Temporal.PlainTime.compare(to, min) >= 0) &&
      (!max || Temporal.PlainTime.compare(from, max) <= 0)
    );
  }

  /** An hour with some time in it that can be picked. */
  canPickHour(hour: number): boolean {
    return this.within(
      Temporal.PlainTime.from({ hour }),
      Temporal.PlainTime.from({ hour, minute: 59, second: 59 }),
    );
  }

  /** A minute on its step, in the value's hour, that can be picked. */
  canPickMinute(minute: number): boolean {
    if (minute % this.stepOf('minutes') !== 0) return false;
    const hour = this.value()?.hour ?? 0;
    return this.within(
      Temporal.PlainTime.from({ hour, minute }),
      Temporal.PlainTime.from({ hour, minute, second: 59 }),
    );
  }

  /** A second on its step, in the value's minute, that can be picked. */
  canPickSecond(second: number): boolean {
    if (second % this.stepOf('seconds') !== 0) return false;
    const value = this.value();
    const time = Temporal.PlainTime.from({
      hour: value?.hour ?? 0,
      minute: value?.minute ?? 0,
      second,
    });
    return this.within(time, time);
  }

  /** A period with at least one hour that can be picked. */
  canPickPeriod(period: 'am' | 'pm'): boolean {
    const start = period === 'pm' ? 12 : 0;
    return [...Array(12).keys()].some((i) => this.canPickHour(start + i));
  }

  /** The hour (0–23): the minute and second kept — or the earliest that can be picked. */
  setHour(hour: number): void {
    if (!this.canPickHour(hour)) return;
    const value = this.value();
    const kept = Temporal.PlainTime.from({
      hour,
      minute: value?.minute ?? 0,
      second: value?.second ?? 0,
    });
    if (this.within(kept, kept)) {
      this.value.set(kept);
      return;
    }
    const minuteStep = this.stepOf('minutes');
    for (let minute = 0; minute < 60; minute += minuteStep) {
      const time = Temporal.PlainTime.from({ hour, minute });
      if (this.within(time, time.with({ second: 59 }))) {
        const min = this.minTime();
        this.value.set(
          min && Temporal.PlainTime.compare(time, min) < 0 ? min : time,
        );
        return;
      }
    }
  }

  setMinute(minute: number): void {
    if (!this.canPickMinute(minute)) return;
    const value = this.value();
    const time = Temporal.PlainTime.from({
      hour: value?.hour ?? 0,
      minute,
      second: this.granularity() === 'second' ? (value?.second ?? 0) : 0,
    });
    this.value.set(this.within(time, time) ? time : time.with({ second: 0 }));
  }

  setSecond(second: number): void {
    if (!this.canPickSecond(second)) return;
    const value = this.value();
    this.value.set(
      Temporal.PlainTime.from({
        hour: value?.hour ?? 0,
        minute: value?.minute ?? 0,
        second,
      }),
    );
  }

  /** AM or PM: the hour moved by twelve — or the nearest that can be picked. */
  setPeriod(period: 'am' | 'pm'): void {
    const hour = this.value()?.hour ?? 0;
    const target = (hour % 12) + (period === 'pm' ? 12 : 0);
    if (target === hour && this.value()) return;
    const start = period === 'pm' ? 12 : 0;
    const next = [...Array(12).keys()]
      .map((i) => start + i)
      .sort((a, b) => Math.abs(a - target) - Math.abs(b - target))
      .find((h) => this.canPickHour(h));
    if (next !== undefined) this.setHour(next);
  }

  /** A view's value picked: on to the next view, as the pickers do. */
  moveOn(): void {
    const views = this.views();
    const next = views[views.indexOf(this.view()) + 1];
    if (next) this.view.set(next);
  }

  private onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.contains(next)) this.touch.emit();
  }
}
