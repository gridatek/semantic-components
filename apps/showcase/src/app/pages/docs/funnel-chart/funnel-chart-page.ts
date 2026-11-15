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
import { FunnelChartUsageDemoContainer } from './demos/funnel-chart-usage-demo-container';
import { LabelFunnelChartDemoContainer } from './demos/label-funnel-chart-demo-container';
import { RtlFunnelChartDemoContainer } from './demos/rtl-funnel-chart-demo-container';

@Component({
  selector: 'app-funnel-chart-page',
  imports: [
    FunnelChartUsageDemoContainer,
    Anatomy,
    ApiTable,
    RouterLink,
    RtlFunnelChartDemoContainer,
    LabelFunnelChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Funnel Chart</h1>
        <p class="text-muted-foreground">
          A series as stages, top to bottom, each as wide as its value and
          narrowing to the next, in its category's color. Names and colors come
          from the chart's config; the keyboard moves through the stages, and
          the tooltip says their values.
        </p>
        <app-component-badges path="funnel-chart" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartFunnel"
        />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-funnel-chart-usage-demo-container />
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
            keys, Home and End move through its stages; Escape closes the
            tooltip.
          </li>
          <li>
            As the keyboard moves, screen readers hear what the tooltip says,
            through the CDK&apos;s LiveAnnouncer (politely).
          </li>
          <li>
            Right to left, it isn&apos;t mirrored: a funnel reads the same both
            ways, so the arrows keep their way.
          </li>
          <li>
            With reduced motion (prefers-reduced-motion), it appears and changes
            at once.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-label-funnel-chart-demo-container />
        <app-rtl-funnel-chart-demo-container />
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
        <app-api-table label="ScChartFunnel inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FunnelChartPage {
  protected readonly anatomy = {
    imports:
      "import { ScChart, ScChartPlot, ScChartFunnel, ScChartTooltip, ScChartTooltipIndicator, ScChartTooltipItem, ScChartTooltipName, ScChartTooltipPortal, ScChartTooltipProvider, ScChartTooltipValue } from '@semantic-components/ui/charts';",
    markup: [
      '<div scChart [config]="…" [data]="…">',
      '  <svg scChartPlot categoryKey="…" aria-label="…">',
      '    <g scChartFunnel key="…" />',
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
      '</div>',
    ].join('\n'),
  };

  protected readonly inputs: ApiInput[] = [
    {
      name: 'key',
      type: 'string (required)',
      default: '—',
      description: "each stage's value",
    },
    {
      name: 'gap',
      type: 'number',
      default: '2',
      description: 'the space between stages, in px',
    },
    {
      name: 'isAnimationActive',
      type: 'boolean',
      default: 'true',
      description:
        "its stages grow out of their centers when it appears (Recharts' entrance)",
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
