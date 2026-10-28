import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AreaChartNextDemoContainer } from './demos/area-chart-next-demo-container';
import { BarChartNextDemoContainer } from './demos/bar-chart-next-demo-container';
import { ExpandedAreaChartNextDemoContainer } from './demos/expanded-area-chart-next-demo-container';
import { LineChartNextDemoContainer } from './demos/line-chart-next-demo-container';
import { MultipleBarChartNextDemoContainer } from './demos/multiple-bar-chart-next-demo-container';
import { MultipleLineChartNextDemoContainer } from './demos/multiple-line-chart-next-demo-container';
import { NegativeBarChartNextDemoContainer } from './demos/negative-bar-chart-next-demo-container';
import { StackedAreaChartNextDemoContainer } from './demos/stacked-area-chart-next-demo-container';
import { StackedBarChartNextDemoContainer } from './demos/stacked-bar-chart-next-demo-container';
import { StepLineChartNextDemoContainer } from './demos/step-line-chart-next-demo-container';

@Component({
  selector: 'app-chart-next-page',
  imports: [
    AreaChartNextDemoContainer,
    StackedAreaChartNextDemoContainer,
    ExpandedAreaChartNextDemoContainer,
    BarChartNextDemoContainer,
    MultipleBarChartNextDemoContainer,
    StackedBarChartNextDemoContainer,
    NegativeBarChartNextDemoContainer,
    LineChartNextDemoContainer,
    MultipleLineChartNextDemoContainer,
    StepLineChartNextDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Chart (Next)</h1>
        <p class="text-muted-foreground">
          Charts made of parts, as shadcn/ui's: a plot with its grid, axes,
          cursor and series — areas, bars, lines, stacked or not — and around it
          a tooltip and a legend. Each series' name and color come from the
          chart's config. The keyboard moves through the categories; the tooltip
          says their values.
        </p>
        <app-component-badges path="chart-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChartNext, ScChartNextPlot, ScChartNextArea"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Area</h2>
        <app-area-chart-next-demo-container />
        <app-stacked-area-chart-next-demo-container />
        <app-expanded-area-chart-next-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Bar</h2>
        <app-bar-chart-next-demo-container />
        <app-multiple-bar-chart-next-demo-container />
        <app-stacked-bar-chart-next-demo-container />
        <app-negative-bar-chart-next-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Line</h2>
        <app-line-chart-next-demo-container />
        <app-multiple-line-chart-next-demo-container />
        <app-step-line-chart-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ChartNextPage {}
