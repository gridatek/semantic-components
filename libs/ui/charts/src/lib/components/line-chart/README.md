# Line Chart

A series as a line through its values, in `--color-<key>`. Made with [the chart's parts](../chart/README.md).

```html
<div scChart [config]="config" [data]="data">
  <svg scChartPlot categoryKey="month" aria-label="Visitors by device, January to June">
    <g scChartGrid />
    <g scChartCategoryAxis />
    <g scChartValueAxis />
    <g scChartCursor />
    <g scChartLine key="desktop" curve="monotone" />
    <g scChartLine key="mobile" curve="monotone" />
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

## ScChartLine — `g[scChartLine]`

| Input               | Type                                                                  | Default  |
| ------------------- | --------------------------------------------------------------------- | -------- |
| `key`               | `string` (required): the series' key in the rows                      | —        |
| `curve`             | `'natural'                                                            | 'linear' | 'step' | 'monotone'` | `'natural'` |
| `strokeWidth`       | `number`                                                              | `2`      |
| `dots`              | `boolean`: a dot at each value                                        | `false`  |
| `activeDot`         | `boolean`: a dot where the pointer is                                 | `true`   |
| `isAnimationActive` | `boolean`: its line draws itself when it appears (Recharts' entrance) | `true`   |
| `animationBegin`    | `number`: the wait before it starts, in ms                            | `0`      |
| `animationDuration` | `number`: how long it lasts, in ms                                    | `1500`   |
| `animationEasing`   | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`                | `ease`   |

## Entrance

As Recharts', the line draws itself from its first category to its last when the chart appears: 1500ms, `ease`. Its dots and its labels come once it's drawn. Not on the server (it draws it whole), nor when the user asks for reduced motion. Only the first appearance: new data is drawn at once.

## Labels

`<g scChartLabels />` inside the line writes each value above its point (`outside`), or on it (`inside`).
