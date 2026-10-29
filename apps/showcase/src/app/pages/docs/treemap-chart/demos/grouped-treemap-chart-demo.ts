import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartLabels,
  ScChartLegend,
  ScChartPlot,
  ScChartTooltip,
  ScChartTreemap,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-grouped-treemap-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartTreemap,
    ScChartLabels,
    ScChartTooltip,
    ScChartLegend,
  ],
  template: `
    <div scChart class="aspect-video max-h-80" [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="name"
        aria-label="Disk use by folder, in MB"
      >
        <g scChartTreemap key="size" groupKey="folder">
          <g
            scChartLabels
            position="start"
            class="fill-background"
            [formatter]="name"
          />
        </g>
      </svg>
      <div scChartTooltip></div>
      <div scChartLegend></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupedTreemapChartDemo {
  readonly data = [
    { folder: 'src', name: 'components', size: 420 },
    { folder: 'src', name: 'pages', size: 260 },
    { folder: 'src', name: 'styles', size: 90 },
    { folder: 'assets', name: 'images', size: 380 },
    { folder: 'assets', name: 'fonts', size: 140 },
    { folder: 'docs', name: 'guides', size: 160 },
    { folder: 'docs', name: 'api', size: 110 },
  ];
  readonly config: ScChartConfig = {
    size: { label: 'Size (MB)' },
    src: { label: 'src', color: 'var(--chart-2)' },
    assets: { label: 'assets', color: 'var(--chart-3)' },
    docs: { label: 'docs', color: 'var(--chart-5)' },
  };
  readonly name = (_: number, name: string) => name;
}
