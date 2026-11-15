# Treemap Chart

A series as a treemap: a box per row, its area its value, squarified (`d3-hierarchy`, a peer of this entry) — gathered under their groups' names with a `groupKey`. Each box in its category's color, or its group's (`--color-<group>`). Made with [the chart's parts](../../../../../src/lib/components/chart/README.md).

Its own entry point, so the other charts don't need `d3-hierarchy`: `import { ScChartTreemap } from '@semantic-components/ui/charts/treemap';` — the chart's parts from `@semantic-components/ui/charts`. Install `d3-hierarchy` with `d3-scale` and `d3-shape`.

```html
<div scChart class="aspect-video max-h-80" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="name" aria-label="Disk use by folder">
    <g scChartTreemap key="size" groupKey="folder">
      <g scChartLabels position="start" [formatter]="name" />
    </g>
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

## ScChartTreemap — `g[scChartTreemap]`

| Input               | Type                                                                             | Default  |
| ------------------- | -------------------------------------------------------------------------------- | -------- |
| `key`               | `string` (required): each box's value                                            | —        |
| `groupKey`          | `string`: each row's group                                                       | `''`     |
| `gap`               | `number`: the space between boxes, in px                                         | `2`      |
| `isAnimationActive` | `boolean`: its boxes slide in from the left when it appears (Recharts' entrance) | `true`   |
| `animationBegin`    | `number`: the wait before it starts, in ms                                       | `0`      |
| `animationDuration` | `number`: how long it lasts, in ms                                               | `1500`   |
| `animationEasing`   | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`                           | `linear` |

With a `groupKey`, the legend lists the groups: give them their colors in the config (`folder name: { label, color }`).

## Entrance

As Recharts', each box slides in from just past the plot's left edge to its place when the chart appears — each its own distance, in the same time — with its label and its group's name: 1500ms, `linear`. Not on the server (it draws it whole), nor when the user asks for reduced motion. Only the first appearance: new data is drawn at once.

## Labels

`<g scChartLabels />` inside it writes each box's value in its middle (`inside`) or at its top start corner (`start`) — none on boxes smaller than 40 × 24 px.
