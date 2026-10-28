# Area Chart

A series as an area: its values filled down to 0 — or onto the series under it in its `stack`. Made with [the common parts](../common/README.md): a chart, its plot, grid, axes, cursor, tooltip and legend.

```html
<div scChart [config]="config" [data]="data">
  <svg scChartPlot categoryKey="month" aria-label="Visitors by device, January to June">
    <g scChartGrid />
    <g scChartXAxis />
    <g scChartCursor />
    <g scChartArea key="mobile" stack="a" />
    <g scChartArea key="desktop" stack="a" />
  </svg>
  <div scChartTooltip></div>
</div>
```

## ScChartArea — `g[scChartArea]`

| Input         | Type                                             | Default                                |
| ------------- | ------------------------------------------------ | -------------------------------------- |
| `key`         | `string` (required): the series' key in the rows | —                                      |
| `curve`       | `'natural'                                       | 'linear'                               | 'step' | 'monotone'` | `'natural'` |
| `stack`       | `string                                          | null`: areas of a stack on one another | `null` |
| `fill`        | `string`: instead of its color, `url(#gradient)` | `''`                                   |
| `fillOpacity` | `number`                                         | `0.4`                                  |
| `activeDot`   | `boolean`: a dot where the pointer is            | `true`                                 |

Its color: `--color-<key>`, from the chart's `config` — usable in a gradient of yours (`stop-color="var(--color-desktop)"`). With the plot's `stackOffset="expand"`, each category's stack fills to 100%.
