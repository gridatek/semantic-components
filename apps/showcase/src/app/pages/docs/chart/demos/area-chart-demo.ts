import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScChartContainer,
  ScLineChart,
  ChartDataPoint,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-area-chart-demo',
  imports: [ScChartContainer, ScLineChart],
  template: `
    <div class="max-w-lg rounded-lg border p-6">
      <div sc-chart-container>
        <div
          sc-line-chart
          [data]="lineData"
          [height]="250"
          [showArea]="true"
        ></div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaChartDemo {
  readonly lineData: ChartDataPoint[] = [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 52 },
    { label: 'Wed', value: 49 },
    { label: 'Thu', value: 63 },
    { label: 'Fri', value: 58 },
    { label: 'Sat', value: 72 },
    { label: 'Sun', value: 68 },
  ];
}
