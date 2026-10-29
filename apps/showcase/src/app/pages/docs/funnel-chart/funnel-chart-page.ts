import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { FunnelChartDemoContainer } from './demos/funnel-chart-demo-container';
import { LabelFunnelChartDemoContainer } from './demos/label-funnel-chart-demo-container';

@Component({
  selector: 'app-funnel-chart-page',
  imports: [
    FunnelChartDemoContainer,
    LabelFunnelChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Funnel Chart</h1>
        <p class="text-muted-foreground">
          A series as stages, top to bottom, each as wide as its value and
          narrowing to the next, in its category's color. Names and colors come
          from the chart's config; the keyboard moves through the stages, and
          the tooltip says their values.
        </p>
        <app-component-badges path="funnel-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartFunnel"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-funnel-chart-demo-container />
        <app-label-funnel-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FunnelChartPage {}
