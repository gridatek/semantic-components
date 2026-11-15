# Bar Chart

A series as bars: one per category, side by side with the other series' — or on one another, within a `stack`. Below 0, downwards. Made with [the chart's parts](../chart/README.md).

```html
<div scChart [config]="config" [data]="data">
  <svg scChartPlot categoryKey="month" aria-label="Visitors by device, January to June">
    <g scChartGrid />
    <g scChartCategoryAxis />
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
          <span scChartTooltipIndicator></span>
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

## ScChartBar — `g[scChartBar]`

| Input               | Type                                                                                                                                                                  | Default    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `key`               | `string` (required): the series' key in the rows                                                                                                                      | —          |
| `stack`             | `string \| null`: bars of a stack on one another                                                                                                                      | `null`     |
| `corners`           | `all` \| `end` \| `base` \| `none`: the rounded ones — the bar's end's two (a column's top), its base's two; how round is the style's (see [Corners](#corners))       | `all`      |
| `colorBy`           | `key` \| `category`: its key's colour, or each bar its row's category's (`--color-<category>`, from the config) — the tooltip and the legend then name the categories | `key`      |
| `fill`              | `string`: instead of its color, `url(#gradient)`                                                                                                                      | `''`       |
| `barSize`           | `number`: its width in pixels, centered in its slot (Recharts' `barSize`)                                                                                             | the slot's |
| `maxBarSize`        | `number`: its widest, in pixels (Recharts' `maxBarSize`)                                                                                                              | —          |
| `isAnimationActive` | `boolean`: its bars grow from their base when it appears (Recharts' entrance)                                                                                         | `true`     |
| `animationBegin`    | `number`: the wait before they grow, in ms                                                                                                                            | `0`        |
| `animationDuration` | `number`: how long they grow, in ms                                                                                                                                   | `400`      |
| `animationEasing`   | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`                                                                                                                | `ease`     |
| `animationMatchBy`  | `'index'` (by position, stretched), `'append'` (the first with the first) or `(row, index) => key`: how its shapes before and after a change are paired (Recharts')   | `'append'` |

With bars in the plot, each category is a band: the cursor fills it, and the areas and lines of the same plot sit in its middle.

## Across, and labels

The plot's `layout="vertical"` puts the categories down the side and the bars across — the category axis beside them, the value axis under; `corners` turns with them (`end` is the bar's end, wherever it points). Labels: `<g scChartLabels />` inside the bar — `outside` beyond its end, `inside` in its middle, `start` at its base.

## Corners

`corners` says which corners are rounded; how round they are is the style's: the preset sets `--chart-bar-radius` on the chart (its `chart.chart`), from the theme's `--radius` — nova, vega and mira `--radius-sm` (6px with the default radius), maia `--radius-lg`, luma and rhea `--radius-xl`, lyra and sera square. So the bars follow the theme's radius too. Set it yourself on a chart: `class="[--chart-bar-radius:4px]"`.

In a `stack`, the corners are the stack's: it rounds as one bar, wherever it ends in each category. `corners="end"` on every series of a stack rounds the top of each column, whichever series is on top there — a series at 0 in a category leaves its corners to the next one down (shadcn rounds per series, so a column whose top series is 0 is square there). `all` (the default) rounds each piece of a stack all round, touching: their rounded corners show the join, so they read one on the other, and no px are lost (square in Lyra and Sera, the radius 0). `end` keeps the joins square.

Each bar is an `<svg>` of its size holding a `<rect>` whose `rx` is that variable (a CSS property in SVG 2: never more than half its width). Rounded on one side only (`end`, `base`), the rect is longer past the other side and its `<svg>` hides the overflow, so that side stays square. The `<svg>`'s `x`, `y`, `width` and `height` are the bar's; the browser's box of it (`getBoundingClientRect`) includes the hidden part. What this leaves out: different radii on one bar's corners (Recharts' `radius={[6, 4, 0, 0]}`).

## Entrance

As Recharts', the bars grow from their base when the chart appears: 400ms, `ease`, the corners whole as they grow; the labels come once they are grown. Not on the server (it draws them grown), nor when the user asks for reduced motion. When its data or its size changes, the bars move to their new places — new ones grow from their base, gone ones shrink to it — with the same timing; the labels come once they are still. `scChartEntrance()` in the charts entry is the same progress for a series of your own.
