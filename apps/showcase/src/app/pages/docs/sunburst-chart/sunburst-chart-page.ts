import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { LabelSunburstChartDemoContainer } from './demos/label-sunburst-chart-demo-container';
import { SunburstChartDemoContainer } from './demos/sunburst-chart-demo-container';

@Component({
  selector: 'app-sunburst-chart-page',
  imports: [
    SunburstChartDemoContainer,
    LabelSunburstChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Sunburst Chart</h1>
        <p class="text-muted-foreground">
          A series in two rings: its rows' groups inside, each their total, and
          the rows around them in their group's color. Names and colors come
          from the chart's config; the keyboard moves through the rows, and the
          tooltip says their values.
        </p>
        <app-component-badges path="sunburst-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartSunburst"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-sunburst-chart-demo-container />
        <app-label-sunburst-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SunburstChartPage {}
