import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BarChartUsageDemoContainer } from './demos/bar-chart-usage-demo-container';
import { CustomLabelBarChartDemoContainer } from './demos/custom-label-bar-chart-demo-container';
import { HorizontalBarChartDemoContainer } from './demos/horizontal-bar-chart-demo-container';
import { LabelBarChartDemoContainer } from './demos/label-bar-chart-demo-container';
import { MultipleBarChartDemoContainer } from './demos/multiple-bar-chart-demo-container';
import { NegativeBarChartDemoContainer } from './demos/negative-bar-chart-demo-container';
import { RtlBarChartDemoContainer } from './demos/rtl-bar-chart-demo-container';
import { StackedBarChartDemoContainer } from './demos/stacked-bar-chart-demo-container';

@Component({
  selector: 'app-bar-chart-page',
  imports: [
    BarChartUsageDemoContainer,
    Anatomy,
    ApiTable,
    RouterLink,
    RtlBarChartDemoContainer,
    CustomLabelBarChartDemoContainer,
    LabelBarChartDemoContainer,
    HorizontalBarChartDemoContainer,
    MultipleBarChartDemoContainer,
    StackedBarChartDemoContainer,
    NegativeBarChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Bar Chart</h1>
        <p class="text-muted-foreground">
          Series as bars: side by side, stacked, below 0; each corner's radius
          of your choice. Each series' name and color come from the chart's
          config; the keyboard moves through the categories, and the tooltip
          says their values.
        </p>
        <app-component-badges path="bar-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartBar"
        />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-bar-chart-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A chart (its rows and config), its plot with the series, and the
          tooltip and legend you write from their state.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The plot is one tab stop, a group named by its aria-label: the arrow
            keys, Home and End move through its categories; Escape closes the
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
        <h2 scHeading appToc>Examples</h2>
        <app-multiple-bar-chart-demo-container />
        <app-stacked-bar-chart-demo-container />
        <app-negative-bar-chart-demo-container />
        <app-horizontal-bar-chart-demo-container />
        <app-label-bar-chart-demo-container />
        <app-custom-label-bar-chart-demo-container />
        <app-rtl-bar-chart-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
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
        <app-api-table label="ScChartBar inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class BarChartPage {
  protected readonly anatomy = {
    imports:
      "import { ScChart, ScChartPlot, ScChartCategoryAxis, ScChartCursor, ScChartGrid, ScChartValueAxis, ScChartBar, ScChartTooltip, ScChartTooltipIndicator, ScChartTooltipItem, ScChartTooltipName, ScChartTooltipPortal, ScChartTooltipProvider, ScChartTooltipValue, ScChartLegend, ScChartLegendIndicator, ScChartLegendItem } from '@semantic-components/ui/charts';",
    markup: [
      '<div scChart [config]="…" [data]="…">',
      '  <svg scChartPlot categoryKey="…" aria-label="…">',
      '    <g scChartGrid />',
      '    <g scChartCategoryAxis />',
      '    <g scChartValueAxis />',
      '    <g scChartCursor />',
      '    <g scChartBar key="…" />',
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
      '  <div scChartLegend #legend="scChartLegend">',
      '    <div scChartLegendItem [item]="…">',
      '      <span scChartLegendIndicator></span>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly inputs: ApiInput[] = [
    {
      name: 'key',
      type: 'string (required)',
      default: '—',
      description: "the series' key in the rows",
    },
    {
      name: 'stack',
      type: 'string | null',
      default: 'null',
      description: 'bars of a stack on one another',
    },
    {
      name: 'corners',
      type: 'all | end | base | none',
      default: 'all',
      description:
        "the rounded ones — the bar's end's two (a column's top), its base's two; how round is the style's (see [Corners](#corners))",
    },
    {
      name: 'colorBy',
      type: 'key | category',
      default: 'key',
      description:
        "its key's colour, or each bar its row's category's (--color-<category>, from the config) — the tooltip and the legend then name the categories",
    },
    {
      name: 'fill',
      type: 'string',
      default: "''",
      description: 'instead of its color, url(#gradient)',
    },
    {
      name: 'barSize',
      type: 'number',
      default: "the slot's",
      description:
        "its width in pixels, centered in its slot (Recharts' barSize)",
    },
    {
      name: 'maxBarSize',
      type: 'number',
      default: '—',
      description: "its widest, in pixels (Recharts' maxBarSize)",
    },
    {
      name: 'isAnimationActive',
      type: 'boolean',
      default: 'true',
      description:
        "its bars grow from their base when it appears (Recharts' entrance)",
    },
    {
      name: 'animationBegin',
      type: 'number',
      default: '0',
      description: 'the wait before they grow, in ms',
    },
    {
      name: 'animationDuration',
      type: 'number',
      default: '400',
      description: 'how long they grow, in ms',
    },
    {
      name: 'animationEasing',
      type: 'ease, ease-in, ease-out, ease-in-out, linear',
      default: 'ease',
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
