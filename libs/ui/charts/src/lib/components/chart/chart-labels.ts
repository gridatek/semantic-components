import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { SC_CHART_SERIES, type ScChartLabelPosition } from './chart-series';
import { ScChartState } from './chart-state';

/**
 * The values of the series it is in, written on the chart: beyond each bar's
 * end or above each point (`outside`), in the middle of each bar or slice
 * (`inside`), or at each bar's base (`start` — a category's name inside its
 * bar, through `formatter`).
 *
 * ```html
 * <g scChartBar key="desktop"><g scChartLabels /></g>
 * ```
 */
@Component({
  selector: 'g[scChartLabels]',
  template: `
    @for (label of labels(); track label.index) {
      @if (label.path) {
        <!-- Along its path (a ring's arc), from its start. -->
        <svg:path
          [attr.id]="id + '-' + label.index"
          [attr.d]="label.path"
          fill="none"
        />
        <svg:text
          [attr.text-anchor]="label.anchor"
          [attr.dominant-baseline]="label.baseline"
        >
          <svg:textPath [attr.href]="'#' + id + '-' + label.index">
            {{ label.text }}
          </svg:textPath>
        </svg:text>
      } @else {
        <svg:text
          [attr.x]="label.x"
          [attr.y]="label.y"
          [attr.text-anchor]="label.anchor"
          [attr.dominant-baseline]="label.baseline"
        >
          {{ label.text }}
        </svg:text>
      }
    }
  `,
  host: {
    'data-slot': 'chart-labels',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartLabels {
  private readonly series = inject(SC_CHART_SERIES);
  private readonly state = inject(ScChartState);
  private readonly numbers = new Intl.NumberFormat(inject(LOCALE_ID));
  /** The paths' ids' prefix: unique in the page. */
  private readonly id = inject(_IdGenerator).getId('sc-chart-labels-');

  readonly classInput = input<string>('', { alias: 'class' });
  readonly position = input<ScChartLabelPosition>('outside');
  /** How far from its shape, in px. */
  readonly offset = input(8);
  /** A label's text: its value in the app's locale, or yours (its category's name…). */
  readonly formatter = input<
    ((value: number, category: string, index: number) => string) | null
  >(null);

  protected readonly labels = computed(() => {
    const categories = this.state.categories();
    const format =
      this.formatter() ?? ((value: number) => this.numbers.format(value));
    return this.series
      .labelPoints(this.position(), this.offset())
      .map((point) => ({
        ...point,
        text: format(point.value, categories[point.index], point.index),
      }));
  });

  protected readonly class = computed(() =>
    cn('fill-foreground pointer-events-none text-xs', this.classInput()),
  );
}
