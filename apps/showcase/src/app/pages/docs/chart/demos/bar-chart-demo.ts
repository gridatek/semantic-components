import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScChartContainer,
  ScChartLegend,
  ScBarChart,
  ChartDataPoint,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-bar-chart-demo',
  imports: [ScChartContainer, ScChartLegend, ScBarChart],
  template: `
    <div class="max-w-lg rounded-lg border p-6">
      <div sc-chart-container>
        <div sc-bar-chart [data]="barData" [height]="250"></div>
        <div sc-chart-legend [items]="barLegend"></div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartDemo {
  readonly barData: ChartDataPoint[] = [
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 180 },
    { label: 'Mar', value: 150 },
    { label: 'Apr', value: 220 },
    { label: 'May', value: 190 },
    { label: 'Jun', value: 250 },
  ];

  readonly barLegend = [{ label: 'Sales' }];
}
