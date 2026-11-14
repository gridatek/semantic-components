import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardTitle,
} from '@semantic-components/ui';
import {
  SiTrendingDownIcon,
  SiTrendingUpIcon,
} from '@semantic-icons/lucide-icons';

export interface Metric {
  label: string;
  value: string;
  comparison: string;
  change: string;
  trend: 'up' | 'down';
}

export const METRICS: Metric[] = [
  {
    label: 'Total visitors',
    value: '248.5k',
    comparison: '12.4%',
    change: 'vs last period',
    trend: 'up',
  },
  {
    label: 'Unique readers',
    value: '182.1k',
    comparison: '8.7%',
    change: 'vs last period',
    trend: 'up',
  },
  {
    label: 'Avg. time on page',
    value: '3m 42s',
    comparison: '1.2%',
    change: 'vs last period',
    trend: 'down',
  },
  {
    label: 'Bounce rate',
    value: '42.8%',
    comparison: '3.5%',
    change: 'vs last period',
    trend: 'down',
  },
];

/** Four key figures, each with its change against the last period. */
@Component({
  selector: 'app-metrics-grid',
  imports: [
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardTitle,
    SiTrendingDownIcon,
    SiTrendingUpIcon,
  ],
  template: `
    @for (metric of metrics; track metric.label) {
      <div scCard class="col-span-full gap-0 md:col-span-6 lg:col-span-3">
        <div scCardBody class="flex flex-col gap-2">
          <h2 scCardDescription class="text-xs uppercase">
            {{ metric.label }}
          </h2>
          <p scCardTitle class="text-5xl tracking-tight lowercase">
            {{ metric.value }}
          </p>
          <p scCardDescription>
            @if (metric.trend === 'up') {
              <svg
                siTrendingUpIcon
                class="text-muted-foreground inline-block size-2.5"
              ></svg>
            } @else {
              <svg
                siTrendingDownIcon
                class="text-muted-foreground inline-block size-2.5"
              ></svg>
            }
            <!-- A space after the icon, as shadcn's {" "}: Angular drops a
              bare one between elements. -->
            {{ ' '
            }}<span class="text-foreground">{{ metric.comparison }}</span>
            {{ metric.change }}
          </p>
        </div>
      </div>
    }
  `,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class MetricsGrid {
  protected readonly metrics = METRICS;
}
