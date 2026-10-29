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
  <div scChartTooltip></div>
</div>
```

## ScChartTreemap — `g[scChartTreemap]`

| Input      | Type                                     | Default |
| ---------- | ---------------------------------------- | ------- |
| `key`      | `string` (required): each box's value    | —       |
| `groupKey` | `string`: each row's group               | `''`    |
| `gap`      | `number`: the space between boxes, in px | `2`     |

With a `groupKey`, the legend lists the groups: give them their colors in the config (`folder name: { label, color }`).

## Labels

`<g scChartLabels />` inside it writes each box's value in its middle (`inside`) or at its top start corner (`start`) — none on boxes smaller than 40 × 24 px.
