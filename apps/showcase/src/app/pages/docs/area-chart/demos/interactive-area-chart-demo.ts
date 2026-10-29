import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  ScChart,
  ScChartArea,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartLegend,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-interactive-area-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartArea,
    ScChartTooltip,
    ScChartLegend,
    ScToggleGroup,
    ScToggleGroupItem,
  ],
  template: `
    <div
      scToggleGroup
      size="sm"
      aria-label="Time range"
      class="mb-3"
      [value]="range()"
      (valueChange)="choose($event)"
    >
      <button scToggleGroupItem value="90">Last 3 months</button>
      <button scToggleGroupItem value="30">Last 30 days</button>
      <button scToggleGroupItem value="7">Last 7 days</button>
    </div>
    <div scChart [config]="config" [data]="data()">
      <svg
        scChartPlot
        categoryKey="date"
        aria-label="Visitors by device, by day"
      >
        <defs>
          <linearGradient id="interactive-desktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stop-color="var(--color-desktop)"
              stop-opacity="0.8"
            />
            <stop
              offset="95%"
              stop-color="var(--color-desktop)"
              stop-opacity="0.1"
            />
          </linearGradient>
          <linearGradient id="interactive-mobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stop-color="var(--color-mobile)"
              stop-opacity="0.8"
            />
            <stop
              offset="95%"
              stop-color="var(--color-mobile)"
              stop-opacity="0.1"
            />
          </linearGradient>
        </defs>
        <g scChartGrid />
        <g scChartCategoryAxis [tickFormatter]="day" />
        <g scChartCursor />
        <g
          scChartArea
          key="mobile"
          stack="a"
          fill="url(#interactive-mobile)"
          [fillOpacity]="1"
        />
        <g
          scChartArea
          key="desktop"
          stack="a"
          fill="url(#interactive-desktop)"
          [fillOpacity]="1"
        />
      </svg>
      <div scChartTooltip indicator="dot" [labelFormatter]="day"></div>
      <div scChartLegend></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class InteractiveAreaChartDemo {
  private readonly locale = inject(LOCALE_ID);
  /** Three months of visits, a row a day. */
  private readonly days = Array.from({ length: 91 }, (_, i) => ({
    date: Temporal.PlainDate.from('2024-04-01').add({ days: i }).toString(),
    desktop: Math.round(250 + 150 * Math.sin(i / 5) + 60 * Math.sin(i / 1.7)),
    mobile: Math.round(200 + 100 * Math.cos(i / 6) + 50 * Math.sin(i / 2.3)),
  }));
  readonly config: ScChartConfig = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
    mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  };
  /** The days shown: the last 90, 30 or 7. */
  readonly range = signal('90');
  readonly data = computed(() => this.days.slice(-Number(this.range())));
  /** 2024-04-01 → Apr 1, in the app's locale. */
  readonly day = (date: string) =>
    Temporal.PlainDate.from(date).toLocaleString(this.locale, {
      month: 'short',
      day: 'numeric',
    });

  choose(value: string | string[] | null): void {
    if (typeof value === 'string') this.range.set(value);
  }
}
