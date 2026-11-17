import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  input,
} from '@angular/core';
import {
  type ScChartIndicator,
  ScChartLegend,
  ScChartLegendIndicator,
  ScChartLegendItem,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';
import { count } from './format';

/**
 * The app's chart tooltip, the same on every chart: put it inside a
 * `scChart`. The values written by `format` (a count by default).
 */
@Component({
  selector: 'app-chart-tooltip',
  imports: [
    ScChartTooltip,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipLabel,
    ScChartTooltipName,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartTooltipValue,
  ],
  template: `
    <div scChartTooltipProvider>
      <ng-template scChartTooltipPortal>
        <div scChartTooltip #tooltip="scChartTooltip">
          @if (!hideLabel()) {
            <div scChartTooltipLabel>{{ tooltip.label() }}</div>
          }
          @for (item of tooltip.payload(); track item.dataKey) {
            <div scChartTooltipItem [item]="item">
              <span scChartTooltipIndicator [variant]="indicator()"></span>
              <span scChartTooltipName>{{ item.name }}</span>
              <span scChartTooltipValue>{{ format()(item.value) }}</span>
            </div>
          }
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class ChartTooltip {
  readonly format = input<(value: number) => string>(count);
  readonly indicator = input<ScChartIndicator>('dot');
  /** Pies and rings: the item is the category, no label above it. */
  readonly hideLabel = input(false, { transform: booleanAttribute });
}

/** The app's chart legend: put it inside a `scChart`. */
@Component({
  selector: 'app-chart-legend',
  imports: [ScChartLegend, ScChartLegendIndicator, ScChartLegendItem],
  template: `
    <div scChartLegend #legend="scChartLegend">
      @for (item of legend.payload(); track item.dataKey) {
        <div scChartLegendItem [item]="item">
          <span scChartLegendIndicator></span>
          {{ item.name }}
        </div>
      }
    </div>
  `,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class ChartLegend {}
