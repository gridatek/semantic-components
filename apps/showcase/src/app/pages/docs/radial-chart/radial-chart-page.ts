import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { GridRadialChartDemoContainer } from './demos/grid-radial-chart-demo-container';
import { RadialChartDemoContainer } from './demos/radial-chart-demo-container';
import { StackedRadialChartDemoContainer } from './demos/stacked-radial-chart-demo-container';

@Component({
  selector: 'app-radial-chart-page',
  imports: [
    RadialChartDemoContainer,
    StackedRadialChartDemoContainer,
    GridRadialChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Radial Chart</h1>
        <p class="text-muted-foreground">
          A series as radial bars: a ring per row, its value as an arc — on a
          track, stacked, on a half circle with your text in its center. Names
          and colors come from the chart's config; the keyboard moves through
          the rows, and the tooltip says their values.
        </p>
        <app-component-badges path="radial-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartRadialBar"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-radial-chart-demo-container />
        <app-stacked-radial-chart-demo-container />
        <app-grid-radial-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RadialChartPage {}
