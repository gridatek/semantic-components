# Funnel Chart

A series as a funnel: a stage per row, top to bottom, each as wide as its value (the largest, the plot's width), narrowing to the next one's, in its category's color (`--color-<category>`). Made with [the chart's parts](../chart/README.md).

```html
<div scChart class="mx-auto aspect-video max-h-72" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="stage" aria-label="Visitors at each step to a purchase">
    <g scChartFunnel key="visitors">
      <g scChartLabels position="inside" />
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
</div>
```

## ScChartFunnel — `g[scChartFunnel]`

| Input               | Type                                                                                 | Default |
| ------------------- | ------------------------------------------------------------------------------------ | ------- |
| `key`               | `string` (required): each stage's value                                              | —       |
| `gap`               | `number`: the space between stages, in px                                            | `2`     |
| `isAnimationActive` | `boolean`: its stages grow out of their centers when it appears (Recharts' entrance) | `true`  |
| `animationBegin`    | `number`: the wait before it starts, in ms                                           | `400`   |
| `animationDuration` | `number`: how long it lasts, in ms                                                   | `1500`  |
| `animationEasing`   | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`                               | `ease`  |

The tooltip and the legend name and color each stage by its category. The last stage narrows to 60% of its width.

## Entrance

As Recharts', each stage grows out of its own center when the chart appears, its widths and its height: after 400ms, for 1500ms, `ease`. Its labels come once they've grown. Not on the server (it draws it whole), nor when the user asks for reduced motion. Only the first appearance: new data is drawn at once.

## Labels

`<g scChartLabels />` inside it writes each stage's value beside it (`outside`: make room with the plot's `margin`) or in its middle (`inside`).
