import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardAction,
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
  ScChartTooltipName,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

/** Visitors: a small card, its area chart to the edges. */
@Component({
  selector: 'app-preview-analytics-card',
  imports: [
    ScBadge,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartArea,
    ScChartPlot,
    ScChartTooltip,
    DecimalPipe,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
  ],
  template: `
    <div scCard size="sm" class="mx-auto w-full max-w-sm pb-0">
      <div scCardHeader>
        <h2 scCardTitle>Analytics</h2>
        <p scCardDescription>418.2K Visitors <span scBadge>+10%</span></p>
        <div scCardAction>
          <button scButton variant="outline" size="sm">View Analytics</button>
        </div>
      </div>
      <div scChart class="aspect-[1/0.35]" [config]="config" [data]="data">
        <svg
          scChartPlot
          categoryKey="month"
          aria-label="Visitors, January to June"
          [margin]="{ left: 0, right: 0 }"
        >
          <g scChartArea key="visitors" curve="linear" [fillOpacity]="0.4" />
        </svg>
        <div scChartTooltip #tooltip="scChartTooltip">
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
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewAnalyticsCard {
  protected readonly data = [
    { month: 'January', visitors: 186 },
    { month: 'February', visitors: 305 },
    { month: 'March', visitors: 237 },
    { month: 'April', visitors: 73 },
    { month: 'May', visitors: 209 },
    { month: 'June', visitors: 214 },
  ];
  protected readonly config: ScChartConfig = {
    visitors: { label: 'Visitors', color: 'var(--chart-1)' },
  };
}
