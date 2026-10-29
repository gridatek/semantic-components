# Scatter Chart

A series as a scatter: a point per row at its x (`xKey`) and y (`key`) values, both axes numeric — a bubble chart with a `sizeKey`. In its key's color (`--color-<key>`, from the chart's config). Made with [the chart's parts](../chart/README.md).

```html
<div scChart class="aspect-video max-h-72" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="name" aria-label="Height and weight of 12 people">
    <g scChartGrid [vertical]="true" />
    <g scChartCategoryAxis />
    <g scChartValueAxis />
    <g scChartScatter key="weight" xKey="height" />
  </svg>
  <div scChartTooltip></div>
</div>
```

## ScChartScatter — `g[scChartScatter]`

| Input         | Type                                                           | Default |
| ------------- | -------------------------------------------------------------- | ------- |
| `key`         | `string` (required): each point's y value                      | —       |
| `xKey`        | `string` (required): each point's x value                      | —       |
| `sizeKey`     | `string`: a third value, each point's size (area)              | `''`    |
| `radius`      | `number`: its points' radius — the largest's, with a `sizeKey` | `5`     |
| `fillOpacity` | `number`                                                       | `0.7`   |

Each row still has its category (`categoryKey`): the tooltip's title. Both axes span the values themselves (not from 0), a tenth wider each way. The x axis (`scChartCategoryAxis`) and the grid's vertical lines take the x values' ticks. The pointer and the keyboard go to the nearest point; several scatters in a plot share its x key.

## Labels

`<g scChartLabels />` inside it writes each point's value above it (`outside`) or on it (`inside`).
