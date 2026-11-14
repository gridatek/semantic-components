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

| Input        | Type                                                                      | Default                               |
| ------------ | ------------------------------------------------------------------------- | ------------------------------------- |
| `key`        | `string` (required): the series' key in the rows                          | —                                     |
| `stack`      | `string                                                                   | null`: bars of a stack on one another | `null` |
| `corners`    | `all`                                                                     | `end`                                 | `base` | `none` — the rounded ones: the bar's end's two (a column's top), its base's two; how round is the style's (see [Corners](#corners)) | `all` |
| `fill`       | `string`: instead of its color, `url(#gradient)`                          | `''`                                  |
| `barSize`    | `number`: its width in pixels, centered in its slot (Recharts' `barSize`) | the slot's                            |
| `maxBarSize` | `number`: its widest, in pixels (Recharts' `maxBarSize`)                  | —                                     |

With bars in the plot, each category is a band: the cursor fills it, and the areas and lines of the same plot sit in its middle.

## Across, and labels

The plot's `layout="vertical"` puts the categories down the side and the bars across — the category axis beside them, the value axis under; `corners` turns with them (`end` is the bar's end, wherever it points). Labels: `<g scChartLabels />` inside the bar — `outside` beyond its end, `inside` in its middle, `start` at its base.

## Corners

`corners` says which corners are rounded; how round they are is the style's: the preset sets `--chart-bar-radius` on the chart (its `chart.chart`), from the theme's `--radius` — nova, vega and mira `--radius-sm` (6px with the default radius), maia `--radius-lg`, luma and rhea `--radius-xl`, lyra and sera square. So the bars follow the theme's radius too. Set it yourself on a chart: `class="[--chart-bar-radius:4px]"`.

The bar is a `<rect>` whose `rx` is that variable (a CSS property in SVG 2: never more than half its width). Rounded on one side only (`end`, `base`), it is drawn longer past the other and clipped there, so that side stays square. What this leaves out: different radii on one bar's corners (Recharts' `radius={[6, 4, 0, 0]}`).
