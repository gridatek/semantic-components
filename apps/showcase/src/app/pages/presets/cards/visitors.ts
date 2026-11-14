import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartArea,
  type ScChartConfig,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

const DATA = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];
const LATEST = DATA[DATA.length - 1].desktop;
const PREVIOUS = DATA[DATA.length - 2].desktop;
const TREND = Math.round(((LATEST - PREVIOUS) / PREVIOUS) * 100);

/** Visitors: an area edge to edge, the trend as a badge. */
@Component({
  selector: 'app-preview-visitors',
  imports: [
    ScBadge,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartArea,
    ScChartPlot,
    ScChartTooltip,
    DecimalPipe,
    ScChartTooltipLabel,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
  ],
  template: `
    <div scCard class="pb-0">
      <div scCardHeader>
        <h2 scCardTitle>Visitors</h2>
        <p scCardDescription>Last 6 months</p>
        <div scCardAction>
          <span scBadge [variant]="trend >= 0 ? 'secondary' : 'destructive'">
            {{ trend > 0 ? '+' : '' }}{{ trend }}% vs last month
          </span>
        </div>
      </div>
      <div scCardBody class="px-0">
        <div scChart class="h-48 w-full" [config]="config" [data]="data">
          <svg
            scChartPlot
            categoryKey="month"
            aria-label="Visitors, January to June"
            [margin]="{ left: 0, right: 0, top: 6, bottom: 0 }"
          >
            <g scChartArea key="desktop" [fillOpacity]="0.15" />
          </svg>
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
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewVisitors {
  protected readonly data = DATA;
  protected readonly trend = TREND;
  protected readonly config: ScChartConfig = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  };
}
