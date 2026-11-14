# Chart

Charts made of parts, as [shadcn/ui's](https://ui.shadcn.com/charts) (Recharts): a plot (`svg`) holding a grid, axes, a cursor and series — areas, bars, lines, stacked or not — and around it a tooltip and a legend. Drawn with d3's scales and shapes (`d3-scale`, `d3-shape`, peers of this entry), in SVG of ours.

Recharts' API, shadcn's look, our drawing: before fixing a bug, writing these docs or adding an option, see how Recharts does it — [docs/reference-libraries.md](../../../../../../../docs/reference-libraries.md#charts).

## Usage

```html
<div scChart [config]="config" [data]="data">
  <svg scChartPlot categoryKey="month" aria-label="Visitors by device, January to June">
    <g scChartGrid />
    <g scChartCategoryAxis [tickFormatter]="short" />
    <g scChartCursor />
    <g scChartBar key="desktop" stack="a" corners="base" />
    <g scChartBar key="mobile" stack="a" corners="end" />
  </svg>
  <div scChartTooltipProvider>
    <ng-template scChartTooltipPortal>
      <div scChartTooltip #tooltip="scChartTooltip">
        <div scChartTooltipLabel>{{ tooltip.label() }}</div>
        @for (item of tooltip.payload(); track item.dataKey) {
        <div scChartTooltipItem [item]="item">
          <span scChartTooltipIndicator variant="dashed"></span>
          <span scChartTooltipName>{{ item.name }}</span>
          <span scChartTooltipValue>{{ item.value | number }}</span>
        </div>
        }
      </div>
    </ng-template>
  </div>
  <div scChartLegend #legend="scChartLegend">
    @for (item of legend.payload(); track item.dataKey) {
    <div scChartLegendItem [item]="item">
      <span scChartLegendIndicator></span>
      {{ item.name }}
    </div>
    }
  </div>
</div>
```

```ts
readonly data = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
];
readonly config: ScChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
};
```

Each row has its category (`categoryKey`) and a value per series. The config names each series (tooltip, legend) and gives its color, as `--color-<key>` on the chart — usable in your own SVG too (gradients: `stop-color="var(--color-desktop)"`). Parts are drawn in their order: grid and cursor first, series over them.

## Parts

The series have their own folders: [area](../area-chart/README.md), [bar](../bar-chart/README.md), [line](../line-chart/README.md), [pie](../pie-chart/README.md), [radial](../radial-chart/README.md), [radar](../radar-chart/README.md), [scatter](../scatter-chart/README.md), [funnel](../funnel-chart/README.md), [treemap](../../../../treemap/src/lib/components/treemap-chart/README.md), [sunburst](../sunburst-chart/README.md), [sankey](../../../../sankey/src/lib/components/sankey-chart/README.md). Treemap and sankey are entry points of their own (`@semantic-components/ui/charts/treemap`, `…/sankey`): they need one more d3 library each (`d3-hierarchy`, `d3-sankey`), which the other charts shouldn't.

| Part                                              | Inputs                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `div[scChart]`                                    | `data`, `config`                                                                                                                                                                                                                                                                                                                                   |
| `svg[scChartPlot]`                                | `categoryKey` (required), `margin` (as Recharts: 5 on each side without one; the sides a given one leaves out are 0), `layout` (`horizontal` \| `vertical`: categories down the side, bars across), `stackOffset` (`none` \| `expand`: to 100%); polar charts: `startAngle`, `endAngle` (degrees, 0 at the top, clockwise); name it (`aria-label`) |
| `g[scChartGrid]`                                  | `horizontal` (true), `vertical` (false) — its lines at the value axis's ticks, as Recharts' grid                                                                                                                                                                                                                                                   |
| `g[scChartCategoryAxis]`                          | The categories, under the plot (beside it, laid out `vertical`): `tickFormatter(category, index)`, `width` (60, beside) — evenly skipped when they don't fit                                                                                                                                                                                       |
| `g[scChartValueAxis]`                             | The values, beside the plot (under it, laid out `vertical`): `width` (40), `tickCount` (5: Recharts' nice ticks, which also set the value domain — 0 to 320 for values up to 305), `tickFormatter(value)` — the app's locale by default                                                                                                            |
| `g[scChartCursor]`                                | — a band behind bars, a line across points                                                                                                                                                                                                                                                                                                         |
| `g[scChartPolarGrid]`                             | Polar charts: `shape` (`polygon` \| `circle`), `ringCount` (4), `spokes` (true)                                                                                                                                                                                                                                                                    |
| `g[scChartPolarAngleAxis]`                        | A radar's categories around it: `tickFormatter(category, index)`                                                                                                                                                                                                                                                                                   |
| `g[scChartCenter]`                                | A polar chart's center: your SVG at (0, 0) — a donut's total                                                                                                                                                                                                                                                                                       |
| `g[scChartLabels]`                                | Inside a series: its values written on the chart — `position` (`outside` \| `inside` \| `start`), `offset` (8), `formatter(value, category, index)`                                                                                                                                                                                                |
| `div[scChartTooltipProvider]`                     | The tooltip: its portal in a CDK overlay while a category is active — beside the pointer, or the item the keyboard reached; flipped and kept in the window. `side` (`right`), `alignment` (`start`), `sideOffset` (10), `alignmentOffset` (10): Recharts' place. Holds the state, and the live region screen readers hear                          |
| `ng-template[scChartTooltipPortal]`               | The tooltip's content, rendered while it shows                                                                                                                                                                                                                                                                                                     |
| `div[scChartTooltip]`                             | The box, in the preset's look (`exportAs: scChartTooltip`): `active()`, `label()` (the category), `payload()` (an item per series: `dataKey`, `name`, `value`, `color`) — see [Tooltip and legend](#tooltip-and-legend)                                                                                                                            |
| `[scChartTooltipLabel]`                           | The tooltip's title: write the category                                                                                                                                                                                                                                                                                                            |
| `[scChartTooltipItem]`                            | A row: `item` (one of `payload()`) — its indicator takes its colour                                                                                                                                                                                                                                                                                |
| `[scChartTooltipIndicator]`                       | The row's mark: `variant` (`dot`                                                                                                                                                                                                                                                                                                                   | `line` | `dashed`) |
| `[scChartTooltipName]`, `[scChartTooltipValue]`   | The row's name (muted) and value (at its end, tabular figures): write them                                                                                                                                                                                                                                                                         |
| `div[scChartLegend]`                              | The legend's row (`exportAs: scChartLegend`): `payload()` — the series, or a pie's categories, a sunburst's groups, a sankey's nodes (`dataKey`, `name`, `color`)                                                                                                                                                                                  |
| `[scChartLegendItem]`, `[scChartLegendIndicator]` | An entry: `item` (one of `payload()`), and its colour swatch                                                                                                                                                                                                                                                                                       |

Series with the same `stack` are drawn on one another; values below 0 go down (diverging stacks).

## Tooltip and legend

You write what they show, from their state — Recharts' `content`, as parts: `label()` and `payload()` on the tooltip, `payload()` on the legend, with Recharts' names. A part you leave out isn't there: no label (a pie's single value), no indicator. The text is yours, so formatting is too — a pipe or a function of yours:

```html
<div scChartTooltipProvider>
  <ng-template scChartTooltipPortal>
    <div scChartTooltip #tooltip="scChartTooltip">
      <div scChartTooltipLabel>{{ day(tooltip.label()) }}</div>
      @for (item of tooltip.payload(); track item.dataKey) {
      <div scChartTooltipItem [item]="item">
        <span scChartTooltipIndicator variant="line"></span>
        <span scChartTooltipName>{{ item.name }}</span>
        <span scChartTooltipValue>{{ item.value | currency: 'EUR' }}</span>
      </div>
      }
    </div>
  </ng-template>
</div>
```

- **Where it goes**: in a CDK overlay (the end of the page), so it can leave a small card — beside the pointer, 10px right and down as Recharts'; with the keyboard, beside the item reached (a bar's end, a point; a series can give its own box). It flips and stays in the window where there is no room, and closes on scroll. Its box carries the series' colors (`--color-<key>`), which the chart sets on itself.
- **Closed, it is not there**; `label()` and `payload()` keep the last category shown (the first before any), so what you write from them always has one to format.
- **The values are raw numbers**: `| number` writes them in the app's locale (its `LOCALE_ID`).
- **The tooltip's box** is the preset's (`chart.tooltip`): its corners, border or ring, shadow — shadcn's, style by style. Your `class` adds to it.
- **Names and colours** come from the chart's `config`; a pie's slice, a radial bar are named and coloured by their category.

## Keyboard and screen readers

- The plot is one tab stop (`role="group"`, named by its `aria-label`): on focus, the first category; ←/→ (↑/↓), Home and End move between categories; Escape closes the tooltip.
- The provider keeps a polite live region in the chart: as the keyboard moves, screen readers hear what the tooltip shows — your text, as you formatted it. The indicators are hidden from them.
- The axes, grid and cursor are hidden from assistive technology: the tooltip says what they show.

## Labels

`g[scChartLabels]` goes inside a series and writes its values: beyond each bar's end or above each point (`outside`), in the middle of each bar or slice (`inside`), at each bar's base or ring's start (`start`). Its `formatter` gets the value, the category and the index — a category's name inside its bar:

```html
<g scChartBar key="desktop">
  <g scChartLabels position="start" [formatter]="name" />
  <g scChartLabels />
</g>
```

Several in one series, each its own position. Make room for those outside with the plot's `margin`.
