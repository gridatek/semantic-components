import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BarChartDemoContainer } from './demos/bar-chart-demo-container';
import { MultipleBarChartDemoContainer } from './demos/multiple-bar-chart-demo-container';
import { NegativeBarChartDemoContainer } from './demos/negative-bar-chart-demo-container';
import { StackedBarChartDemoContainer } from './demos/stacked-bar-chart-demo-container';

@Component({
  selector: 'app-bar-chart-page',
  imports: [
    BarChartDemoContainer,
    MultipleBarChartDemoContainer,
    StackedBarChartDemoContainer,
    NegativeBarChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Bar Chart</h1>
        <p class="text-muted-foreground">
          Series as bars: side by side, stacked, below 0; each corner's radius
          of your choice. Each series' name and color come from the chart's
          config; the keyboard moves through the categories, and the tooltip
          says their values.
        </p>
        <app-component-badges path="bar-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartBar"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-bar-chart-demo-container />
        <app-multiple-bar-chart-demo-container />
        <app-stacked-bar-chart-demo-container />
        <app-negative-bar-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class BarChartPage {}
