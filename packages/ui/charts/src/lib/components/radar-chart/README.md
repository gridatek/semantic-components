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

| Input               | Type                                                                                                                                                                | Default   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `key`               | `string` (required): the series' key in the rows                                                                                                                    | —         |
| `fillOpacity`       | `number` (0: outline only, with `stroke`)                                                                                                                           | `0.6`     |
| `stroke`            | `boolean`: its outline                                                                                                                                              | `false`   |
| `dots`              | `boolean`: a dot at each value                                                                                                                                      | `false`   |
| `activeDot`         | `boolean`: a dot on the spoke pointed at                                                                                                                            | `true`    |
| `isAnimationActive` | `boolean`: its points move out from the center when it appears (Recharts' entrance)                                                                                 | `true`    |
| `animationBegin`    | `number`: the wait before it starts, in ms                                                                                                                          | `0`       |
| `animationDuration` | `number`: how long it lasts, in ms                                                                                                                                  | `1500`    |
| `animationEasing`   | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`                                                                                                              | `ease`    |
| `animationMatchBy`  | `'index'` (by position, stretched), `'append'` (the first with the first) or `(row, index) => key`: how its shapes before and after a change are paired (Recharts') | `'index'` |

The pointer points at the nearest spoke; the keyboard moves from one to the next.

## Entrance

As Recharts', each point moves out from the center to its value when the chart appears: 1500ms, `ease`. Not on the server (it draws it whole), nor when the user asks for reduced motion. When its data or its size changes, its points move to their new places — new ones from the center — with the same timing.
