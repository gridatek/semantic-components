import { Component, ViewEncapsulation } from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';
import { Demographics } from './demographics';
import { MetricsGrid } from './metrics-grid';
import { AnalyticsHeader } from './preview-header';
import { TopEditorial } from './top-editorial';
import { TrafficOverview } from './traffic-overview';

/**
 * shadcn's Sera screen "Audience Analytics" (sera/audience-analytics): the
 * header, four metrics, traffic and demographics, the top editorials — on a
 * muted page, its spacing `--gap` growing with the screen.
 */
@Component({
  selector: 'app-audience-analytics',
  imports: [
    AnalyticsHeader,
    Demographics,
    MetricsGrid,
    ScSeparator,
    TopEditorial,
    TrafficOverview,
  ],
  template: `
    <div
      class="bg-muted ring-foreground/5 w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8"
    >
      <app-analytics-header />
      <div scSeparator class="hidden sm:block"></div>
      <div class="grid w-full grid-cols-12 gap-(--gap) p-(--gap)">
        <app-metrics-grid />
        <app-traffic-overview
          class="col-span-full md:col-span-6 lg:col-span-8"
        />
        <app-demographics class="col-span-full md:col-span-6 lg:col-span-4" />
        <app-top-editorial class="col-span-full" />
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class AudienceAnalytics {}
