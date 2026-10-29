# Sankey Chart

A series as a sankey (`d3-sankey`, a peer of this entry): each row a flow, its value (`key`), from a node (`sourceKey`) to another (`targetKey`). The nodes in columns, each in its color (`--color-<node>`), named beside it; the flows in their source's color. Made with [the chart's parts](../../../../../src/lib/components/chart/README.md).

Its own entry point, so the other charts don't need `d3-sankey`: `import { ScChartSankey } from '@semantic-components/ui/charts/sankey';` — the chart's parts from `@semantic-components/ui/charts`. Install `d3-sankey` with `d3-scale` and `d3-shape`.

```html
<div scChart class="aspect-video max-h-80" [config]="config" [data]="data">
  <svg scChartPlot categoryKey="flow" aria-label="Where visitors come from and go">
    <g scChartSankey key="visitors" />
  </svg>
  <div scChartTooltip></div>
</div>
```

## ScChartSankey — `g[scChartSankey]`

| Input         | Type                                                 | Default    |
| ------------- | ---------------------------------------------------- | ---------- |
| `key`         | `string` (required): each flow's value               | —          |
| `sourceKey`   | `string`: each flow's source node                    | `'source'` |
| `targetKey`   | `string`: each flow's target node                    | `'target'` |
| `nodeWidth`   | `number`, in px                                      | `12`       |
| `nodePadding` | `number`: the space between nodes in a column, in px | `16`       |

Each row's category (`categoryKey`) names its flow in the tooltip (`Search → Pricing`). The nodes' names come from the config's labels, or are the names themselves; the legend lists the nodes.

## Labels

`<g scChartLabels />` inside it writes each flow's value in its middle.
