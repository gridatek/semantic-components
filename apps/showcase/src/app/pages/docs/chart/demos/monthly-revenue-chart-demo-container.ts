import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MonthlyRevenueChartDemo } from './monthly-revenue-chart-demo';

@Component({
  selector: 'app-monthly-revenue-chart-demo-container',
  imports: [DemoContainer, MonthlyRevenueChartDemo],
  template: `
    <app-demo-container
      title="Monthly Revenue"
      demoUrl="/demos/chart/monthly-revenue-chart-demo"
      [code]="code"
    >
      <app-monthly-revenue-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyRevenueChartDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScChartContainer,
  ScBarChart,
  ChartDataPoint,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-monthly-revenue-chart-demo',
  imports: [ScChartContainer, ScBarChart],
  template: \`
    <div class="max-w-2xl rounded-lg border p-6">
      <div sc-chart-container>
        <div sc-bar-chart [data]="monthlyData" [height]="300"></div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyRevenueChartDemo {
  readonly monthlyData: ChartDataPoint[] = [
    { label: 'Jan', value: 4500 },
    { label: 'Feb', value: 5200 },
    { label: 'Mar', value: 4800 },
    { label: 'Apr', value: 6100 },
    { label: 'May', value: 5800 },
    { label: 'Jun', value: 7200 },
    { label: 'Jul', value: 6900 },
    { label: 'Aug', value: 7500 },
    { label: 'Sep', value: 8200 },
    { label: 'Oct', value: 7800 },
    { label: 'Nov', value: 8500 },
    { label: 'Dec', value: 9200 },
  ];
}`;
}
