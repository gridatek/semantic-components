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
  <div scChartTooltipProvider>
    <ng-template scChartTooltipPortal>
      <div scChartTooltip #tooltip="scChartTooltip">
        <div scChartTooltipLabel>{{ tooltip.label() }}</div>
        @for (item of tooltip.payload(); track item.dataKey) {
        <div scChartTooltipItem [item]="item">
          <span scChartTooltipIndicator variant="line"></span>
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

## ScChartRadar — `g[scChartRadar]`

| Input         | Type                                             | Default |
| ------------- | ------------------------------------------------ | ------- |
| `key`         | `string` (required): the series' key in the rows | —       |
| `fillOpacity` | `number` (0: outline only, with `stroke`)        | `0.6`   |
| `stroke`      | `boolean`: its outline                           | `false` |
| `dots`        | `boolean`: a dot at each value                   | `false` |
| `activeDot`   | `boolean`: a dot on the spoke pointed at         | `true`  |

The pointer points at the nearest spoke; the keyboard moves from one to the next.
