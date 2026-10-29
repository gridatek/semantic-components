import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { GroupedTreemapChartDemoContainer } from './demos/grouped-treemap-chart-demo-container';
import { TreemapChartDemoContainer } from './demos/treemap-chart-demo-container';

@Component({
  selector: 'app-treemap-chart-page',
  imports: [
    TreemapChartDemoContainer,
    GroupedTreemapChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Treemap Chart</h1>
        <p class="text-muted-foreground">
          A series as boxes, each as large as its value, squarified — gathered
          in groups if you like. Names and colors come from the chart's config;
          the keyboard moves through the boxes, and the tooltip says their
          values.
        </p>
        <app-component-badges path="treemap-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts/treemap"
          library="d3-scale d3-shape d3-hierarchy"
          href="https://d3js.org"
          names="ScChartTreemap"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-treemap-chart-demo-container />
        <app-grouped-treemap-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TreemapChartPage {}
