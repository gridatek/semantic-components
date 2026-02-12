import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AreaChartDemoContainer } from './demos/area-chart-demo-container';
import { BarChartDemoContainer } from './demos/bar-chart-demo-container';
import { DonutChartDemoContainer } from './demos/donut-chart-demo-container';
import { LineChartDemoContainer } from './demos/line-chart-demo-container';
import { MonthlyRevenueChartDemoContainer } from './demos/monthly-revenue-chart-demo-container';
import { PieChartDemoContainer } from './demos/pie-chart-demo-container';
import { UserGrowthChartDemoContainer } from './demos/user-growth-chart-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-chart-page',
  imports: [
    BarChartDemoContainer,
    LineChartDemoContainer,
    AreaChartDemoContainer,
    PieChartDemoContainer,
    DonutChartDemoContainer,
    MonthlyRevenueChartDemoContainer,
    UserGrowthChartDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Chart</h1>
        <p class="text-muted-foreground">
          SVG-based chart components for data visualization.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-bar-chart-demo-container />
        <app-line-chart-demo-container />
        <app-area-chart-demo-container />
        <app-pie-chart-demo-container />
        <app-donut-chart-demo-container />
        <app-monthly-revenue-chart-demo-container />
        <app-user-growth-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChartPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'chart')!.status;
}
