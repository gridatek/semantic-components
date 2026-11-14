import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartGrid,
  ScChartLine,
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

const TRAFFIC = [
  { date: '2025-10-01', views: 2600, unique: 1600 },
  { date: '2025-10-04', views: 4500, unique: 3000 },
  { date: '2025-10-08', views: 3500, unique: 2500 },
  { date: '2025-10-10', views: 6400, unique: 4500 },
  { date: '2025-10-13', views: 5400, unique: 4000 },
  { date: '2025-10-15', views: 8300, unique: 6500 },
  { date: '2025-10-17', views: 7400, unique: 6000 },
  { date: '2025-10-18', views: 9240, unique: 7105 },
  { date: '2025-10-22', views: 7700, unique: 6400 },
  { date: '2025-10-26', views: 8800, unique: 7000 },
  { date: '2025-10-29', views: 9800, unique: 8400 },
];

/**
 * Views and unique readers over the month. shadcn's dashed comparison line,
 * dotted grid and one marked point (Oct 18, its 8th) are classes here: the
 * line's dots on, all hidden but that one (the 12th circle, the hovered
 * point, still shows).
 */
@Component({
  selector: 'app-traffic-overview',
  imports: [
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartCategoryAxis,
    ScChartGrid,
    ScChartLine,
    ScChartPlot,
    ScChartTooltip,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    DecimalPipe,
    ScChartTooltipLabel,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
  ],
  template: `
    <div scCard class="h-full">
      <div scCardHeader>
        <h2 scCardTitle class="text-2xl">Traffic Overview</h2>
        <p scCardDescription>
          Traffic for the last 30 days has increased by 12.4% compared to the
          previous period.
        </p>
      </div>
      <div scCardBody>
        <div
          scChart
          class="aspect-auto h-82 w-full"
          [config]="config"
          [data]="data"
        >
          <svg
            scChartPlot
            categoryKey="date"
            aria-label="Views and unique readers, October 1 to 29"
          >
            <g
              scChartGrid
              class="stroke-border [&_line]:[stroke-dasharray:3_6]"
            />
            <g scChartCategoryAxis [tickFormatter]="day" />
            <g
              scChartLine
              key="views"
              curve="linear"
              dots
              [strokeWidth]="2.2"
              class="[&>circle:nth-of-type(-n+11):not(:nth-of-type(8))]:hidden"
            />
            <g
              scChartLine
              key="unique"
              curve="linear"
              [strokeWidth]="2"
              [activeDot]="false"
              class="[&>path]:[stroke-dasharray:4_6]"
            />
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
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class TrafficOverview {
  protected readonly data = TRAFFIC;
  protected readonly config: ScChartConfig = {
    views: { label: 'Views', color: 'var(--traffic-views)' },
    unique: { label: 'Unique', color: 'var(--traffic-unique)' },
  };

  /** "Oct 1": the day, as shadcn writes it. */
  protected readonly day = (date: string) =>
    Temporal.PlainDate.from(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
}
