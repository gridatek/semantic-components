import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TooltipChartDemo } from './tooltip-chart-demo';

@Component({
  selector: 'app-tooltip-chart-demo-container',
  imports: [DemoContainer, TooltipChartDemo],
  template: `
    <app-demo-container
      title="Tooltip and legend"
      demoUrl="/demos/chart/tooltip-chart-demo"
      [code]="code"
    >
      <app-tooltip-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TooltipChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  ScChart,
  ScChartBar,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  type ScChartIndicator,
  ScChartLegend,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-tooltip-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartBar,
    ScChartTooltip,
    ScChartLegend,
    ScToggleGroup,
    ScToggleGroupItem,
  ],
  template: \`
    <div
      scToggleGroup
      size="sm"
      aria-label="Tooltip indicator"
      class="mb-3"
      [value]="indicator()"
      (valueChange)="choose($event)"
    >
      <button scToggleGroupItem value="dot">Dot</button>
      <button scToggleGroupItem value="line">Line</button>
      <button scToggleGroupItem value="dashed">Dashed</button>
    </div>
    <div scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        aria-label="Visitors by device, January to June"
      >
        <g scChartGrid />
        <g scChartCategoryAxis [tickFormatter]="short" />
        <g scChartCursor />
        <g scChartBar key="desktop" />
        <g scChartBar key="mobile" />
      </svg>
      <div scChartTooltip [indicator]="indicator()"></div>
      <div scChartLegend></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class TooltipChartDemo {
  readonly data = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ];
  readonly config: ScChartConfig = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
    mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  };
  readonly indicator = signal<ScChartIndicator>('dot');
  /** January → Jan. */
  readonly short = (month: string) => month.slice(0, 3);

  choose(value: string | string[] | null): void {
    if (value === 'dot' || value === 'line' || value === 'dashed')
      this.indicator.set(value);
  }
}`;
}
