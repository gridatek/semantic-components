# Funnel Chart

A series as a funnel: a stage per row, top to bottom, each as wide as its value (the largest, the plot's width), narrowing to the next one's, in its category's color (`--color-<category>`). Made with [the chart's parts](../chart/README.md).

```html
<div scChart class="mx-auto aspect-video max-h-72" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="stage" aria-label="Visitors at each step to a purchase">
    <g scChartFunnel key="visitors">
      <g scChartLabels position="inside" />
    </g>
  </svg>
  <div scChartTooltip hideLabel></div>
</div>
```

## ScChartFunnel — `g[scChartFunnel]`

| Input | Type                                      | Default |
| ----- | ----------------------------------------- | ------- |
| `key` | `string` (required): each stage's value   | —       |
| `gap` | `number`: the space between stages, in px | `2`     |

The tooltip and the legend name and color each stage by its category. The last stage narrows to 60% of its width.

## Labels

`<g scChartLabels />` inside it writes each stage's value beside it (`outside`: make room with the plot's `margin`) or in its middle (`inside`).
