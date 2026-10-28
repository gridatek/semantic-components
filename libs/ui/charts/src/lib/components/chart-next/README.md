# Chart (Next)

Charts made of parts, as [shadcn/ui's](https://ui.shadcn.com/charts) (Recharts): a plot (`svg`) holding a grid, axes, a cursor and series — areas, bars, lines, stacked or not — and around it a tooltip and a legend. Drawn with d3's scales and shapes (`d3-scale`, `d3-shape`, peers of this entry), in SVG of ours. Next to the current charts until it replaces them.

## Usage

```html
<div scChartNext [config]="config" [data]="data">
  <svg scChartNextPlot categoryKey="month" aria-label="Visitors by device, January to June">
    <g scChartNextGrid />
    <g scChartNextXAxis [tickFormatter]="short" />
    <g scChartNextCursor />
    <g scChartNextBar key="desktop" stack="a" [radius]="[0, 0, 4, 4]" />
    <g scChartNextBar key="mobile" stack="a" [radius]="[4, 4, 0, 0]" />
  </svg>
  <div scChartNextTooltip indicator="dashed"></div>
  <div scChartNextLegend></div>
</div>
```

```ts
readonly data = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
];
readonly config: ScChartNextConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
};
```

Each row has its category (`categoryKey`) and a value per series. The config names each series (tooltip, legend) and gives its color, as `--color-<key>` on the chart — usable in your own SVG too (gradients: `stop-color="var(--color-desktop)"`). Parts are drawn in their order: grid and cursor first, series over them.

## Parts

| Part                      | Inputs                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `div[scChartNext]`        | `data`, `config`                                                                                            |
| `svg[scChartNextPlot]`    | `categoryKey` (required), `margin`, `stackOffset` (`none` \| `expand`: to 100%); name it (`aria-label`)     |
| `g[scChartNextGrid]`      | `horizontal` (true), `vertical` (false), `tickCount`                                                        |
| `g[scChartNextXAxis]`     | `tickFormatter(category, index)` — labels evenly skipped when they don't fit                                |
| `g[scChartNextYAxis]`     | `width` (40), `tickCount`, `tickFormatter(value)` — the app's locale by default                             |
| `g[scChartNextCursor]`    | — a band behind bars, a line across points                                                                  |
| `g[scChartNextArea]`      | `key`, `curve`, `stack`, `fill` (`url(#…)`), `fillOpacity` (0.4), `activeDot`                               |
| `g[scChartNextBar]`       | `key`, `stack`, `radius` (4, or `[topStart, topEnd, bottomEnd, bottomStart]`), `fill`                       |
| `g[scChartNextLine]`      | `key`, `curve`, `strokeWidth` (2), `dots`, `activeDot`                                                      |
| `div[scChartNextTooltip]` | `indicator` (`dot` \| `line` \| `dashed`), `hideLabel`, `hideIndicator`, `labelFormatter`, `valueFormatter` |
| `div[scChartNextLegend]`  | — each series' color and name                                                                               |

`curve`: `natural` (default), `linear`, `step`, `monotone`. Series with the same `stack` are drawn on one another; values below 0 go down (diverging stacks).

## Keyboard and screen readers

- The plot is one tab stop (`role="group"`, named by its `aria-label`): on focus, the first category; ←/→ (↑/↓), Home and End move between categories; Escape closes the tooltip.
- The tooltip is a polite live region: as the keyboard moves, screen readers hear the category and its values.
- The axes, grid and cursor are hidden from assistive technology: the tooltip says what they show.

## Not yet

Horizontal bars, labels on bars and points, pie, radial and radar charts — the next pass, on the same parts.
