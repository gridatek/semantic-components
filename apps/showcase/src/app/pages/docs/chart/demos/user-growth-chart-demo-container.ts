import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UserGrowthChartDemo } from './user-growth-chart-demo';

@Component({
  selector: 'app-user-growth-chart-demo-container',
  imports: [DemoContainer, UserGrowthChartDemo],
  template: `
    <app-demo-container
      title="User Growth"
      demoUrl="/demos/chart/user-growth-chart-demo"
      [code]="code"
    >
      <app-user-growth-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGrowthChartDemoContainer {
  readonly code = `import {
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
  selector: 'app-user-growth-chart-demo',
  imports: [ScChartContainer, ScLineChart],
  template: \`
    <div class="max-w-2xl rounded-lg border p-6">
      <div sc-chart-container>
        <div
          sc-line-chart
          [data]="growthData"
          [height]="300"
          [showArea]="true"
          [showPoints]="true"
          [labelStep]="2"
        ></div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGrowthChartDemo {
  readonly growthData: ChartDataPoint[] = [
    { label: 'Week 1', value: 1200 },
    { label: 'Week 2', value: 1350 },
    { label: 'Week 3', value: 1480 },
    { label: 'Week 4', value: 1620 },
    { label: 'Week 5', value: 1850 },
    { label: 'Week 6', value: 2100 },
    { label: 'Week 7', value: 2380 },
    { label: 'Week 8', value: 2650 },
    { label: 'Week 9', value: 2920 },
    { label: 'Week 10', value: 3200 },
    { label: 'Week 11', value: 3580 },
    { label: 'Week 12', value: 4100 },
  ];
}`;
}
