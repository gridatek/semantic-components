import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChartNext,
  ScChartNextBar,
  type ScChartNextConfig,
  ScChartNextCursor,
  ScChartNextGrid,
  ScChartNextPlot,
  ScChartNextTooltip,
  ScChartNextXAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-negative-bar-chart-next-demo',
  imports: [
    ScChartNext,
    ScChartNextPlot,
    ScChartNextGrid,
    ScChartNextXAxis,
    ScChartNextCursor,
    ScChartNextBar,
    ScChartNextTooltip,
  ],
  template: `
    <div scChartNext [config]="config" [data]="data">
      <svg
        scChartNextPlot
        categoryKey="month"
        aria-label="Change in visitors, January to June"
      >
        <g scChartNextGrid />
        <g scChartNextXAxis [tickFormatter]="short" />
        <g scChartNextCursor />
        <g scChartNextBar key="change" />
      </svg>
      <div scChartNextTooltip hideIndicator></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class NegativeBarChartNextDemo {
  readonly data = [
    { month: 'January', change: 186 },
    { month: 'February', change: 205 },
    { month: 'March', change: -207 },
    { month: 'April', change: 173 },
    { month: 'May', change: -209 },
    { month: 'June', change: 214 },
  ];
  readonly config: ScChartNextConfig = {
    change: { label: 'Change', color: 'var(--chart-1)' },
  };
  /** January → Jan. */
  readonly short = (month: string) => month.slice(0, 3);
}
