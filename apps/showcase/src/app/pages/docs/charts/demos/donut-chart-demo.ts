import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChartContainer,
  ScChartDataPoint,
  ScChartLegend,
  ScDonutChart,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-donut-chart-demo',
  imports: [ScChartContainer, ScChartLegend, ScDonutChart],
  template: `
    <div class="max-w-sm rounded-lg border p-6">
      <div scChartContainer>
        <div
          scDonutChart
          ariaLabel="Donut chart"
          [data]="pieData"
          [size]="280"
          [innerRadius]="70"
        ></div>
        <div scChartLegend [items]="pieLegend"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DonutChartDemo {
  readonly pieData: ScChartDataPoint[] = [
    { label: 'Desktop', value: 45 },
    { label: 'Mobile', value: 35 },
    { label: 'Tablet', value: 20 },
  ];

  readonly pieLegend = [
    { label: 'Desktop' },
    { label: 'Mobile' },
    { label: 'Tablet' },
  ];
}
