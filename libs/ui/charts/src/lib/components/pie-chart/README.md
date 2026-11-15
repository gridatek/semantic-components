# Pie Chart

A series as a pie: a slice per row, its share of the total, in its category's color (`--color-<category>`, from the chart's config). A donut with an `innerRadius`; rings, with pies of different radii. Made with [the chart's parts](../chart/README.md).

```html
<div scChart class="mx-auto aspect-square max-h-72" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="browser" aria-label="Visitors by browser">
    <g scChartPie key="visitors" [innerRadius]="0.6" />
    <g scChartCenter>
      <text text-anchor="middle" class="fill-foreground text-3xl font-bold">{{ total }}</text>
    </g>
  </svg>
  <div scChartTooltipProvider>
    <ng-template scChartTooltipPortal>
      <div scChartTooltip #tooltip="scChartTooltip">
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

## ScChartPie — `g[scChartPie]`

| Input               | Type                                                                                 | Default |
| ------------------- | ------------------------------------------------------------------------------------ | ------- |
| `key`               | `string` (required): each slice's value                                              | —       |
| `innerRadius`       | `number`: its hole, a share of the radius                                            | `0`     |
| `outerRadius`       | `number`: its edge, a share of the radius                                            | `1`     |
| `padAngle`          | `number`: the gap between slices, in degrees                                         | `0`     |
| `cornerRadius`      | `number`                                                                             | `0`     |
| `strokeWidth`       | `number`: the line between slices (0: none)                                          | `2`     |
| `activeOffset`      | `number`: how far the slice pointed at grows                                         | `6`     |
| `isAnimationActive` | `boolean`: it sweeps round from its start angle when it appears (Recharts' entrance) | `true`  |
| `animationBegin`    | `number`: the wait before it starts, in ms                                           | `400`   |
| `animationDuration` | `number`: how long it lasts, in ms                                                   | `1500`  |
| `animationEasing`   | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`                               | `ease`  |

The plot's `startAngle` and `endAngle` (degrees, 0 at the top, clockwise) bound it: 0 and 360 by default. The tooltip and the legend name and color each slice by its category.

## Entrance

As Recharts', the pie sweeps round from its start angle when the chart appears, each slice its share of the arc drawn so far: after 400ms, for 1500ms, `ease`. Its labels come once it's whole. Not on the server (it draws it whole), nor when the user asks for reduced motion. Only the first appearance: new data is drawn at once.

## Labels

`<g scChartLabels />` inside the pie writes each slice's value beyond its edge (`outside`, anchored away from the center) or in its middle (`inside`). Make room for those outside with the plot's `margin`.
