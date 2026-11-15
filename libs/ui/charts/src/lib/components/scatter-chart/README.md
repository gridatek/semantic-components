# Scatter Chart

A series as a scatter: a point per row at its x (`xKey`) and y (`key`) values, both axes numeric — a bubble chart with a `sizeKey`. In its key's color (`--color-<key>`, from the chart's config). Made with [the chart's parts](../chart/README.md).

```html
<div scChart class="aspect-video max-h-72" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="name" aria-label="Height and weight of 12 people">
    <g scChartGrid [vertical]="true" />
    <g scChartCategoryAxis />
    <g scChartValueAxis />
    <g scChartScatter key="weight" xKey="height" />
  </svg>
  <div scChartTooltipProvider>
    <ng-template scChartTooltipPortal>
      <div scChartTooltip #tooltip="scChartTooltip">
        <div scChartTooltipLabel>{{ tooltip.label() }}</div>
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

## ScChartScatter — `g[scChartScatter]`

| Input               | Type                                                                                                                                                                | Default    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `key`               | `string` (required): each point's y value                                                                                                                           | —          |
| `xKey`              | `string` (required): each point's x value                                                                                                                           | —          |
| `sizeKey`           | `string`: a third value, each point's size (area)                                                                                                                   | `''`       |
| `radius`            | `number`: its points' radius — the largest's, with a `sizeKey`                                                                                                      | `5`        |
| `fillOpacity`       | `number`                                                                                                                                                            | `0.7`      |
| `isAnimationActive` | `boolean`: its points grow when it appears (Recharts' entrance)                                                                                                     | `true`     |
| `animationBegin`    | `number`: the wait before it starts, in ms                                                                                                                          | `0`        |
| `animationDuration` | `number`: how long it lasts, in ms                                                                                                                                  | `400`      |
| `animationEasing`   | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`                                                                                                              | `linear`   |
| `animationMatchBy`  | `'index'` (by position, stretched), `'append'` (the first with the first) or `(row, index) => key`: how its shapes before and after a change are paired (Recharts') | `'append'` |

Each row still has its category (`categoryKey`): the tooltip's title. Both axes span the values themselves (not from 0), a tenth wider each way. The x axis (`scChartCategoryAxis`) and the grid's vertical lines take the x values' ticks. The pointer and the keyboard go to the nearest point; several scatters in a plot share its x key.

## Entrance

As Recharts', the points grow from nothing when the chart appears (their area, as Recharts' size): 400ms, `linear`. Their labels come once they've grown. Not on the server (it draws it whole), nor when the user asks for reduced motion. When its data or its size changes, the points move to their new places, their size too — new ones grow — with the same timing; their labels come once they are still.

## Labels

`<g scChartLabels />` inside it writes each point's value above it (`outside`) or on it (`inside`).
