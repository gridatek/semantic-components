# Area Chart

A series as an area: its values filled down to 0 — or onto the series under it in its `stack`. Made with [the chart's parts](../chart/README.md): a chart, its plot, grid, axes, cursor, tooltip and legend.

```html
<div scChart [config]="config" [data]="data">
  <svg scChartPlot categoryKey="month" aria-label="Visitors by device, January to June">
    <g scChartGrid />
    <g scChartCategoryAxis />
    <g scChartCursor />
    <g scChartArea key="mobile" stack="a" />
    <g scChartArea key="desktop" stack="a" />
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

## ScChartArea — `g[scChartArea]`

| Input               | Type                                                                                      | Default                                |
| ------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------- |
| `key`               | `string` (required): the series' key in the rows                                          | —                                      |
| `curve`             | `'natural'                                                                                | 'linear'                               | 'step' | 'monotone'` | `'natural'` |
| `stack`             | `string                                                                                   | null`: areas of a stack on one another | `null` |
| `fill`              | `string`: instead of its color, `url(#gradient)`                                          | `''`                                   |
| `fillOpacity`       | `number`                                                                                  | `0.4`                                  |
| `activeDot`         | `boolean`: a dot where the pointer is                                                     | `true`                                 |
| `isAnimationActive` | `boolean`: it unveils itself from its first category when it appears (Recharts' entrance) | `true`                                 |
| `animationBegin`    | `number`: the wait before it starts, in ms                                                | `0`                                    |
| `animationDuration` | `number`: how long it lasts, in ms                                                        | `1500`                                 |
| `animationEasing`   | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`                                    | `ease`                                 |

Its color: `--color-<key>`, from the chart's `config` — usable in a gradient of yours (`stop-color="var(--color-desktop)"`). With the plot's `stackOffset="expand"`, each category's stack fills to 100%.

## Entrance

As Recharts', the area is unveiled from its first category to its last when the chart appears (a clip that widens, down when vertical): 1500ms, `ease`. Its labels come once it's whole. Not on the server (it draws it whole), nor when the user asks for reduced motion. Only the first appearance: new data is drawn at once.

## Labels

`<g scChartLabels />` inside the area writes each value above its edge (`outside`), or in the middle of its band (`inside`).
