import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { LinesRadarChartDemoContainer } from './demos/lines-radar-chart-demo-container';
import { MultipleRadarChartDemoContainer } from './demos/multiple-radar-chart-demo-container';
import { RadarChartDemoContainer } from './demos/radar-chart-demo-container';

@Component({
  selector: 'app-radar-chart-page',
  imports: [
    RadarChartDemoContainer,
    MultipleRadarChartDemoContainer,
    LinesRadarChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Radar Chart</h1>
        <p class="text-muted-foreground">
          Series as polygons over the categories, each on its spoke: filled or
          outlined, with dots, on a polygon or circle grid. Names and colors
          come from the chart's config; the keyboard moves through the rows, and
          the tooltip says their values.
        </p>
        <app-component-badges path="radar-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartRadar"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-radar-chart-demo-container />
        <app-multiple-radar-chart-demo-container />
        <app-lines-radar-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RadarChartPage {}
