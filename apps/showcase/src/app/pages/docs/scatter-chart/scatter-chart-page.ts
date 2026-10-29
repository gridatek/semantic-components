import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BubbleScatterChartDemoContainer } from './demos/bubble-scatter-chart-demo-container';
import { ScatterChartDemoContainer } from './demos/scatter-chart-demo-container';

@Component({
  selector: 'app-scatter-chart-page',
  imports: [
    ScatterChartDemoContainer,
    BubbleScatterChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Scatter Chart</h1>
        <p class="text-muted-foreground">
          Points at two values, x and y, both axes numeric — sized by a third: a
          bubble chart. Names and colors come from the chart's config; the
          keyboard moves through the points, and the tooltip says their values.
        </p>
        <app-component-badges path="scatter-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartScatter"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-scatter-chart-demo-container />
        <app-bubble-scatter-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ScatterChartPage {}
