# Radar Chart

Series as polygons over the categories, each value on its category's spoke, filled in `--color-<key>` — or only outlined. Made with [the chart's parts](../chart/README.md): with a polar grid and the categories around it (`scChartPolarAngleAxis`).

```html
<div scChart class="mx-auto aspect-square max-h-72" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="month" aria-label="Visitors by device, January to June">
    <g scChartPolarGrid />
    <g scChartPolarAngleAxis />
    <g scChartRadar key="desktop" />
    <g scChartRadar key="mobile" />
  </svg>
  <div scChartTooltip indicator="line"></div>
  <div scChartLegend></div>
</div>
```

## ScChartRadar — `g[scChartRadar]`

| Input         | Type                                             | Default |
| ------------- | ------------------------------------------------ | ------- |
| `key`         | `string` (required): the series' key in the rows | —       |
| `fillOpacity` | `number` (0: outline only, with `stroke`)        | `0.6`   |
| `stroke`      | `boolean`: its outline                           | `false` |
| `dots`        | `boolean`: a dot at each value                   | `false` |
| `activeDot`   | `boolean`: a dot on the spoke pointed at         | `true`  |

The pointer points at the nearest spoke; the keyboard moves from one to the next.
