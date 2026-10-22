import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ConstraintsCalendarNextDemoContainer } from './demos/constraints-calendar-next-demo-container';
import { CustomCalendarNextDemoContainer } from './demos/custom-calendar-next-demo-container';
import { FormCalendarNextDemoContainer } from './demos/form-calendar-next-demo-container';
import { LocaleCalendarNextDemoContainer } from './demos/locale-calendar-next-demo-container';
import { MultipleCalendarNextDemoContainer } from './demos/multiple-calendar-next-demo-container';
import { OutsideCalendarNextDemoContainer } from './demos/outside-calendar-next-demo-container';
import { RangeCalendarNextDemoContainer } from './demos/range-calendar-next-demo-container';
import { SingleCalendarNextDemoContainer } from './demos/single-calendar-next-demo-container';

@Component({
  selector: 'app-calendar-next-page',
  imports: [
    SingleCalendarNextDemoContainer,
    RangeCalendarNextDemoContainer,
    MultipleCalendarNextDemoContainer,
    ConstraintsCalendarNextDemoContainer,
    FormCalendarNextDemoContainer,
    CustomCalendarNextDemoContainer,
    LocaleCalendarNextDemoContainer,
    OutsideCalendarNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Calendar Next</h1>
        <p class="text-muted-foreground">
          The calendar, rebuilt: days, months and years in the app’s language —
          every word from Intl, the week as the locale has it — one day,
          several, or a range; reached by the keyboard across months; a
          [formField].
        </p>
        <app-component-badges path="calendar-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Single</h2>
        <p class="text-muted-foreground">
          One day. One Tab stop — the focused day: arrows, Home and End, PageUp
          and PageDown (with Shift, years) move it, across months; Enter or
          Space picks it. The heading shows the months, then the years.
        </p>
        <app-single-calendar-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Range</h2>
        <p class="text-muted-foreground">
          From a day to a day, over two months: between the first pick and the
          pointer, a preview; picked before the start, the two swap.
        </p>
        <app-range-calendar-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Multiple</h2>
        <p class="text-muted-foreground">
          Several days, each picked or unpicked on its own.
        </p>
        <app-multiple-calendar-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Min, max and unavailable</h2>
        <p class="text-muted-foreground">
          minDate and maxDate — kept in the month and year views too — and
          unavailable days: here, weekends. They can be reached, not picked.
        </p>
        <app-constraints-calendar-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>In a form</h2>
        <p class="text-muted-foreground">
          A [formField]: a required day, from the schema; marked once touched.
        </p>
        <app-form-calendar-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Custom days</h2>
        <p class="text-muted-foreground">
          Your content under a day’s number, from ng-template scCalendarNextDay
          — here, a dot for days with events, said in words for screen readers.
        </p>
        <app-custom-calendar-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Locale and week numbers</h2>
        <p class="text-muted-foreground">
          locale="de-DE": the days, months and heading in German, the week from
          Monday — as the locale has it — and showWeekNumbers.
        </p>
        <app-locale-calendar-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Outside days</h2>
        <p class="text-muted-foreground">
          Without the days of the months around it, and always six weeks — the
          height holds still.
        </p>
        <app-outside-calendar-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CalendarNextPage {}
