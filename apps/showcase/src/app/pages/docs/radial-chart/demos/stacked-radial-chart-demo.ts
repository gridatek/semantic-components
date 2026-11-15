import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartCenter,
  ScChartCenterValue,
  type ScChartConfig,
  ScChartPlot,
  ScChartRadialBar,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-stacked-radial-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartRadialBar,
    ScChartCenter,
    ScChartCenterValue,
    ScChartTooltip,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    DecimalPipe,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
  ],
  template: `
    <div
      scChart
      class="mx-auto aspect-square max-h-64"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="month"
        [endAngle]="180"
        aria-label="Visitors in January, by device"
      >
        <g scChartRadialBar key="desktop" stack="a" [innerRadius]="0.75" />
        <g scChartRadialBar key="mobile" stack="a" [innerRadius]="0.75" />
        <g scChartCenter>
          <!-- Counting up as the arcs grow (a radial's: at once). -->
          <text
            scChartCenterValue
            text-anchor="middle"
            dy="-1.2em"
            class="fill-foreground text-2xl font-bold"
            [value]="total"
            [animationBegin]="0"
          ></text>
          <text text-anchor="middle" dy="0.2em" class="fill-muted-foreground">
            Visitors
          </text>
        </g>
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
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedRadialChartDemo {
  readonly data = [{ month: 'January', desktop: 1260, mobile: 570 }];
  readonly config: ScChartConfig = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
    mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  };
  readonly total = this.data[0].desktop + this.data[0].mobile;
}
