import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { LineChartDemoContainer } from './demos/line-chart-demo-container';
import { MultipleLineChartDemoContainer } from './demos/multiple-line-chart-demo-container';
import { StepLineChartDemoContainer } from './demos/step-line-chart-demo-container';

@Component({
  selector: 'app-line-chart-page',
  imports: [
    LineChartDemoContainer,
    MultipleLineChartDemoContainer,
    StepLineChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Line Chart</h1>
        <p class="text-muted-foreground">
          Series as lines through their values: natural, linear, step or
          monotone; dots if you like. Each series' name and color come from the
          chart's config; the keyboard moves through the categories, and the
          tooltip says their values.
        </p>
        <app-component-badges path="line-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartLine"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-line-chart-demo-container />
        <app-multiple-line-chart-demo-container />
        <app-step-line-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class LineChartPage {}
