import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ConstraintsCalendarDemoContainer } from './demos/constraints-calendar-demo-container';
import { CustomCalendarDemoContainer } from './demos/custom-calendar-demo-container';
import { FormCalendarDemoContainer } from './demos/form-calendar-demo-container';
import { LocaleCalendarDemoContainer } from './demos/locale-calendar-demo-container';
import { MultipleCalendarDemoContainer } from './demos/multiple-calendar-demo-container';
import { OutsideCalendarDemoContainer } from './demos/outside-calendar-demo-container';
import { RangeCalendarDemoContainer } from './demos/range-calendar-demo-container';
import { SingleCalendarDemoContainer } from './demos/single-calendar-demo-container';

@Component({
  selector: 'app-calendar-page',
  imports: [
    SingleCalendarDemoContainer,
    RangeCalendarDemoContainer,
    MultipleCalendarDemoContainer,
    ConstraintsCalendarDemoContainer,
    FormCalendarDemoContainer,
    CustomCalendarDemoContainer,
    LocaleCalendarDemoContainer,
    OutsideCalendarDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Calendar</h1>
        <p class="text-muted-foreground">
          Days, months and years in the app’s language — every word from Intl,
          the week as the locale has it — one day, several, or a range; reached
          by the keyboard across months; a [formField].
        </p>
        <app-component-badges path="calendar" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Single</h2>
        <p class="text-muted-foreground">
          One day. One Tab stop — the focused day: arrows, Home and End, PageUp
          and PageDown (with Shift, years) move it, across months; Enter or
          Space picks it. The heading shows the months, then the years.
        </p>
        <app-single-calendar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Range</h2>
        <p class="text-muted-foreground">
          From a day to a day, over two months: between the first pick and the
          pointer, a preview; picked before the start, the two swap.
        </p>
        <app-range-calendar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Multiple</h2>
        <p class="text-muted-foreground">
          Several days, each picked or unpicked on its own.
        </p>
        <app-multiple-calendar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Min, max and unavailable</h2>
        <p class="text-muted-foreground">
          minDate and maxDate — kept in the month and year views too — and
          unavailable days: here, weekends. They can be reached, not picked.
        </p>
        <app-constraints-calendar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>In a form</h2>
        <p class="text-muted-foreground">
          A [formField]: a required day, from the schema; marked once touched.
        </p>
        <app-form-calendar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Custom days</h2>
        <p class="text-muted-foreground">
          Your content under a day’s number, from ng-template scCalendarDay —
          here, a dot for days with events, said in words for screen readers.
        </p>
        <app-custom-calendar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Locale and week numbers</h2>
        <p class="text-muted-foreground">
          locale="fr-FR": the days, months and heading in French, the week from
          Monday — as the locale has it — and showWeekNumbers.
        </p>
        <app-locale-calendar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Outside days</h2>
        <p class="text-muted-foreground">
          Without the days of the months around it, and always six weeks — the
          height holds still.
        </p>
        <app-outside-calendar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CalendarPage {}
