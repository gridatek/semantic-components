import { Component, ViewEncapsulation } from '@angular/core';
import { ScNumberTicker } from '@semantic-components/ui';
import {
  ScChart,
  ScChartCenter,
  type ScChartConfig,
  ScChartPie,
  ScChartPlot,
} from '@semantic-components/ui/charts';

/** On an SVG `<text>`: a donut's total in its center, counting up as the donut sweeps in (after 400ms, for 1500ms, ease — the chart's series). */
@Component({
  selector: 'app-chart-number-ticker-demo',
  imports: [ScChart, ScChartPlot, ScChartPie, ScChartCenter, ScNumberTicker],
  template: `
    <div
      scChart
      class="mx-auto aspect-square max-h-64"
      [config]="config"
      [data]="data"
    >
      <svg scChartPlot categoryKey="browser" aria-label="Visitors by browser">
        <g
          scChartPie
          key="visitors"
          [innerRadius]="0.6"
          [padAngle]="1"
          [strokeWidth]="0"
        />
        <g scChartCenter>
          <!-- Counting up as the donut sweeps in: its delay, duration, easing. -->
          <text
            scNumberTicker
            text-anchor="middle"
            class="fill-foreground text-3xl font-bold"
            [value]="total"
            start="visible"
            easing="ease"
            [delay]="400"
            [duration]="1500"
          ></text>
          <text text-anchor="middle" dy="1.6em" class="fill-muted-foreground">
            Visitors
          </text>
        </g>
      </svg>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class ChartNumberTickerDemo {
  private readonly data = [
    { browser: 'chrome', visitors: 275 },
    { browser: 'safari', visitors: 200 },
    { browser: 'firefox', visitors: 187 },
    { browser: 'edge', visitors: 173 },
    { browser: 'other', visitors: 90 },
  ];
  private readonly config: ScChartConfig = {
    visitors: { label: 'Visitors' },
    chrome: { label: 'Chrome', color: 'var(--chart-1)' },
    safari: { label: 'Safari', color: 'var(--chart-2)' },
    firefox: { label: 'Firefox', color: 'var(--chart-3)' },
    edge: { label: 'Edge', color: 'var(--chart-4)' },
    other: { label: 'Other', color: 'var(--chart-5)' },
  };
  private readonly total = this.data.reduce(
    (sum, row) => sum + row.visitors,
    0,
  );
}
