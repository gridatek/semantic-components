import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DonutChartDemoContainer } from './demos/donut-chart-demo-container';
import { LabelPieChartDemoContainer } from './demos/label-pie-chart-demo-container';
import { PieChartUsageDemoContainer } from './demos/pie-chart-usage-demo-container';
import { RtlPieChartDemoContainer } from './demos/rtl-pie-chart-demo-container';
import { StackedPieChartDemoContainer } from './demos/stacked-pie-chart-demo-container';

@Component({
  selector: 'app-pie-chart-page',
  imports: [
    ScKbd,
    PieChartUsageDemoContainer,
    Anatomy,
    ApiTable,
    RouterLink,
    RtlPieChartDemoContainer,
    LabelPieChartDemoContainer,
    DonutChartDemoContainer,
    StackedPieChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Pie Chart</h1>
        <p class="text-muted-foreground">
          A series as slices of a whole, each in its category's color: a pie, a
          donut with your text in its center, rings. Names and colors come from
          the chart's config; the keyboard moves through the rows, and the
          tooltip says their values.
        </p>
        <app-component-badges path="pie-chart" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartPie"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-pie-chart-usage-demo-container />
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
            keys, <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> move through
            its slices; <kbd scKbd>Escape</kbd> closes the tooltip.
          </li>
          <li>
            As the keyboard moves, screen readers hear what the tooltip says,
            through the CDK&apos;s LiveAnnouncer (politely).
          </li>
          <li>
            Right to left, with the app following the direction
            (charts.followDirection), it is mirrored — from 9 o’clock, clockwise
            — and <kbd scKbd>←</kbd> goes to the next.
          </li>
          <li>
            With reduced motion (prefers-reduced-motion), it appears and changes
            at once.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-donut-chart-demo-container />
        <app-stacked-pie-chart-demo-container />
        <app-label-pie-chart-demo-container />
        <app-rtl-pie-chart-demo-container />
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
        <app-api-table label="ScChartPie inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PieChartPage {
  private readonly anatomy = {
    imports:
      "import { ScChart, ScChartPlot, ScChartPie, ScChartTooltip, ScChartTooltipIndicator, ScChartTooltipItem, ScChartTooltipName, ScChartTooltipPortal, ScChartTooltipProvider, ScChartTooltipValue, ScChartLegend, ScChartLegendIndicator, ScChartLegendItem } from '@semantic-components/ui/charts';",
    markup: [
      '<div scChart [config]="…" [data]="…">',
      '  <svg scChartPlot categoryKey="…" aria-label="…">',
      '    <g scChartPie key="…" />',
      '  </svg>',
      '  <div scChartTooltipProvider>',
      '    <ng-template scChartTooltipPortal>',
      '      <div scChartTooltip #tooltip="scChartTooltip">',
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

  private readonly inputs: ApiInput[] = [
    {
      name: 'key',
      type: 'string (required)',
      default: '—',
      description: "each slice's value",
    },
    {
      name: 'innerRadius',
      type: 'number',
      default: '0',
      description: 'its hole, a share of the radius',
    },
    {
      name: 'outerRadius',
      type: 'number',
      default: '1',
      description: 'its edge, a share of the radius',
    },
    {
      name: 'padAngle',
      type: 'number',
      default: '0',
      description: 'the gap between slices, in degrees',
    },
    {
      name: 'cornerRadius',
      type: 'number',
      default: '—',
      description:
        "Its slices' corners' rounding, in px — unset, the style's (--sc-chart-bar-radius, as the bars'; square in Lyra and Sera). A whole pie's outer corners only: its slices meet in the middle.",
    },
    {
      name: 'strokeWidth',
      type: 'number',
      default: '2',
      description: 'the line between slices (0: none)',
    },
    {
      name: 'activeOffset',
      type: 'number',
      default: '6',
      description: 'how far the slice pointed at grows',
    },
    {
      name: 'isAnimationActive',
      type: 'boolean',
      default: 'true',
      description:
        "it sweeps round from its start angle when it appears (Recharts' entrance)",
    },
    {
      name: 'animationBegin',
      type: 'number',
      default: '400',
      description: 'the wait before it starts, in ms',
    },
    {
      name: 'animationDuration',
      type: 'number',
      default: '1500',
      description: 'how long it lasts, in ms',
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
