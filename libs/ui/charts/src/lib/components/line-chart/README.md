# Line Chart

A series as a line through its values, in `--color-<key>`. Made with [the chart's parts](../chart/README.md).

```html
<div scChart [config]="config" [data]="data">
  <svg scChartPlot categoryKey="month" aria-label="Visitors by device, January to June">
    <g scChartGrid />
    <g scChartCategoryAxis />
    <g scChartValueAxis />
    <g scChartCursor />
    <g scChartLine key="desktop" curve="monotone" />
    <g scChartLine key="mobile" curve="monotone" />
  </svg>
  <div scChartTooltip indicator="line"></div>
  <div scChartLegend></div>
</div>
```

## ScChartLine — `g[scChartLine]`

| Input         | Type                                             | Default  |
| ------------- | ------------------------------------------------ | -------- |
| `key`         | `string` (required): the series' key in the rows | —        |
| `curve`       | `'natural'                                       | 'linear' | 'step' | 'monotone'` | `'natural'` |
| `strokeWidth` | `number`                                         | `2`      |
| `dots`        | `boolean`: a dot at each value                   | `false`  |
| `activeDot`   | `boolean`: a dot where the pointer is            | `true`   |

## Labels

`<g scChartLabels />` inside the line writes each value above its point (`outside`), or on it (`inside`).
