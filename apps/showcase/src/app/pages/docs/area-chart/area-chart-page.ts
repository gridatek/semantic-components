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
import { AreaChartUsageDemoContainer } from './demos/area-chart-usage-demo-container';
import { ExpandedAreaChartDemoContainer } from './demos/expanded-area-chart-demo-container';
import { InteractiveAreaChartDemoContainer } from './demos/interactive-area-chart-demo-container';
import { RtlAreaChartDemoContainer } from './demos/rtl-area-chart-demo-container';
import { StackedAreaChartDemoContainer } from './demos/stacked-area-chart-demo-container';

@Component({
  selector: 'app-area-chart-page',
  imports: [
    ScKbd,
    AreaChartUsageDemoContainer,
    Anatomy,
    ApiTable,
    RouterLink,
    RtlAreaChartDemoContainer,
    InteractiveAreaChartDemoContainer,
    StackedAreaChartDemoContainer,
    ExpandedAreaChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Area Chart</h1>
        <p class="text-muted-foreground">
          Series as areas, filled down to 0 or stacked — to 100% if you like —
          with natural, linear, step or monotone edges; gradients of your own.
          Each series' name and color come from the chart's config; the keyboard
          moves through the categories, and the tooltip says their values.
        </p>
        <app-component-badges path="area-chart" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartArea"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-area-chart-usage-demo-container />
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
            its categories; <kbd scKbd>Escape</kbd> closes the tooltip.
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
        <app-stacked-area-chart-demo-container />
        <app-expanded-area-chart-demo-container />
        <app-interactive-area-chart-demo-container />
        <app-rtl-area-chart-demo-container />
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
        <app-api-table label="ScChartArea inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AreaChartPage {
  private readonly anatomy = {
    imports:
      "import { ScChart, ScChartPlot, ScChartCategoryAxis, ScChartCursor, ScChartGrid, ScChartValueAxis, ScChartArea, ScChartTooltip, ScChartTooltipIndicator, ScChartTooltipItem, ScChartTooltipName, ScChartTooltipPortal, ScChartTooltipProvider, ScChartTooltipValue, ScChartLegend, ScChartLegendIndicator, ScChartLegendItem } from '@semantic-components/ui/charts';",
    markup: [
      '<div scChart [config]="…" [data]="…">',
      '  <svg scChartPlot categoryKey="…" aria-label="…">',
      '    <g scChartGrid />',
      '    <g scChartCategoryAxis />',
      '    <g scChartValueAxis />',
      '    <g scChartCursor />',
      '    <g scChartArea key="…" />',
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

  private readonly inputs: ApiInput[] = [
    {
      name: 'key',
      type: 'string (required)',
      default: '—',
      description: "the series' key in the rows",
    },
    {
      name: 'curve',
      type: "'natural' | 'linear' | 'step' | 'monotone'",
      default: "'natural'",
      description: '',
    },
    {
      name: 'stack',
      type: 'string | null',
      default: 'null',
      description: 'areas of a stack on one another',
    },
    {
      name: 'fill',
      type: 'string',
      default: "''",
      description: 'instead of its color, url(#gradient)',
    },
    {
      name: 'fillOpacity',
      type: 'number',
      default: '0.4',
      description: '',
    },
    {
      name: 'activeDot',
      type: 'boolean',
      default: 'true',
      description: 'a dot where the pointer is',
    },
    {
      name: 'isAnimationActive',
      type: 'boolean',
      default: 'true',
      description:
        "it unveils itself from its first category when it appears (Recharts' entrance)",
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
      default: 'ease',
      description: '',
    },
    {
      name: 'animationMatchBy',
      type: "'index' (by position, stretched), 'append' (the first with the first) or (row, index) => key",
      default: "'index'",
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
