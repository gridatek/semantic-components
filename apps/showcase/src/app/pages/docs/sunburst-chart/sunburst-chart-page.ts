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
import { LabelSunburstChartDemoContainer } from './demos/label-sunburst-chart-demo-container';
import { RtlSunburstChartDemoContainer } from './demos/rtl-sunburst-chart-demo-container';
import { SunburstChartUsageDemoContainer } from './demos/sunburst-chart-usage-demo-container';

@Component({
  selector: 'app-sunburst-chart-page',
  imports: [
    ScKbd,
    SunburstChartUsageDemoContainer,
    Anatomy,
    ApiTable,
    RouterLink,
    RtlSunburstChartDemoContainer,
    LabelSunburstChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Sunburst Chart</h1>
        <p class="text-muted-foreground">
          A series in two rings: its rows' groups inside, each their total, and
          the rows around them in their group's color. Names and colors come
          from the chart's config; the keyboard moves through the rows, and the
          tooltip says their values.
        </p>
        <app-component-badges path="sunburst-chart" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartSunburst"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-sunburst-chart-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A chart (its rows and config), its plot with the series, and the
          tooltip and legend you write from their state.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The plot is one tab stop, a group named by its aria-label: the arrow
            keys, <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> move through
            its rows; <kbd scKbd>Escape</kbd> closes the tooltip.
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
          <li>It draws whole at once: Recharts&apos; has no animation.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-label-sunburst-chart-demo-container />
        <app-rtl-sunburst-chart-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          The series&apos; inputs. The chart, its plot, axes, tooltip and legend
          are on the
          <a
            routerLink="/docs/components/chart"
            class="underline underline-offset-4"
            >Chart</a
          >
          page.
        </p>
        <app-api-table label="ScChartSunburst inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SunburstChartPage {
  private readonly anatomy = {
    imports:
      "import { ScChart, ScChartPlot, ScChartSunburst, ScChartTooltip, ScChartTooltipIndicator, ScChartTooltipItem, ScChartTooltipName, ScChartTooltipPortal, ScChartTooltipProvider, ScChartTooltipValue, ScChartLegend, ScChartLegendIndicator, ScChartLegendItem } from '@semantic-components/ui/charts';",
    markup: [
      '<div scChart [config]="…" [data]="…">',
      '  <svg scChartPlot categoryKey="…" aria-label="…">',
      '    <g scChartSunburst key="…" groupKey="…" />',
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
      description: "each row's value",
    },
    {
      name: 'groupKey',
      type: 'string (required)',
      default: '—',
      description: "each row's group, the inner ring",
    },
    {
      name: 'innerRadius',
      type: 'number',
      default: '0.3',
      description: 'its hole, a share of the radius',
    },
    {
      name: 'splitRadius',
      type: 'number',
      default: '0.65',
      description: "where the groups' ring ends, a share of the radius",
    },
    {
      name: 'strokeWidth',
      type: 'number',
      default: '2',
      description: 'the line between slices (0: none)',
    },
    {
      name: 'cornerRadius',
      type: 'number',
      default: '—',
      description:
        "Its arcs' corners' rounding, in px — unset, the style's (--sc-chart-bar-radius, as the bars'; square in Lyra and Sera).",
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Merged over its own classes.',
    },
  ];
}
