import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScChartContainer,
  ScChartLegend,
  ScDonutChart,
  ChartDataPoint,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-donut-chart-demo',
  imports: [ScChartContainer, ScChartLegend, ScDonutChart],
  template: `
    <div class="max-w-sm rounded-lg border p-6">
      <div sc-chart-container>
        <div
          sc-donut-chart
          [data]="pieData"
          [size]="280"
          [innerRadius]="70"
        ></div>
        <div sc-chart-legend [items]="pieLegend"></div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonutChartDemo {
  readonly pieData: ChartDataPoint[] = [
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
