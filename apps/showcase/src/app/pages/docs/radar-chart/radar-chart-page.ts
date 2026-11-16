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
import { LinesRadarChartDemoContainer } from './demos/lines-radar-chart-demo-container';
import { MultipleRadarChartDemoContainer } from './demos/multiple-radar-chart-demo-container';
import { RadarChartUsageDemoContainer } from './demos/radar-chart-usage-demo-container';
import { RtlRadarChartDemoContainer } from './demos/rtl-radar-chart-demo-container';

@Component({
  selector: 'app-radar-chart-page',
  imports: [
    RadarChartUsageDemoContainer,
    Anatomy,
    ApiTable,
    RouterLink,
    RtlRadarChartDemoContainer,
    MultipleRadarChartDemoContainer,
    LinesRadarChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Radar Chart</h1>
        <p class="text-muted-foreground">
          Series as polygons over the categories, each on its spoke: filled or
          outlined, with dots, on a polygon or circle grid. Names and colors
          come from the chart's config; the keyboard moves through the rows, and
          the tooltip says their values.
        </p>
        <app-component-badges path="radar-chart" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartRadar"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-radar-chart-usage-demo-container />
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
            keys, Home and End move through its spokes; Escape closes the
            tooltip.
          </li>
          <li>
            As the keyboard moves, screen readers hear what the tooltip says,
            through the CDK&apos;s LiveAnnouncer (politely).
          </li>
          <li>
            Right to left, with the app following the direction
            (charts.followDirection), it is mirrored — its spokes
            counterclockwise from the top — and ← goes to the next.
          </li>
          <li>
            With reduced motion (prefers-reduced-motion), it appears and changes
            at once.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-multiple-radar-chart-demo-container />
        <app-lines-radar-chart-demo-container />
        <app-rtl-radar-chart-demo-container />
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
        <app-api-table label="ScChartRadar inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RadarChartPage {
  protected readonly anatomy = {
    imports:
      "import { ScChart, ScChartPlot, ScChartPolarAngleAxis, ScChartPolarGrid, ScChartRadar, ScChartTooltip, ScChartTooltipIndicator, ScChartTooltipItem, ScChartTooltipName, ScChartTooltipPortal, ScChartTooltipProvider, ScChartTooltipValue, ScChartLegend, ScChartLegendIndicator, ScChartLegendItem } from '@semantic-components/ui/charts';",
    markup: [
      '<div scChart [config]="…" [data]="…">',
      '  <svg scChartPlot categoryKey="…" aria-label="…">',
      '    <g scChartPolarGrid />',
      '    <g scChartPolarAngleAxis />',
      '    <g scChartRadar key="…" />',
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
      name: 'fillOpacity',
      type: 'number (0',
      default: '0.6',
      description: 'outline only, with stroke)',
    },
    {
      name: 'stroke',
      type: 'boolean',
      default: 'false',
      description: 'its outline',
    },
    {
      name: 'dots',
      type: 'boolean',
      default: 'false',
      description: 'a dot at each value',
    },
    {
      name: 'activeDot',
      type: 'boolean',
      default: 'true',
      description: 'a dot on the spoke pointed at',
    },
    {
      name: 'isAnimationActive',
      type: 'boolean',
      default: 'true',
      description:
        "its points move out from the center when it appears (Recharts' entrance)",
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
