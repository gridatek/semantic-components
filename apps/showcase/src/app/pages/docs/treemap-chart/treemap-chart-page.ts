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
import { GroupedTreemapChartDemoContainer } from './demos/grouped-treemap-chart-demo-container';
import { RtlTreemapChartDemoContainer } from './demos/rtl-treemap-chart-demo-container';
import { TreemapChartUsageDemoContainer } from './demos/treemap-chart-usage-demo-container';

@Component({
  selector: 'app-treemap-chart-page',
  imports: [
    TreemapChartUsageDemoContainer,
    Anatomy,
    ApiTable,
    RouterLink,
    RtlTreemapChartDemoContainer,
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

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-treemap-chart-usage-demo-container />
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
            keys, Home and End move through its boxes; Escape closes the
            tooltip.
          </li>
          <li>
            As the keyboard moves, screen readers hear what the tooltip says,
            through the CDK&apos;s LiveAnnouncer (politely).
          </li>
          <li>
            Right to left, it isn&apos;t mirrored: a treemap reads the same both
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
        <app-grouped-treemap-chart-demo-container />
        <app-rtl-treemap-chart-demo-container />
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
        <app-api-table label="ScChartTreemap inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TreemapChartPage {
  protected readonly anatomy = {
    imports:
      "import { ScChart, ScChartPlot, ScChartTooltip, ScChartTooltipIndicator, ScChartTooltipItem, ScChartTooltipName, ScChartTooltipPortal, ScChartTooltipProvider, ScChartTooltipValue } from '@semantic-components/ui/charts';\nimport { ScChartTreemap } from '@semantic-components/ui/charts/treemap';",
    markup: [
      '<div scChart [config]="…" [data]="…">',
      '  <svg scChartPlot categoryKey="…" aria-label="…">',
      '    <g scChartTreemap key="…" />',
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
      description: "each box's value",
    },
    {
      name: 'groupKey',
      type: 'string',
      default: "''",
      description: "each row's group",
    },
    {
      name: 'gap',
      type: 'number',
      default: '2',
      description: 'the space between boxes, in px',
    },
    {
      name: 'isAnimationActive',
      type: 'boolean',
      default: 'true',
      description:
        "its boxes slide in from the left when it appears (Recharts' entrance)",
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
      default: '1500',
      description: 'how long it lasts, in ms',
    },
    {
      name: 'animationEasing',
      type: 'ease, ease-in, ease-out, ease-in-out, linear',
      default: 'linear',
      description: '',
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Merged over its own classes.',
    },
  ];
}
