import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicCalendarDemoContainer } from './demos/basic-calendar-demo-container';
import { BookedCalendarDemoContainer } from './demos/booked-calendar-demo-container';
import { CalendarUsageDemoContainer } from './demos/calendar-usage-demo-container';
import { ConstraintsCalendarDemoContainer } from './demos/constraints-calendar-demo-container';
import { CustomCalendarDemoContainer } from './demos/custom-calendar-demo-container';
import { CustomDaysCalendarDemoContainer } from './demos/custom-days-calendar-demo-container';
import { FormCalendarDemoContainer } from './demos/form-calendar-demo-container';
import { LocaleCalendarDemoContainer } from './demos/locale-calendar-demo-container';
import { MonthsYearsCalendarDemoContainer } from './demos/months-years-calendar-demo-container';
import { MultipleCalendarDemoContainer } from './demos/multiple-calendar-demo-container';
import { OutsideCalendarDemoContainer } from './demos/outside-calendar-demo-container';
import { PresetsCalendarDemoContainer } from './demos/presets-calendar-demo-container';
import { RangeCalendarDemoContainer } from './demos/range-calendar-demo-container';
import { RtlCalendarDemoContainer } from './demos/rtl-calendar-demo-container';
import { SingleCalendarDemoContainer } from './demos/single-calendar-demo-container';
import { TimeCalendarDemoContainer } from './demos/time-calendar-demo-container';
import { WeekNumbersCalendarDemoContainer } from './demos/week-numbers-calendar-demo-container';

@Component({
  selector: 'app-calendar-page',
  imports: [
    Anatomy,
    CalendarUsageDemoContainer,
    BasicCalendarDemoContainer,
    SingleCalendarDemoContainer,
    RangeCalendarDemoContainer,
    MultipleCalendarDemoContainer,
    BookedCalendarDemoContainer,
    ConstraintsCalendarDemoContainer,
    MonthsYearsCalendarDemoContainer,
    CustomDaysCalendarDemoContainer,
    CustomCalendarDemoContainer,
    PresetsCalendarDemoContainer,
    TimeCalendarDemoContainer,
    WeekNumbersCalendarDemoContainer,
    LocaleCalendarDemoContainer,
    OutsideCalendarDemoContainer,
    FormCalendarDemoContainer,
    RtlCalendarDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Calendar</h1>
        <p class="text-muted-foreground">
          Days, months and years in the app&apos;s language — one day, several,
          or a range; reached by the keyboard across months; a [formField]. In
          the look of the app&apos;s preset.
        </p>
        <app-component-badges path="calendar" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-calendar-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          The calendar draws its days, months and years; the header&apos;s
          arrows, the footer and its buttons, and each day&apos;s extra content
          are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A grid per month (role=&quot;grid&quot;), named by the month; every
            word — days, months, the heading — from Intl, in the locale.
          </li>
          <li>
            One Tab stop: the focused day. The arrows, Home and End, Page Up and
            Page Down (with Shift, years) move it, across months; Enter or Space
            picks it. The heading zooms out: months, then years.
          </li>
          <li>
            Today is aria-current=&quot;date&quot;; picked days aria-selected;
            unavailable ones aria-disabled. The heading is announced as it
            changes.
          </li>
          <li>
            Name the arrows (sr-only text) and the calendar (aria-label); say
            what a day&apos;s extra content means in sr-only text.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-calendar-demo-container />
        <app-single-calendar-demo-container />
        <app-range-calendar-demo-container />
        <app-multiple-calendar-demo-container />
        <app-booked-calendar-demo-container />
        <app-constraints-calendar-demo-container />
        <app-months-years-calendar-demo-container />
        <app-custom-days-calendar-demo-container />
        <app-custom-calendar-demo-container />
        <app-presets-calendar-demo-container />
        <app-time-calendar-demo-container />
        <app-week-numbers-calendar-demo-container />
        <app-locale-calendar-demo-container />
        <app-outside-calendar-demo-container />
        <app-form-calendar-demo-container />
        <app-rtl-calendar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Calendar parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CalendarPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScCalendar, ScCalendarHeader, ScCalendarPrevious, ScCalendarNext,',
      '  ScCalendarDay, ScCalendarFooter, ScCalendarToday, ScCalendarClear,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scCalendar #cal="scCalendar" aria-label="…" [(value)]="…">',
      '  <div scCalendarHeader>',
      '    <button scCalendarPrevious>…</button>',
      '    <button scCalendarNext>…</button>',
      '  </div>',
      '  <ng-template scCalendarDay let-day>…</ng-template>',
      '  <div scCalendarFooter>',
      '    <button scCalendarToday>…</button>',
      '    <button scCalendarClear>…</button>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCalendar',
      selector: 'div[scCalendar]',
      description:
        "[(value)], mode ('single', 'multiple', 'range'), minDate, maxDate, unavailable, locale, firstDayOfWeek, numberOfMonths, showOutsideDays, fixedWeeks, showWeekNumbers, startView (the view it opens on while empty; with a value, its days); a [formField]. Its cells from the preset's --cell-size and --cell-radius.",
    },
    {
      name: 'ScCalendarHeader, ScCalendarHeading',
      selector: 'div[scCalendarHeader], button[scCalendarHeading]',
      description:
        'Your arrows, and the heading — a button that zooms out (days, months, years); write your own to replace it.',
    },
    {
      name: 'ScCalendarPrevious, ScCalendarNext',
      selector: 'button[scCalendarPrevious], button[scCalendarNext]',
      description:
        "A month (or year, or years) back and on: the preset's button, ghost and a cell square; named by you.",
    },
    {
      name: 'ScCalendarDay',
      selector: 'ng-template[scCalendarDay]',
      description:
        'Your content under each day number: its context has the day, selected, today, unavailable, outside.',
    },
    {
      name: 'ScCalendarFooter, ScCalendarToday, ScCalendarClear',
      selector: 'div[…], button[…], button[…]',
      description: 'A row of actions under it: today, shown and picked; clear.',
    },
  ];
}
