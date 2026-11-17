import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BubbleScatterChartDemoContainer } from './demos/bubble-scatter-chart-demo-container';
import { RtlScatterChartDemoContainer } from './demos/rtl-scatter-chart-demo-container';
import { ScatterChartUsageDemoContainer } from './demos/scatter-chart-usage-demo-container';

@Component({
  selector: 'app-scatter-chart-page',
  imports: [
    ScatterChartUsageDemoContainer,
    Anatomy,
    ApiTable,
    RouterLink,
    RtlScatterChartDemoContainer,
    BubbleScatterChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Scatter Chart</h1>
        <p class="text-muted-foreground">
          Points at two values, x and y, both axes numeric — sized by a third: a
          bubble chart. Names and colors come from the chart's config; the
          keyboard moves through the points, and the tooltip says their values.
        </p>
        <app-component-badges path="scatter-chart" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartScatter"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-scatter-chart-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A chart (its rows and config), its plot with the series, and the
          tooltip and legend you write from their state.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The plot is one tab stop, a group named by its aria-label: the arrow
            keys, Home and End move through its points; Escape closes the
            tooltip.
          </li>
          <li>
            As the keyboard moves, screen readers hear what the tooltip says,
            through the CDK&apos;s LiveAnnouncer (politely).
          </li>
          <li>
            Its axes, grid and cursor are hidden from assistive technology: the
            tooltip says what they show.
          </li>
          <li>
            Right to left, it can be mirrored (the app&apos;s
            charts.followDirection, or the axes&apos; reversed): the arrows then
            go the way it is drawn.
          </li>
          <li>
            With reduced motion (prefers-reduced-motion), it appears and changes
            at once.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-bubble-scatter-chart-demo-container />
        <app-rtl-scatter-chart-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p class="text-muted-foreground">
          The series&apos; inputs. The chart, its plot, axes, tooltip and legend
          are on the
          <a
            routerLink="/docs/components/chart"
            class="underline underline-offset-4"
            >Chart</a
          >
          page.
        </p>
        <app-api-table label="ScChartScatter inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ScatterChartPage {
  private readonly anatomy = {
    imports:
      "import { ScChart, ScChartPlot, ScChartCategoryAxis, ScChartCursor, ScChartGrid, ScChartValueAxis, ScChartScatter, ScChartTooltip, ScChartTooltipIndicator, ScChartTooltipItem, ScChartTooltipName, ScChartTooltipPortal, ScChartTooltipProvider, ScChartTooltipValue } from '@semantic-components/ui/charts';",
    markup: [
      '<div scChart [config]="…" [data]="…">',
      '  <svg scChartPlot categoryKey="…" aria-label="…">',
      '    <g scChartGrid />',
      '    <g scChartCategoryAxis />',
      '    <g scChartValueAxis />',
      '    <g scChartCursor />',
      '    <g scChartScatter key="…" xKey="…" />',
      '  </svg>',
      '  <div scChartTooltipProvider>',
      '    <ng-template scChartTooltipPortal>',
      '      <div scChartTooltip #tooltip="scChartTooltip">',
      '        <div scChartTooltipLabel>…</div>',
      '        <div scChartTooltipItem [item]="…">',
      '          <span scChartTooltipIndicator></span>',
      '          <span scChartTooltipName>…</span>',
      '          <span scChartTooltipValue>…</span>',
      '        </div>',
      '      </div>',
      '    </ng-template>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly inputs: ApiInput[] = [
    {
      name: 'key',
      type: 'string (required)',
      default: '—',
      description: "each point's y value",
    },
    {
      name: 'xKey',
      type: 'string (required)',
      default: '—',
      description: "each point's x value",
    },
    {
      name: 'sizeKey',
      type: 'string',
      default: "''",
      description: "a third value, each point's size (area)",
    },
    {
      name: 'radius',
      type: 'number',
      default: '5',
      description: "its points' radius — the largest's, with a sizeKey",
    },
    {
      name: 'fillOpacity',
      type: 'number',
      default: '0.7',
      description: '',
    },
    {
      name: 'isAnimationActive',
      type: 'boolean',
      default: 'true',
      description: "its points grow when it appears (Recharts' entrance)",
    },
    {
      name: 'animationBegin',
      type: 'number',
      default: '0',
      description: 'the wait before it starts, in ms',
    },
    {
      name: 'animationDuration',
      type: 'number',
      default: '400',
      description: 'how long it lasts, in ms',
    },
    {
      name: 'animationEasing',
      type: 'ease, ease-in, ease-out, ease-in-out, linear',
      default: 'linear',
      description: '',
    },
    {
      name: 'animationMatchBy',
      type: "'index' (by position, stretched), 'append' (the first with the first) or (row, index) => key",
      default: "'append'",
      description:
        "how its shapes before and after a change are paired (Recharts')",
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Merged over its own classes.',
    },
  ];
}
