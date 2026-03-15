import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { ChartDataPoint } from './chart-types';
import { ScPieChart } from './pie-chart';

@Component({
  selector: '[scDonutChart]',
  template: `
    <div
      scPieChart
      [data]="data()"
      [size]="size()"
      [innerRadius]="innerRadius()"
      [showLabels]="showLabels()"
      [ariaLabel]="ariaLabel()"
      [class]="classInput()"
    ></div>
  `,
  imports: [ScPieChart],
  host: {
    'data-slot': 'donut-chart',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDonutChart {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly data = input<ChartDataPoint[]>([]);
  readonly size = input<number>(300);
  readonly innerRadius = input<number>(60);
  readonly showLabels = input<boolean>(false);
  readonly ariaLabel = input<string>('Donut chart');
}
