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

| Part                                              | Inputs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `div[scChart]`                                    | `data`, `config`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `svg[scChartPlot]`                                | `categoryKey` (required), `margin` (as Recharts: 5 on each side without one; the sides a given one leaves out are 0), `layout` (`horizontal` \| `vertical`: categories down the side, bars across), `stackOffset` (`none` \| `expand`: to 100%); polar charts: `startAngle`, `endAngle` (Recharts': degrees, 0 at 3 o'clock, counterclockwise; unset, 0 to 360 — a radar's 90 to −270, from the top clockwise); name it (`aria-label`)                                                                                                                      |
| `g[scChartGrid]`                                  | `horizontal` (true), `vertical` (false) — its lines at the value axis's ticks, as Recharts' grid                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `g[scChartCategoryAxis]`                          | The categories, under the plot (beside it, laid out `vertical`): `tickFormatter(category, index)`, `width` (60, beside) — evenly skipped when they don't fit. `reversed`: the categories from the right (from the bottom, `vertical`); `orientation` (`left`, `right`): its side, beside — both unset by default: the chart's (see Right to left). `orientation` also `top` or `bottom` along the plot (`top`: the labels above it); `hide`: no room, no labels (Recharts').                                                                                |
| `g[scChartValueAxis]`                             | The values, beside the plot (under it, laid out `vertical`): `width` (40), `tickCount` (5: Recharts' nice ticks, which also set the value domain — 0 to 320 for values up to 305), `tickFormatter(value)` — the app's locale by default. `reversed`: the values down from the top (from the right, `vertical`); `orientation` (`left`, `right`): its side — both unset by default: the chart's (see Right to left). `domain` (`[0, 100]`): its values' range, fixed (Recharts') — else from the data; `hide`: no room, no labels, its domain still holding. |
| `g[scChartCursor]`                                | — a band behind bars, a line across points                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `g[scChartPolarGrid]`                             | Polar charts: `shape` (`polygon` \| `circle`), `ringCount` (4), `spokes` (true)                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `g[scChartPolarAngleAxis]`                        | A radar's categories around it: `tickFormatter(category, index)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `g[scChartCenter]`                                | A polar chart's center: your SVG at (0, 0) — a donut's total                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `g[scChartLabels]`                                | Inside a series: its values written on the chart — `position` (`outside` \| `inside` \| `start`), `offset` (8), `formatter(value, category, index)`                                                                                                                                                                                                                                                                                                                                                                                                         |
| `div[scChartTooltipProvider]`                     | The tooltip: its portal in a CDK overlay while a category is active — beside the pointer, or the item the keyboard reached; flipped and kept in the window. `side` (`right`), `alignment` (`start`), `sideOffset` (10), `alignmentOffset` (10): Recharts' place. `isAnimationActive` (true), `animationDuration` (400), `animationEasing` (`ease`): it glides from place to place, as Recharts' (not with reduced motion). Holds the state                                                                                                                  |
| `ng-template[scChartTooltipPortal]`               | The tooltip's content, rendered while it shows                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `div[scChartTooltip]`                             | The box, in the style's look (`exportAs: scChartTooltip`): `active()`, `label()` (the category), `payload()` (an item per series: `dataKey`, `name`, `value`, `color`) — see [Tooltip and legend](#tooltip-and-legend)                                                                                                                                                                                                                                                                                                                                      |
| `[scChartTooltipLabel]`                           | The tooltip's title: write the category                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `[scChartTooltipItem]`                            | A row: `item` (one of `payload()`) — its indicator takes its colour                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `[scChartTooltipIndicator]`                       | The row's mark: `variant` (`dot`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `line` | `dashed`) |
| `[scChartTooltipName]`, `[scChartTooltipValue]`   | The row's name (muted) and value (at its end, tabular figures): write them                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `div[scChartLegend]`                              | The legend's row (`exportAs: scChartLegend`): `payload()` — the series, or a pie's categories, a sunburst's groups, a sankey's nodes (`dataKey`, `name`, `color`)                                                                                                                                                                                                                                                                                                                                                                                           |
| `[scChartLegendItem]`, `[scChartLegendIndicator]` | An entry: `item` (one of `payload()`), and its colour swatch                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

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

- **Where it goes**: in a CDK overlay (the end of the page), so it can leave a small card — beside the pointer, 10px from the arrow's drawing (Recharts' offset, so it doesn't touch the cursor); above a finger with touch, centred; with the keyboard, beside the item reached — a bar's end, a point; in a pie, radial or sunburst the slice's or arc's outer edge, a radar's point, a funnel's stage, a treemap's box, a sankey's flow (a series's `anchor`). It flips and stays in the window where there is no room, and closes on scroll. Its box carries the series' colors (`--color-<key>`), which the chart sets on itself.
- **Closed, it is not there**; `label()` and `payload()` keep the last category shown (the first before any), so what you write from them always has one to format.
- **The values are raw numbers**: `| number` writes them in the app's locale (its `LOCALE_ID`).
- **The tooltip's box** is the style's (`chart.tooltip`): its corners, border or ring, shadow — shadcn's, style by style. Your `class` adds to it.
- **Names and colours** come from the chart's `config`; a pie's slice, a radial bar are named and coloured by their category.

## Animation

Each series enters, and moves when its data or its size changes, as Recharts' does — with its names: `isAnimationActive`, `animationBegin`, `animationDuration`, `animationEasing` (`ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`) — and Recharts' defaults:

| Series  | Its entrance                              | Begin, duration, easing |
| ------- | ----------------------------------------- | ----------------------- |
| Bar     | its bars grow from their base             | 0, 400ms, `ease`        |
| Line    | it draws itself, then its dots and labels | 0, 1500ms, `ease`       |
| Area    | unveiled from its first category          | 0, 1500ms, `ease`       |
| Pie     | it sweeps round from its start angle      | 400ms, 1500ms, `ease`   |
| Radar   | its points move out from the center       | 0, 1500ms, `ease`       |
| Radial  | its arcs grow along their rings           | 0, 1500ms, `ease`       |
| Scatter | its points grow                           | 0, 400ms, `linear`      |
| Funnel  | its stages grow out of their centers      | 400ms, 1500ms, `ease`   |
| Treemap | its boxes slide in from the left          | 0, 1500ms, `linear`     |

- **Sunburst and Sankey don't animate**: Recharts' have no animation, so ours have none — and no animation inputs.
- **Labels** come once their series is whole and still (Recharts'); a treemap's slide with their boxes.
- **When it is first seen**: a series enters once a third of its plot is in view, not as soon as it is created — further down a page, in a closed tab or panel, it waits (its lines undrawn, bars at their base) and enters as you reach it. Recharts (and shadcn) animate on mount, so a chart out of view has finished before it is seen; on screen at load, the same. `scChartEntrance()` takes `start` for this (the chart's `seen`).
- **Not on the server** (it draws everything whole), **nor with reduced motion** (`prefers-reduced-motion`): whole at once.
- **Changes**: when the data or the size changes, the shapes move from where they are drawn to their new places, with the same timing (a change mid-way starts from there). Not the chart's first measure: until the plot has measured itself, it draws at a guessed size (as on the server), and finding its real size is no change — the shapes enter where they belong. Each series pairs its shapes before and after as Recharts' does — `animationMatchBy`: by position, stretched (`'index'`: line, area, radar), the first with the first (`'append'`: bar, pie, radial, scatter, funnel), or by a key of your rows (`(row, index) => row.id`); new shapes come in and gone ones leave as that series' do in Recharts. The treemap, sunburst and sankey are redrawn at once, as Recharts' are.
- `scChartTransition()` is that engine, for a series of your own.
- **A center's number** (a donut's total): `<text scNumberTicker [value]="total" start="visible" easing="ease" [delay]="400" [duration]="1500">` — the ui's Number Ticker, on an SVG `<text>`, counting up with the series' timing.
- `scChartEntrance()` gives the same progress (0 to 1, eased) to a series of your own.

## Right to left

Not mirrored by default, as in Recharts: the legend and the tooltip follow the direction (a parent's `dir`); the plot runs left to right. Practice differs — many dashboards keep their charts left to right, Arabic media often mirror their time axes — so the app chooses:

- **The whole app**: `provideSemanticComponents({ charts: { followDirection: true } })` — a chart mirrors itself when its direction is right to left (the CDK's `Directionality`): the categories from the right and the axis beside the plot on the right (in a `vertical` layout, the values from the right). A bilingual app gets its charts mirrored in Arabic, not in English.
- **One chart**: an axis's own `reversed` and `orientation` (Recharts' names) — they win over the app's setting: `reversed="false"` keeps a chart left to right in a mirrored app.

What follows what's drawn: the arrow keys (← to the next category when they run from the right), the area's unveiling (from its first category), the labels beyond a bar's end. Shapes too: pies, radial bars and sunbursts turn from 9 o'clock clockwise (Recharts' default angles mirrored: θ → 180 − θ), a radar's spokes counterclockwise from the top, treemaps are laid out from the right and sankeys flow from the right; a funnel, symmetric, only gets its arrows mirrored (← to the next). A plot's own `startAngle` and `endAngle` win, as an axis's `reversed`. The plot's text is anchored as placed (`direction: ltr` on the plot; Arabic still shapes and orders itself).

## Keyboard and screen readers

- A tap points like the pointer: the tapped category shows until a tap elsewhere.
- The plot is one tab stop (`role="group"`, named by its `aria-label`): on focus, the first category; ←/→ (↑/↓), Home and End move between categories; Escape closes the tooltip.
- As the keyboard moves, screen readers hear what the tooltip shows — your text, as you formatted it — through the CDK's `LiveAnnouncer` (politely): the tooltip comes and goes with its overlay, the announcer's live region stays. The indicators are hidden from them.
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
