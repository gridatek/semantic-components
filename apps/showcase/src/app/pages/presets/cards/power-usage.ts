import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
  ScSeparator,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartBar,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

/** A home's power: usage by hour, now and solar, the battery. */
@Component({
  selector: 'app-preview-power-usage',
  imports: [
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartBar,
    ScChartCategoryAxis,
    ScChartPlot,
    ScChartTooltip,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
    ScSeparator,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Power Usage</h2>
        <p scCardDescription>Whole Home</p>
      </div>
      <div scCardContent class="flex flex-col gap-4">
        <div scChart class="h-[140px] w-full" [config]="config" [data]="data">
          <svg
            scChartPlot
            categoryKey="hour"
            aria-label="Power usage by hour, 6am to 8pm"
            [margin]="{ left: 0, right: 0, top: 4, bottom: 0 }"
          >
            <g scChartCategoryAxis class="text-xs" />
            <g scChartBar key="usage" [radius]="[4, 4, 0, 0]" />
          </svg>
          <div scChartTooltip hideLabel></div>
        </div>
        <div scSeparator aria-hidden="true"></div>
        <dl class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-0.5">
            <dt class="text-muted-foreground text-sm">Currently Using</dt>
            <dd class="text-lg font-semibold tabular-nums">3.4 kW</dd>
          </div>
          <div class="flex flex-col gap-0.5">
            <dt class="text-muted-foreground text-sm">Solar Gen</dt>
            <dd class="text-lg font-semibold tabular-nums">+1.2 kW</dd>
          </div>
        </dl>
      </div>
      <div scCardFooter class="flex-col items-start gap-1">
        <span class="text-muted-foreground text-sm"> Battery Level </span>
        <div class="flex w-full items-center gap-2">
          <div
            scProgress
            class="flex-1"
            aria-label="Battery level"
            [value]="85"
          >
            <div scProgressTrack><div scProgressRange></div></div>
          </div>
          <span class="text-sm font-medium tabular-nums">85%</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewPowerUsage {
  protected readonly data = [
    { hour: '6a', usage: 1.2 },
    { hour: '8a', usage: 2.8 },
    { hour: '10a', usage: 3.1 },
    { hour: '12p', usage: 2.4 },
    { hour: '2p', usage: 3.4 },
    { hour: '4p', usage: 2.9 },
    { hour: '6p', usage: 3.8 },
    { hour: '8p', usage: 3.2 },
  ];
  protected readonly config: ScChartConfig = {
    usage: { label: 'Usage (kW)', color: 'var(--chart-2)' },
  };
}
