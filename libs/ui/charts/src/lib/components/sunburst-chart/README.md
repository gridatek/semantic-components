# Sunburst Chart

A series as a sunburst: its rows' groups (`groupKey`) as an inner ring, each its rows' total, and the rows in a ring around them, in their group's color (`--color-<group>`). Made with [the chart's parts](../chart/README.md).

```html
<div scChart class="mx-auto aspect-square max-h-72" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="name" aria-label="Sales by region and country">
    <g scChartSunburst key="sales" groupKey="region" />
  </svg>
  <div scChartTooltip></div>
</div>
```

## ScChartSunburst — `g[scChartSunburst]`

| Input         | Type                                                         | Default |
| ------------- | ------------------------------------------------------------ | ------- |
| `key`         | `string` (required): each row's value                        | —       |
| `groupKey`    | `string` (required): each row's group, the inner ring        | —       |
| `innerRadius` | `number`: its hole, a share of the radius                    | `0.3`   |
| `splitRadius` | `number`: where the groups' ring ends, a share of the radius | `0.65`  |
| `strokeWidth` | `number`: the line between slices (0: none)                  | `2`     |

Give the groups their colors in the config; the legend lists them. The plot's `startAngle` and `endAngle` bound it. The rows' ring takes the pointer; the tooltip names each row, in its group's color.

## Labels

`<g scChartLabels />` inside it writes each row's value beyond its edge (`outside`) or in its middle (`inside`).
