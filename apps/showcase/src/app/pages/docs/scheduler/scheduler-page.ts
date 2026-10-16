import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSchedulerDemoContainer } from './demos/basic-scheduler-demo-container';
import { MonthSchedulerDemoContainer } from './demos/month-scheduler-demo-container';
import { WorkingHoursSchedulerDemoContainer } from './demos/working-hours-scheduler-demo-container';

@Component({
  selector: 'app-scheduler-page',
  imports: [
    BasicSchedulerDemoContainer,
    MonthSchedulerDemoContainer,
    WorkingHoursSchedulerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Scheduler</h1>
        <p class="text-muted-foreground">
          Events in a month, a week or a day, put together from parts: the
          scheduler holds the events, the view and the date; its views place the
          events — overlapping ones side by side — and you write how an event
          looks, once, and the toolbar.
        </p>
        <app-component-badges path="scheduler" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          Month, week and day, with a toolbar. A day's number opens the day;
          dates, times and the title are written in the app's language, in your
          time zone.
        </p>
        <app-basic-scheduler-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Month</h2>
        <p class="text-muted-foreground">
          One view alone. A day shows
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">maxEvents</code>
          and gives the rest to your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scSchedulerMoreTemplate</code
          >.
        </p>
        <app-month-scheduler-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Working hours</h2>
        <p class="text-muted-foreground">
          A day from 8:00 to 18:00 (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >startHour</code
          >,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">endHour</code>),
          with taller hours (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >--sc-scheduler-hour-height</code
          >).
        </p>
        <app-working-hours-scheduler-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SchedulerPage {}
