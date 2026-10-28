import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { TooltipChartDemoContainer } from './demos/tooltip-chart-demo-container';

@Component({
  selector: 'app-chart-page',
  imports: [
    RouterLink,
    TooltipChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Chart</h1>
        <p class="text-muted-foreground">
          The parts every chart is made of, as shadcn/ui's: the chart, with its
          rows and its series' names and colors (its config); the plot, with a
          grid, axes and a cursor; around it, a tooltip and a legend. The series
          — areas, bars, lines — go in the plot. The keyboard moves through the
          categories; the tooltip says their values.
        </p>
        <app-component-badges path="chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartTooltip, ScChartLegend"
        />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Tooltip and legend</h2>
        <p class="text-muted-foreground">
          Each series' name and color come from the chart's config; its color is
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >--color-&lt;key&gt;</code
          >, for your own SVG too. The tooltip marks each value with a dot, a
          line or a dash.
        </p>
        <app-tooltip-chart-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Chart types</h2>
        <div class="grid gap-4 md:grid-cols-3">
          @for (type of types; track type.path) {
            <a
              [routerLink]="'/docs/components/' + type.path"
              class="hover:bg-accent rounded-lg border p-6 transition-colors"
            >
              <h3 class="leading-none font-semibold tracking-tight">
                {{ type.name }}
              </h3>
              <p class="text-muted-foreground mt-2 text-sm">
                {{ type.description }}
              </p>
            </a>
          }
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ChartPage {
  protected readonly types = [
    {
      name: 'Area Chart',
      path: 'area-chart',
      description: 'Filled down to 0, or stacked — to 100% if you like.',
    },
    {
      name: 'Bar Chart',
      path: 'bar-chart',
      description: 'Side by side, stacked, below 0.',
    },
    {
      name: 'Line Chart',
      path: 'line-chart',
      description: 'Through the values, with dots if you like.',
    },
  ];
}
