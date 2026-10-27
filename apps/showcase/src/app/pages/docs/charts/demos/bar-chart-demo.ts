import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBarChart,
  ScChartContainer,
  ScChartDataPoint,
  ScChartLegend,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-bar-chart-demo',
  imports: [ScChartContainer, ScChartLegend, ScBarChart],
  template: `
    <div class="max-w-lg rounded-lg border p-6">
      <div scChartContainer>
        <div
          scBarChart
          ariaLabel="Bar chart"
          [data]="barData"
          [height]="250"
        ></div>
        <div scChartLegend [items]="barLegend"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BarChartDemo {
  readonly barData: ScChartDataPoint[] = [
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 180 },
    { label: 'Mar', value: 150 },
    { label: 'Apr', value: 220 },
    { label: 'May', value: 190 },
    { label: 'Jun', value: 250 },
  ];

  readonly barLegend = [{ label: 'Sales' }];
}
