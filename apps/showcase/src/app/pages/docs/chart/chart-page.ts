import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScFrame,
  ScKbd,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTypeset,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ChartUsageDemoContainer } from './demos/chart-usage-demo-container';
import { TooltipChartDemoContainer } from './demos/tooltip-chart-demo-container';

@Component({
  selector: 'app-chart-page',
  imports: [
    ScKbd,
    ChartUsageDemoContainer,
    Anatomy,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScFrame,
    RouterLink,
    TooltipChartDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Chart</h1>
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
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="charts"
          library="d3-scale d3-shape"
          href="https://d3js.org"
          names="ScChart, ScChartPlot, ScChartTooltipProvider, ScChartTooltipPortal, ScChartTooltip, ScChartTooltipLabel, ScChartTooltipItem, ScChartTooltipIndicator, ScChartTooltipName, ScChartTooltipValue, ScChartLegend, ScChartLegendItem, ScChartLegendIndicator"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-chart-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The chart holds the rows and the config; the plot draws the grid, the
          axes, the cursor and the series; the tooltip and the legend are yours
          to write, from their state. A part you leave out isn&apos;t there.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The plot is one tab stop, a group named by its aria-label: on focus,
            the first category; the arrow keys, <kbd scKbd>Home</kbd> and
            <kbd scKbd>End</kbd> move between them;
            <kbd scKbd>Escape</kbd> closes the tooltip. A tap points like the
            pointer.
          </li>
          <li>
            As the keyboard moves, screen readers hear what the tooltip says —
            your text, as you formatted it — through the CDK&apos;s
            LiveAnnouncer (politely). The indicators are hidden from them.
          </li>
          <li>
            The axes, the grid and the cursor are hidden from assistive
            technology: the tooltip says what they show.
          </li>
          <li>
            With reduced motion (prefers-reduced-motion), the series appear and
            change at once.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Tooltip and legend</h2>
        <p>
          Each series' name and color come from the chart's config; its color is
          <code scTypeset>--color-&lt;key&gt;</code>, for your own SVG too. You
          write what the tooltip and the legend show, from their state (the
          category, an item per series): each part you leave out isn't there,
          and the text and its format are yours. The tooltip marks each value
          with a dot, a line or a dash.
        </p>
        <app-tooltip-chart-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Chart types</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (type of types; track type.path) {
            <a
              scFrame
              [routerLink]="'/docs/charts/' + type.path"
              class="hover:bg-accent p-6 transition-colors"
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

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          The parts every chart shares, and their inputs; each series&apos; are
          on its own page. Each part takes
          <code scTypeset>class</code>, merged over its own.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Chart parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Inputs</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.selector) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ChartPage {
  private readonly anatomy = {
    imports:
      "import { ScChart, ScChartBar, ScChartCategoryAxis, ScChartCursor, ScChartGrid, ScChartLabels, ScChartLegend, ScChartLegendIndicator, ScChartLegendItem, ScChartPlot, ScChartTooltip, ScChartTooltipIndicator, ScChartTooltipItem, ScChartTooltipLabel, ScChartTooltipName, ScChartTooltipPortal, ScChartTooltipProvider, ScChartTooltipValue, ScChartValueAxis } from '@semantic-components/ui/charts';",
    markup: [
      '<div scChart [config]="…" [data]="…">',
      '  <svg scChartPlot categoryKey="…" aria-label="…">',
      '    <g scChartGrid />',
      '    <g scChartCategoryAxis />',
      '    <g scChartValueAxis />',
      '    <g scChartCursor />',
      '    <g scChartBar key="…">',
      '      <g scChartLabels />',
      '    </g>',
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

  private readonly parts = [
    {
      selector: 'div[scChart]',
      description: 'data, config',
    },
    {
      selector: 'svg[scChartPlot]',
      description:
        "categoryKey (required), margin (as Recharts: 5 on each side without one; the sides a given one leaves out are 0), layout (horizontal | vertical: categories down the side, bars across), stackOffset (none | expand: to 100%); polar charts: startAngle, endAngle (Recharts': degrees, 0 at 3 o'clock, counterclockwise; unset, 0 to 360 — a radar's 90 to −270, from the top clockwise); name it (aria-label)",
    },
    {
      selector: 'g[scChartGrid]',
      description:
        "horizontal (true), vertical (false) — its lines at the value axis's ticks, as Recharts' grid",
    },
    {
      selector: 'g[scChartCategoryAxis]',
      description:
        "The categories, under the plot (beside it, laid out vertical): tickFormatter(category, index), width (60, beside) — evenly skipped when they don't fit. reversed: the categories from the right (from the bottom, vertical); orientation (left, right): its side, beside — both unset by default: the chart's (see Right to left). orientation also top or bottom along the plot (top: the labels above it); hide: no room, no labels (Recharts').",
    },
    {
      selector: 'g[scChartValueAxis]',
      description:
        "The values, beside the plot (under it, laid out vertical): width (40), tickCount (5: Recharts' nice ticks, which also set the value domain — 0 to 320 for values up to 305), tickFormatter(value) — the app's locale by default. reversed: the values down from the top (from the right, vertical); orientation (left, right): its side — both unset by default: the chart's (see Right to left). domain ([0, 100]): its values' range, fixed (Recharts') — else from the data; hide: no room, no labels, its domain still holding.",
    },
    {
      selector: 'g[scChartCursor]',
      description: '— a band behind bars, a line across points',
    },
    {
      selector: 'g[scChartPolarGrid]',
      description:
        'Polar charts: shape (polygon | circle), ringCount (4), spokes (true)',
    },
    {
      selector: 'g[scChartPolarAngleAxis]',
      description:
        "A radar's categories around it: tickFormatter(category, index)",
    },
    {
      selector: 'g[scChartCenter]',
      description:
        "A polar chart's center: your SVG at (0, 0) — a donut's total",
    },
    {
      selector: 'g[scChartLabels]',
      description:
        'Inside a series: its values written on the chart — position (outside | inside | start), offset (8), formatter(value, category, index)',
    },
    {
      selector: 'div[scChartTooltipProvider]',
      description:
        "The tooltip: its portal in a CDK overlay while a category is active — beside the pointer, or the item the keyboard reached; flipped and kept in the window. side (right), alignment (start), sideOffset (10), alignmentOffset (10): Recharts' place. isAnimationActive (true), animationDuration (400), animationEasing (ease): it glides from place to place, as Recharts' (not with reduced motion). Holds the state",
    },
    {
      selector: 'ng-template[scChartTooltipPortal]',
      description: "The tooltip's content, rendered while it shows",
    },
    {
      selector: 'div[scChartTooltip]',
      description:
        "The box, in the style's look (exportAs: scChartTooltip): active(), label() (the category), payload() (an item per series: dataKey, name, value, color) — see [Tooltip and legend](#tooltip-and-legend)",
    },
    {
      selector: '[scChartTooltipLabel]',
      description: "The tooltip's title: write the category",
    },
    {
      selector: '[scChartTooltipItem]',
      description:
        'A row: item (one of payload()) — its indicator takes its colour',
    },
    {
      selector: '[scChartTooltipIndicator]',
      description: "The row's mark: variant (dot | line | dashed)",
    },
    {
      selector: '[scChartTooltipName], [scChartTooltipValue]',
      description:
        "The row's name (muted) and value (at its end, tabular figures): write them",
    },
    {
      selector: 'div[scChartLegend]',
      description:
        "The legend's row (exportAs: scChartLegend): payload() — the series, or a pie's categories, a sunburst's groups, a sankey's nodes (dataKey, name, color)",
    },
    {
      selector: '[scChartLegendItem], [scChartLegendIndicator]',
      description: 'An entry: item (one of payload()), and its colour swatch',
    },
  ];

  private readonly types = [
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
    {
      name: 'Pie Chart',
      path: 'pie-chart',
      description: 'Slices of a whole: a pie, a donut, rings.',
    },
    {
      name: 'Radial Chart',
      path: 'radial-chart',
      description: 'A ring per row, its value as an arc.',
    },
    {
      name: 'Radar Chart',
      path: 'radar-chart',
      description: 'Polygons over the categories, one per series.',
    },
    {
      name: 'Scatter Chart',
      path: 'scatter-chart',
      description: 'Points at two values — sized by a third: bubbles.',
    },
    {
      name: 'Funnel Chart',
      path: 'funnel-chart',
      description: 'Stages, top to bottom, narrowing to the next.',
    },
    {
      name: 'Treemap Chart',
      path: 'treemap-chart',
      description: 'Boxes as large as their values, in groups.',
    },
    {
      name: 'Sunburst Chart',
      path: 'sunburst-chart',
      description: 'Two rings: groups inside, their rows around.',
    },
    {
      name: 'Sankey Chart',
      path: 'sankey-chart',
      description: 'Flows between nodes, as thick as their values.',
    },
  ];
}
