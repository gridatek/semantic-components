# Radial Chart

A series as radial bars: a ring per row, the first innermost, its value as an arc from the plot's `startAngle` towards its `endAngle` — on the other series' arcs within a `stack`. Made with [the chart's parts](../chart/README.md).

```html
<div scChart class="mx-auto aspect-square max-h-64" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="month" [endAngle]="180" aria-label="Visitors in January, by device">
    <g scChartRadialBar key="desktop" stack="a" [innerRadius]="0.75" [cornerRadius]="5" />
    <g scChartRadialBar key="mobile" stack="a" [innerRadius]="0.75" [cornerRadius]="5" />
    <g scChartCenter>
      <text text-anchor="middle" class="fill-foreground text-2xl font-bold">{{ total }}</text>
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

## ScChartRadialBar — `g[scChartRadialBar]`

| Input               | Type                                                                                                                                                                | Default    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `key`               | `string` (required): the series' key in the rows                                                                                                                    | —          |
| `stack`             | `string \| null`: along the ring, one after the other                                                                                                               | `null`     |
| `colorBy`           | `'key' \| 'category'`: its key's color, or each row's                                                                                                               | `'key'`    |
| `innerRadius`       | `number`: where the rings start, a share of the radius                                                                                                              | `0.3`      |
| `outerRadius`       | `number`: where they end                                                                                                                                            | `1`        |
| `cornerRadius`      | `number`                                                                                                                                                            | `0`        |
| `track`             | `boolean`: each ring's full length behind it                                                                                                                        | `false`    |
| `isAnimationActive` | `boolean`: its arcs grow along their rings when it appears (Recharts' entrance)                                                                                     | `true`     |
| `animationBegin`    | `number`: the wait before it starts, in ms                                                                                                                          | `0`        |
| `animationDuration` | `number`: how long it lasts, in ms                                                                                                                                  | `1500`     |
| `animationEasing`   | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`                                                                                                              | `ease`     |
| `animationMatchBy`  | `'index'` (by position, stretched), `'append'` (the first with the first) or `(row, index) => key`: how its shapes before and after a change are paired (Recharts') | `'append'` |

An arc's length is its value's share of the largest one. A grid of circles behind: `<g scChartPolarGrid shape="circle" [spokes]="false" />`.

## Entrance

As Recharts', each arc grows along its ring from its start when the chart appears: 1500ms, `ease`. Its labels come once they've grown. Not on the server (it draws it whole), nor when the user asks for reduced motion. When its data changes, the arcs move to their new angles — new ones grow from their start — with the same timing; its labels come once they are still.

## Labels

`<g scChartLabels />` inside the radial bars writes each ring's value along its ring from its arc's start (`start`: curved, the way the ring grows, as Recharts' `insideStart` — the names don't pile up where the rings begin), beyond its end (`outside`) or in its middle (`inside`); its `formatter` can write the category instead.
