import { Component, ViewEncapsulation } from '@angular/core';
import {
  ChartDataPoint,
  ScBarChart,
  ScChartContainer,
  ScChartLegend,
} from '@semantic-components/charts';

@Component({
  selector: 'app-charts-usage-demo',
  imports: [ScChartContainer, ScBarChart, ScChartLegend],
  template: `
    <div class="max-w-lg rounded-lg border p-6">
      <div scChartContainer>
        <div scBarChart [data]="data" [height]="250"></div>
        <div scChartLegend [items]="legend"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChartsUsageDemo {
  readonly data: ChartDataPoint[] = [
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 180 },
    { label: 'Mar', value: 150 },
    { label: 'Apr', value: 220 },
    { label: 'May', value: 190 },
    { label: 'Jun', value: 250 },
  ];

  readonly legend = [{ label: 'Sales' }];
}
