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
  <div scChartTooltip hideLabel></div>
  <div scChartLegend></div>
</div>
```

## ScChartPie — `g[scChartPie]`

| Input          | Type                                         | Default |
| -------------- | -------------------------------------------- | ------- |
| `key`          | `string` (required): each slice's value      | —       |
| `innerRadius`  | `number`: its hole, a share of the radius    | `0`     |
| `outerRadius`  | `number`: its edge, a share of the radius    | `1`     |
| `padAngle`     | `number`: the gap between slices, in degrees | `0`     |
| `cornerRadius` | `number`                                     | `0`     |
| `strokeWidth`  | `number`: the line between slices (0: none)  | `2`     |
| `activeOffset` | `number`: how far the slice pointed at grows | `6`     |

The plot's `startAngle` and `endAngle` (degrees, 0 at the top, clockwise) bound it: 0 and 360 by default. The tooltip and the legend name and color each slice by its category.

## Labels

`<g scChartLabels />` inside the pie writes each slice's value beyond its edge (`outside`, anchored away from the center) or in its middle (`inside`). Make room for those outside with the plot's `margin`.
