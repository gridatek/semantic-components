import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import {
  type ScChartAnimationEasing,
  scChartEntrance,
} from './chart-animation';
import { ScChartState } from './chart-state';

/** How many decimals a number is written with. */
const decimals = (value: number) =>
  Number.isInteger(value) ? 0 : (String(value).split('.')[1]?.length ?? 0);

/**
 * A number in a chart's center (a donut's total), counting up to its
 * `value` as the chart enters — when first seen, with the series' timing
 * (Recharts' pie: after 400ms, for 1500ms, `ease`). Written in the app's
 * locale (`format`: Intl's options). Screen readers get the value, never the
 * numbers on the way; on the server and with reduced motion, there at once.
 */
@Component({
  selector: 'text[scChartCenterValue]',
  template: `{{ shown() }}`,
  host: {
    'data-slot': 'chart-center-value',
    role: 'img',
    '[attr.aria-label]': 'text()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartCenterValue {
  private readonly state = inject(ScChartState);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The number. */
  readonly value = input.required<number>();
  /** How it is written: currency, percent, compact, a unit, decimals… */
  readonly format = input<Intl.NumberFormatOptions>({});
  /** It counts up as the chart enters; not with reduced motion. */
  readonly isAnimationActive = input(true);
  /** The wait before it counts, in ms: a pie's. */
  readonly animationBegin = input(400);
  /** How long it counts, in ms. */
  readonly animationDuration = input(1500);
  readonly animationEasing = input<ScChartAnimationEasing>('ease');

  /** Its entrance: 0 to 1 once, when the chart is first seen. */
  private readonly entrance = scChartEntrance({
    start: this.state.seen,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });

  private readonly formatter = computed(
    () => new Intl.NumberFormat(this.locale, this.format()),
  );

  /** The value, as written: what screen readers get. */
  private readonly text = computed(() => this.formatter().format(this.value()));

  /** The number on its way, as written, with the value's decimals. */
  private readonly shown = computed(() => {
    const value = this.value();
    const progress = this.isAnimationActive() ? this.entrance() : 1;
    if (progress >= 1) return this.text();
    const places = 10 ** decimals(value);
    return this.formatter().format(
      Math.round(value * progress * places) / places,
    );
  });

  protected readonly class = computed(() => cn(this.classInput()));
}
