import { Directive, computed, input, signal } from '@angular/core';
import { cn } from 'cn';
import { injectDisplayLocale, ɵwarnIfUnnamed } from '../../utils';

/** How the value is written: number format options, or yours. */
export type ScMeterFormat =
  Intl.NumberFormatOptions | ((value: number) => string);

/** What a value label is given, beside the value. */
export interface ScMeterValueLabelDetails {
  /** The value as written (`format`). */
  readonly formatted: string;
  /** Where it sits between `min` and `max`, 0–100. */
  readonly percent: number;
  readonly min: number;
  readonly max: number;
}

/**
 * A measurement within a known range — storage used, a quota, a score — a
 * bar filled to it (`role="meter"`). For a task getting done, a Progress. It
 * shows your value: no output, no busy state. Name it (`scMeterLabel`, or
 * `aria-label`). The value written as a percent of the range, or as `format`
 * says, in the app's language (`LOCALE_ID`).
 */
@Directive({
  selector: 'div[scMeter]',
  exportAs: 'scMeter',
  host: {
    'data-slot': 'meter',
    role: 'meter',
    '[attr.aria-valuemin]': 'min()',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'clamped()',
    '[attr.aria-valuetext]': 'valueText()',
    '[attr.aria-labelledby]': 'labelId()',
    '[style.--sc-meter-value]': 'percent() + "%"',
    '[class]': 'class()',
  },
})
export class ScMeter {
  /** What it shows: the locale, in the user's numbering system. */
  private readonly displayLocale = injectDisplayLocale();

  readonly classInput = input<string>('', { alias: 'class' });
  /** The reading. */
  readonly value = input.required<number>();
  readonly min = input(0);
  readonly max = input(100);
  /**
   * How it is written: number format options — a percent style shows where it
   * sits in the range, any other the value itself — or a function of it.
   * A percent by default.
   */
  readonly format = input<ScMeterFormat>({ style: 'percent' });
  /** What screen readers hear, when the value written isn't enough. */
  readonly valueLabel = input<
    ((value: number, details: ScMeterValueLabelDetails) => string) | null
  >(null);

  /** The label's id (`scMeterLabel`). */
  readonly labelId = signal<string | null>(null);

  /** The value, within the range: the fill, the percent, `aria-valuenow`. */
  readonly clamped = computed(() =>
    Math.min(Math.max(this.value(), this.min()), this.max()),
  );
  /** Where it sits between `min` and `max`, 0–100. */
  readonly percent = computed(() => {
    const span = this.max() - this.min();
    return span > 0 ? ((this.clamped() - this.min()) / span) * 100 : 0;
  });
  /** The value as written. */
  readonly text = computed(() => {
    const format = this.format();
    if (typeof format === 'function') return format(this.value());
    return format.style === 'percent'
      ? new Intl.NumberFormat(this.displayLocale(), format).format(
          this.percent() / 100,
        )
      : new Intl.NumberFormat(this.displayLocale(), format).format(
          this.value(),
        );
  });
  private readonly valueText = computed(() => {
    const label = this.valueLabel();
    return label
      ? label(this.value(), {
          formatted: this.text(),
          percent: this.percent(),
          min: this.min(),
          max: this.max(),
        })
      : this.text();
  });

  private readonly class = computed(() =>
    cn('flex flex-wrap gap-3', this.classInput()),
  );

  constructor() {
    ɵwarnIfUnnamed('scMeter');
  }
}
