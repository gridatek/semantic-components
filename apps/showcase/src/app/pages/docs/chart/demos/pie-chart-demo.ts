import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScChartContainer,
  ScChartLegend,
  ScPieChart,
  ChartDataPoint,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-pie-chart-demo',
  imports: [ScChartContainer, ScChartLegend, ScPieChart],
  template: `
    <div class="max-w-sm rounded-lg border p-6">
      <div sc-chart-container>
        <div sc-pie-chart [data]="pieData" [size]="280"></div>
        <div sc-chart-legend [items]="pieLegend"></div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartDemo {
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
