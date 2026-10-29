import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DonutChartDemoContainer } from './demos/donut-chart-demo-container';
import { PieChartDemoContainer } from './demos/pie-chart-demo-container';
import { StackedPieChartDemoContainer } from './demos/stacked-pie-chart-demo-container';

@Component({
  selector: 'app-pie-chart-page',
  imports: [
    PieChartDemoContainer,
    DonutChartDemoContainer,
    StackedPieChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Pie Chart</h1>
        <p class="text-muted-foreground">
          A series as slices of a whole, each in its category's color: a pie, a
          donut with your text in its center, rings. Names and colors come from
          the chart's config; the keyboard moves through the rows, and the
          tooltip says their values.
        </p>
        <app-component-badges path="pie-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartPie"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-pie-chart-demo-container />
        <app-donut-chart-demo-container />
        <app-stacked-pie-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PieChartPage {}
