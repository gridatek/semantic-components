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
    <g scChartBar key="desktop" stack="a" [radius]="[0, 0, 4, 4]" />
    <g scChartBar key="mobile" stack="a" [radius]="[4, 4, 0, 0]" />
  </svg>
  <div scChartTooltip indicator="dashed"></div>
  <div scChartLegend></div>
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

| Part                       | Inputs                                                                                                                                                                                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `div[scChart]`             | `data`, `config`                                                                                                                                                                                                                                                 |
| `svg[scChartPlot]`         | `categoryKey` (required), `margin`, `layout` (`horizontal` \| `vertical`: categories down the side, bars across), `stackOffset` (`none` \| `expand`: to 100%); polar charts: `startAngle`, `endAngle` (degrees, 0 at the top, clockwise); name it (`aria-label`) |
| `g[scChartGrid]`           | `horizontal` (true), `vertical` (false), `tickCount`                                                                                                                                                                                                             |
| `g[scChartCategoryAxis]`   | The categories, under the plot (beside it, laid out `vertical`): `tickFormatter(category, index)`, `width` (60, beside) — evenly skipped when they don't fit                                                                                                     |
| `g[scChartValueAxis]`      | The values, beside the plot (under it, laid out `vertical`): `width` (40), `tickCount`, `tickFormatter(value)` — the app's locale by default                                                                                                                     |
| `g[scChartCursor]`         | — a band behind bars, a line across points                                                                                                                                                                                                                       |
| `g[scChartPolarGrid]`      | Polar charts: `shape` (`polygon` \| `circle`), `ringCount` (4), `spokes` (true)                                                                                                                                                                                  |
| `g[scChartPolarAngleAxis]` | A radar's categories around it: `tickFormatter(category, index)`                                                                                                                                                                                                 |
| `g[scChartCenter]`         | A polar chart's center: your SVG at (0, 0) — a donut's total                                                                                                                                                                                                     |
| `g[scChartLabels]`         | Inside a series: its values written on the chart — `position` (`outside` \| `inside` \| `start`), `offset` (8), `formatter(value, category, index)`                                                                                                              |
| `div[scChartTooltip]`      | `indicator` (`dot` \| `line` \| `dashed`), `hideLabel`, `hideIndicator`, `labelFormatter`, `valueFormatter`                                                                                                                                                      |
| `div[scChartLegend]`       | — each series' color and name                                                                                                                                                                                                                                    |

Series with the same `stack` are drawn on one another; values below 0 go down (diverging stacks).

## Keyboard and screen readers

- The plot is one tab stop (`role="group"`, named by its `aria-label`): on focus, the first category; ←/→ (↑/↓), Home and End move between categories; Escape closes the tooltip.
- The tooltip is a polite live region: as the keyboard moves, screen readers hear the category and its values.
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
