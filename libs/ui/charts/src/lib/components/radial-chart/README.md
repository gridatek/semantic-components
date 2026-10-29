# Radial Chart

A series as radial bars: a ring per row, the first innermost, its value as an arc from the plot's `startAngle` towards its `endAngle` — on the other series' arcs within a `stack`. Made with [the chart's parts](../chart/README.md).

```html
<div scChart class="mx-auto aspect-square max-h-64" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="month" [startAngle]="-90" [endAngle]="90" aria-label="Visitors in January, by device">
    <g scChartRadialBar key="desktop" stack="a" [innerRadius]="0.75" [cornerRadius]="5" />
    <g scChartRadialBar key="mobile" stack="a" [innerRadius]="0.75" [cornerRadius]="5" />
    <g scChartCenter>
      <text text-anchor="middle" class="fill-foreground text-2xl font-bold">{{ total }}</text>
    </g>
  </svg>
  <div scChartTooltip hideLabel></div>
</div>
```

## ScChartRadialBar — `g[scChartRadialBar]`

| Input          | Type                                                   | Default |
| -------------- | ------------------------------------------------------ | ------- |
| `key`          | `string` (required): the series' key in the rows       | —       |
| `stack`        | `string \| null`: along the ring, one after the other  | `null`  |
| `colorBy`      | `'key' \| 'category'`: its key's color, or each row's  | `'key'` |
| `innerRadius`  | `number`: where the rings start, a share of the radius | `0.3`   |
| `outerRadius`  | `number`: where they end                               | `1`     |
| `cornerRadius` | `number`                                               | `0`     |
| `track`        | `boolean`: each ring's full length behind it           | `false` |

An arc's length is its value's share of the largest one. A grid of circles behind: `<g scChartPolarGrid shape="circle" [spokes]="false" />`.

## Labels

`<g scChartLabels />` inside the radial bars writes each ring's value at its arc's start (`start`), beyond its end (`outside`) or in its middle (`inside`); its `formatter` can write the category instead.
