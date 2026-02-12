import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LineChartDemo } from './line-chart-demo';

@Component({
  selector: 'app-line-chart-demo-container',
  imports: [DemoContainer, LineChartDemo],
  template: `
    <app-demo-container
      title="Line Chart"
      demoUrl="/demos/chart/line-chart-demo"
      [code]="code"
    >
      <app-line-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartDemoContainer {
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
  selector: 'app-line-chart-demo',
  imports: [ScChartContainer, ScLineChart],
  template: \`
    <div class="max-w-lg rounded-lg border p-6">
      <div sc-chart-container>
        <div sc-line-chart [data]="lineData" [height]="250"></div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartDemo {
  readonly lineData: ChartDataPoint[] = [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 52 },
    { label: 'Wed', value: 49 },
    { label: 'Thu', value: 63 },
    { label: 'Fri', value: 58 },
    { label: 'Sat', value: 72 },
    { label: 'Sun', value: 68 },
  ];
}`;
}
