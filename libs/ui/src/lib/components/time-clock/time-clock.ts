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
import { cn } from '../../utils/cn/cn';

export type ScTimeClockView = 'hours' | 'minutes';

/**
 * A time picked on a clock face: the hour, then the minute — by pointer or
 * keyboard on its dial (`scTimeClockDial`), its header (`scTimeClockHeader`)
 * showing the time and switching the view. 12 or 24 hours, as the locale
 * has it. A `[formField]`: `Temporal.PlainTime`, or `null`.
 */
@Directive({
  selector: 'div[scTimeClock]',
  exportAs: 'scTimeClock',
  host: {
    'data-slot': 'time-clock',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScTimeClock implements FormValueControl<Temporal.PlainTime | null> {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  readonly value = model<Temporal.PlainTime | null>(null);
  /** Hours or minutes on the dial. */
  readonly view = model<ScTimeClockView>('hours');
  /** The language: its numbers, its 12 or 24 hours; the app's by default. */
  readonly locale = input(inject(LOCALE_ID));
  /** 12 or 24 hours; the locale's by default. */
  readonly hourCycle = input<'h12' | 'h23' | undefined>(undefined);
  /** Minutes between the minutes that can be picked. */
  readonly step = input(1);
  /** The earliest time that can be picked. */
  readonly minTime = input<Temporal.PlainTime | undefined>(undefined);
  /** The latest time that can be picked. */
  readonly maxTime = input<Temporal.PlainTime | undefined>(undefined);
  /** On to the minutes once an hour is picked. */
  readonly autoAdvance = input(true, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** 12 hours (with AM/PM), or 24. */
  readonly twelveHours = computed(() => {
    const cycle =
      this.hourCycle() ??
      new Intl.DateTimeFormat(this.locale(), {
        hour: 'numeric',
      }).resolvedOptions().hourCycle;
    return cycle === 'h11' || cycle === 'h12';
  });

  private readonly formatter = computed(
    () =>
      new Intl.DateTimeFormat(this.locale(), {
        hour: 'numeric',
        minute: '2-digit',
        hourCycle: this.twelveHours() ? 'h12' : 'h23',
      }),
  );

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
  /** The hour, the text between, the minute — as the locale writes them. */
  readonly hourText = computed(() => (this.value() ? this.part('hour') : '––'));
  readonly minuteText = computed(() =>
    this.value() ? this.part('minute') : '––',
  );
  readonly separator = computed(() => {
    const parts = this.parts();
    const hour = parts.findIndex((p) => p.type === 'hour');
    return parts[hour + 1]?.type === 'literal' ? parts[hour + 1].value : ':';
  });

  /** AM or PM, as the locale writes it. */
  periodText(period: 'am' | 'pm'): string {
    return (
      this.formatter()
        .formatToParts(
          Temporal.PlainTime.from(period === 'am' ? '09:00' : '21:00'),
        )
        .find((part) => part.type === 'dayPeriod')?.value ?? period
    );
  }

  /** Each part's name, in the locale's words. */
  readonly names = computed(() => {
    const names = new Intl.DisplayNames(this.locale(), {
      type: 'dateTimeField',
    });
    return { hours: names.of('hour') ?? '', minutes: names.of('minute') ?? '' };
  });

  /** The numbers on the dial, in the locale's digits. */
  readonly number = computed(() => {
    const plain = new Intl.NumberFormat(this.locale(), { useGrouping: false });
    const padded = new Intl.NumberFormat(this.locale(), {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return { plain, padded };
  });

  /** AM until noon — the value's, or AM. */
  readonly period = computed<'am' | 'pm'>(() =>
    (this.value()?.hour ?? 0) < 12 ? 'am' : 'pm',
  );

  protected readonly class = computed(() =>
    cn('inline-flex flex-col items-center gap-3', this.classInput()),
  );

  /** Within `minTime` / `maxTime`. */
  canPick(time: Temporal.PlainTime): boolean {
    const min = this.minTime();
    const max = this.maxTime();
    return (
      (!min || Temporal.PlainTime.compare(time, min) >= 0) &&
      (!max || Temporal.PlainTime.compare(time, max) <= 0)
    );
  }

  /** An hour with at least one minute that can be picked. */
  canPickHour(hour: number): boolean {
    const step = this.stepMinutes();
    for (let minute = 0; minute < 60; minute += step)
      if (this.canPick(Temporal.PlainTime.from({ hour, minute }))) return true;
    return false;
  }

  /** A minute that can be picked, in the value's hour. */
  canPickMinute(minute: number): boolean {
    if (minute % this.stepMinutes() !== 0) return false;
    return this.canPick(
      Temporal.PlainTime.from({ hour: this.value()?.hour ?? 0, minute }),
    );
  }

  stepMinutes(): number {
    const step = Math.round(this.step());
    return step > 0 && step <= 60 ? step : 1;
  }

  /** The hour (0–23), the minute kept — the earliest that can be picked, if not. */
  setHour(hour: number): void {
    const minute = this.value()?.minute ?? 0;
    let time = Temporal.PlainTime.from({ hour, minute });
    if (!this.canPick(time)) {
      const first = [...Array(60).keys()].find(
        (m) =>
          m % this.stepMinutes() === 0 &&
          this.canPick(Temporal.PlainTime.from({ hour, minute: m })),
      );
      if (first === undefined) return;
      time = Temporal.PlainTime.from({ hour, minute: first });
    }
    this.value.set(time);
  }

  setMinute(minute: number): void {
    const time = Temporal.PlainTime.from({
      hour: this.value()?.hour ?? 0,
      minute,
    });
    if (this.canPick(time)) this.value.set(time);
  }

  /** AM or PM: the hour moved by twelve. */
  setPeriod(period: 'am' | 'pm'): void {
    const hour = this.value()?.hour ?? 0;
    const target = (hour % 12) + (period === 'pm' ? 12 : 0);
    if (target === hour && this.value()) return;
    // The same hour on the other side of noon — or the nearest that can be picked.
    const start = period === 'pm' ? 12 : 0;
    const next = [...Array(12).keys()]
      .map((i) => start + i)
      .sort((a, b) => Math.abs(a - target) - Math.abs(b - target))
      .find((h) => this.canPickHour(h));
    if (next !== undefined) this.setHour(next);
  }

  /** A period with at least one hour that can be picked. */
  canPickPeriod(period: 'am' | 'pm'): boolean {
    const start = period === 'pm' ? 12 : 0;
    return [...Array(12).keys()].some((i) => this.canPickHour(start + i));
  }

  /** Done with the hours: on to the minutes. */
  hourPicked(): void {
    if (this.autoAdvance() && this.view() === 'hours') this.view.set('minutes');
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.contains(next)) this.touch.emit();
  }

  private part(type: 'hour' | 'minute'): string {
    return this.parts().find((part) => part.type === type)?.value ?? '';
  }
}
