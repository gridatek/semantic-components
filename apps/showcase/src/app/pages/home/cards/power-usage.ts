import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScSeparator,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartBar,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

/** Usage by hour as a bar chart (the preset's corners), then two figures. */
@Component({
  selector: 'app-home-power-usage',
  imports: [
    DecimalPipe,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartBar,
    ScChartCategoryAxis,
    ScChartPlot,
    ScChartTooltip,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartTooltipValue,
    ScSeparator,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Power Usage</h2>
        <p scCardDescription>Whole Home</p>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <div scChart class="h-[140px] w-full" [config]="config" [data]="data">
          <svg
            scChartPlot
            categoryKey="hour"
            aria-label="Power usage by hour, 6am to 8pm"
            [margin]="{ left: 0, right: 0, top: 4, bottom: 0 }"
          >
            <g scChartCategoryAxis class="text-xs" />
            <g scChartBar key="usage" corners="end" />
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
        <div scSeparator aria-hidden="true"></div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-0.5">
            <span class="text-muted-foreground text-sm">Currently Using</span>
            <span class="text-lg font-semibold tabular-nums">3.4 kW</span>
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="text-muted-foreground text-sm">Solar Gen</span>
            <span class="text-lg font-semibold tabular-nums">+1.2 kW</span>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HomePowerUsage {
  private readonly data = [
    { hour: '6a', usage: 1.2 },
    { hour: '8a', usage: 2.8 },
    { hour: '10a', usage: 3.1 },
    { hour: '12p', usage: 2.4 },
    { hour: '2p', usage: 3.4 },
    { hour: '4p', usage: 2.9 },
    { hour: '6p', usage: 3.8 },
    { hour: '8p', usage: 3.2 },
  ];
  private readonly config: ScChartConfig = {
    usage: { label: 'Usage (kW)', color: 'var(--chart-2)' },
  };
}
