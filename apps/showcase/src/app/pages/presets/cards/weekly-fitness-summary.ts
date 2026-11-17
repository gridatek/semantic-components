import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
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
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';

/**
 * A week's workout load, as a bar chart styled as shadcn's card: the days'
 * initials on top, each load a bar over a muted track up to 100% — a share of
 * the day's goal (the value axis hidden, its domain fixed). The pointer or the
 * keyboard says each day's load.
 */
@Component({
  selector: 'app-preview-weekly-fitness-summary',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartBar,
    ScChartCategoryAxis,
    ScChartPlot,
    ScChartTooltip,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipLabel,
    ScChartTooltipName,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartTooltipValue,
    ScChartValueAxis,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Weekly Fitness Summary</h2>
        <p scCardDescription>Calories and workout load by day</p>
      </div>
      <div scCardBody>
        <div scChart class="aspect-auto h-24" [config]="config" [data]="week">
          <svg
            scChartPlot
            categoryKey="name"
            aria-label="Workout load by day, Monday to Sunday"
            [margin]="{ top: 0, right: 0, bottom: 0, left: 0 }"
          >
            <!-- The days' initials above their bars. -->
            <g
              scChartCategoryAxis
              orientation="top"
              class="text-sm"
              [tickFormatter]="initial"
            />
            <!-- A load is a share of the day's goal: always out of 100. -->
            <g scChartValueAxis hide [domain]="[0, 100]" />
            <g scChartBar key="load" background />
          </svg>
          <div scChartTooltipProvider>
            <ng-template scChartTooltipPortal>
              <div scChartTooltip #tooltip="scChartTooltip">
                <div scChartTooltipLabel>{{ tooltip.label() }}</div>
                @for (item of tooltip.payload(); track item.dataKey) {
                  <div scChartTooltipItem [item]="item">
                    <span scChartTooltipIndicator></span>
                    <span scChartTooltipName>{{ item.name }}</span>
                    <span scChartTooltipValue>{{ item.value }}%</span>
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton class="w-full">View details</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewWeeklyFitnessSummary {
  private readonly week = [
    { name: 'Monday', load: 84 },
    { name: 'Tuesday', load: 52 },
    { name: 'Wednesday', load: 73 },
    { name: 'Thursday', load: 66 },
    { name: 'Friday', load: 91 },
    { name: 'Saturday', load: 48 },
    { name: 'Sunday', load: 61 },
  ];
  private readonly config: ScChartConfig = {
    load: { label: 'Workout load', color: 'var(--chart-3)' },
  };
  /** Monday → M. */
  private readonly initial = (day: string) => day.charAt(0);
}
