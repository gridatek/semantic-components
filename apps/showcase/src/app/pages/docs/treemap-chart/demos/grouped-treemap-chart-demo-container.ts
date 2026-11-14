import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupedTreemapChartDemo } from './grouped-treemap-chart-demo';

@Component({
  selector: 'app-grouped-treemap-chart-demo-container',
  imports: [DemoContainer, GroupedTreemapChartDemo],
  template: `
    <app-demo-container
      title="Groups"
      demoUrl="/demos/treemap-chart/grouped-treemap-chart-demo"
      [code]="code"
    >
      <app-grouped-treemap-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupedTreemapChartDemoContainer {
  readonly code = `import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartLabels,
  ScChartLegend,
  ScChartLegendIndicator,
  ScChartLegendItem,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';
import { ScChartTreemap } from '@semantic-components/ui/charts/treemap';

@Component({
  selector: 'app-grouped-treemap-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartTreemap,
    ScChartLabels,
    ScChartTooltip,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartLegend,
    DecimalPipe,
    ScChartTooltipLabel,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
    ScChartLegendItem,
    ScChartLegendIndicator,
  ],
  template: \`
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
      <div scChartLegend #legend="scChartLegend">
        @for (item of legend.payload(); track item.dataKey) {
          <div scChartLegendItem [item]="item">
            <span scChartLegendIndicator></span>
            {{ item.name }}
          </div>
        }
      </div>
    </div>
  \`,
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
}`;
}
