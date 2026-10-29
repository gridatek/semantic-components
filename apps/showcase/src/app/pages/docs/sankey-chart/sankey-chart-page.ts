import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { SankeyChartDemoContainer } from './demos/sankey-chart-demo-container';

@Component({
  selector: 'app-sankey-chart-page',
  imports: [
    SankeyChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Sankey Chart</h1>
        <p class="text-muted-foreground">
          Flows between nodes, each as thick as its value: the nodes in columns,
          the flows in their source's color. Names and colors come from the
          chart's config; the keyboard moves through the flows, and the tooltip
          says their values.
        </p>
        <app-component-badges path="sankey-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts/sankey"
          library="d3-scale d3-shape d3-sankey"
          href="https://d3js.org"
          names="ScChartSankey"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-sankey-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SankeyChartPage {}
