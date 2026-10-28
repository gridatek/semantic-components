# Bar Chart

A series as bars: one per category, side by side with the other series' — or on one another, within a `stack`. Below 0, downwards. Made with [the chart's parts](../chart/README.md).

```html
<div scChart [config]="config" [data]="data">
  <svg scChartPlot categoryKey="month" aria-label="Visitors by device, January to June">
    <g scChartGrid />
    <g scChartXAxis />
    <g scChartCursor />
    <g scChartBar key="desktop" stack="a" [radius]="[0, 0, 4, 4]" />
    <g scChartBar key="mobile" stack="a" [radius]="[4, 4, 0, 0]" />
  </svg>
  <div scChartTooltip></div>
  <div scChartLegend></div>
</div>
```

## ScChartBar — `g[scChartBar]`

| Input    | Type                                             | Default                                                            |
| -------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| `key`    | `string` (required): the series' key in the rows | —                                                                  |
| `stack`  | `string                                          | null`: bars of a stack on one another                              | `null` |
| `radius` | `number                                          | [topStart, topEnd, bottomEnd, bottomStart]` — below 0, upside down | `4`    |
| `fill`   | `string`: instead of its color, `url(#gradient)` | `''`                                                               |

With bars in the plot, each category is a band: the cursor fills it, and the areas and lines of the same plot sit in its middle.
