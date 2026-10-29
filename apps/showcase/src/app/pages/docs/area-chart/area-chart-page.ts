import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AreaChartDemoContainer } from './demos/area-chart-demo-container';
import { ExpandedAreaChartDemoContainer } from './demos/expanded-area-chart-demo-container';
import { InteractiveAreaChartDemoContainer } from './demos/interactive-area-chart-demo-container';
import { StackedAreaChartDemoContainer } from './demos/stacked-area-chart-demo-container';

@Component({
  selector: 'app-area-chart-page',
  imports: [
    InteractiveAreaChartDemoContainer,
    AreaChartDemoContainer,
    StackedAreaChartDemoContainer,
    ExpandedAreaChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Area Chart</h1>
        <p class="text-muted-foreground">
          Series as areas, filled down to 0 or stacked — to 100% if you like —
          with natural, linear, step or monotone edges; gradients of your own.
          Each series' name and color come from the chart's config; the keyboard
          moves through the categories, and the tooltip says their values.
        </p>
        <app-component-badges path="area-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartArea"
        />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-area-chart-demo-container />
        <app-stacked-area-chart-demo-container />
        <app-expanded-area-chart-demo-container />
        <app-interactive-area-chart-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AreaChartPage {}
