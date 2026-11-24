import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AgendaSchedulerDemoContainer } from './demos/agenda-scheduler-demo-container';
import { BasicSchedulerDemoContainer } from './demos/basic-scheduler-demo-container';
import { EditableSchedulerDemoContainer } from './demos/editable-scheduler-demo-container';
import { MonthSchedulerDemoContainer } from './demos/month-scheduler-demo-container';
import { MultiDaySchedulerDemoContainer } from './demos/multi-day-scheduler-demo-container';
import { RtlSchedulerDemoContainer } from './demos/rtl-scheduler-demo-container';
import { WorkingHoursSchedulerDemoContainer } from './demos/working-hours-scheduler-demo-container';

@Component({
  selector: 'app-scheduler-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ComponentBadges,
    PartsTable,
    TocHeading,
    BasicSchedulerDemoContainer,
    MonthSchedulerDemoContainer,
    WorkingHoursSchedulerDemoContainer,
    MultiDaySchedulerDemoContainer,
    AgendaSchedulerDemoContainer,
    EditableSchedulerDemoContainer,
    RtlSchedulerDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Scheduler</h1>
        <p class="text-muted-foreground">
          Events in a month, a week, a day or an agenda, put together from
          parts: the scheduler holds the events, the view and the date; its
          views place the events — overlapping ones side by side, bars across
          their days — and you write how an event looks, once, and the toolbar.
          Pick a time to create, drag to move, with the keyboard too.
        </p>
        <app-component-badges path="scheduler" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-basic-scheduler-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The scheduler holds the state; you write the toolbar, a view, and two
          templates — how an event looks (in every view) and a crowded
          day&apos;s "more". Events are data: an id, a start and an end
          (Temporal), all day or not, and your own fields.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Dates and times</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Events start and end as
            <code scTypeset>Temporal.ZonedDateTime</code>, placed in
            <code scTypeset>timeZone</code> (the user&apos;s by default); the
            date shown is a <code scTypeset>Temporal.PlainDate</code>.
          </li>
          <li>
            Dates, times and the title are written by
            <code scTypeset>Intl</code> in the app&apos;s language (<code
              scTypeset
              >LOCALE_ID</code
            >); the week starts on the locale&apos;s first day.
          </li>
          <li>
            An event all day, or over more than one day, is a bar across its
            days — the month, the all-day row — going on into the next week with
            square ends.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Creating and moving</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <code scTypeset>pickable</code>: an empty time or day — a click, a
            drag over several, or the keys in the hours — emits
            <code scTypeset>(slotPick)</code> with its start, its end and
            whether it is all day: create the event there.
          </li>
          <li>
            <code scTypeset>editable</code>: an event dragged (to another time
            or day), dragged by its bottom edge, or moved by the keys emits
            <code scTypeset>(eventChange)</code> with its new times. The
            scheduler shows <code scTypeset>events</code>: save the change and
            it moves; don&apos;t, and it goes back.
          </li>
          <li>
            Times snap to <code scTypeset>slotMinutes</code> (30). A touch
            scrolls; a tap is a click.
          </li>
          <li>
            An event&apos;s colour is
            <code scTypeset>--sc-scheduler-event</code> (the primary by
            default), mixed into the background.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The month is a grid, one Tab stop on its days:
            <kbd scKbd>←</kbd> <kbd scKbd>→</kbd> (mirrored right to left),
            <kbd scKbd>↑</kbd> <kbd scKbd>↓</kbd> a week, <kbd scKbd>Home</kbd>
            <kbd scKbd>End</kbd> the week&apos;s ends, <kbd scKbd>Page Up</kbd>
            <kbd scKbd>Page Down</kbd> a month (with <kbd scKbd>Shift</kbd>, a
            year); <kbd scKbd>Enter</kbd> opens the day. Your events are Tab
            stops, in order.
          </li>
          <li>
            The hours (<code scTypeset>pickable</code>): <kbd scKbd>↑</kbd>
            <kbd scKbd>↓</kbd> move a slot, <kbd scKbd>←</kbd>
            <kbd scKbd>→</kbd> a day, <kbd scKbd>Shift + ↓</kbd> makes it
            longer, <kbd scKbd>Enter</kbd> picks it — each step read out.
          </li>
          <li>
            An event (<code scTypeset>editable</code>): <kbd scKbd>Alt + ↑</kbd>
            <kbd scKbd>Alt + ↓</kbd> a slot (a week in the month),
            <kbd scKbd>Alt + ←</kbd> <kbd scKbd>Alt + →</kbd> a day,
            <kbd scKbd>Alt + Shift + ↓</kbd> ends it later; its new times are
            read out, and the keyboard stays on it.
          </li>
          <li>
            The title is a polite live region: moving and switching the view are
            announced.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-month-scheduler-demo-container />
        <app-working-hours-scheduler-demo-container />
        <app-multi-day-scheduler-demo-container />
        <app-agenda-scheduler-demo-container />
        <app-editable-scheduler-demo-container />
        <app-rtl-scheduler-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins). The look: the style&apos;s frame, and its
          <code scTypeset>scheduler</code> key (the day number&apos;s and the
          events&apos; corners).
        </p>
        <app-parts-table label="Scheduler parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SchedulerPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScScheduler, ScSchedulerToday, ScSchedulerPrevious, ScSchedulerNext,',
      '  ScSchedulerTitle, ScSchedulerViewButton, ScSchedulerMonth,',
      '  ScSchedulerTimeGrid, ScSchedulerAgenda, ScSchedulerEventTemplate,',
      '  ScSchedulerEvent, ScSchedulerEventTime, ScSchedulerMoreTemplate,',
      '  ScSchedulerMore,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scScheduler #scheduler="scScheduler" [events]="events"',
      '  [(view)]="view" [(date)]="date" pickable editable',
      '  (slotPick)="add($event)" (eventChange)="save($event)">',
      '  <button scSchedulerToday>…</button>',
      '  <button scSchedulerPrevious>…</button>',
      '  <button scSchedulerNext>…</button>',
      '  <h2 scSchedulerTitle>{{ scheduler.label() }}</h2>',
      '  <button scSchedulerViewButton="month">…</button>',
      '',
      '  <div scSchedulerMonth></div>  <!-- or scSchedulerTimeGrid, scSchedulerAgenda -->',
      '',
      '  <ng-template [scSchedulerEventTemplate]="events" let-event>',
      '    <button scSchedulerEvent (click)="open(event)">',
      '      {{ event.title }} <time scSchedulerEventTime></time>',
      '    </button>',
      '  </ng-template>',
      '  <ng-template scSchedulerMoreTemplate let-count let-day="day">',
      '    <button [scSchedulerMore]="day">…</button>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScScheduler',
      selector: 'div[scScheduler]',
      description:
        "events, [(view)] ('month', 'week', 'day', 'agenda'), [(date)], timeZone, firstDayOfWeek, pickable, editable, slotMinutes (30); (slotPick), (eventChange). exportAs scScheduler: label(), now(), today(), days(), previous(), next(), goToToday(), goTo(date, view?).",
    },
    {
      name: 'ScSchedulerToday, ScSchedulerPrevious, ScSchedulerNext',
      selector: 'button[…]',
      description:
        'The style’s button: today, the month, week or day before or after. Write their text or icons and names.',
    },
    {
      name: 'ScSchedulerTitle',
      selector: 'h1, h2, h3, div[scSchedulerTitle]',
      description:
        'What is shown — write {{ scheduler.label() }}; a polite live region.',
    },
    {
      name: 'ScSchedulerViewButton',
      selector: 'button[scSchedulerViewButton]',
      description:
        'Switches to its view ("month"…), aria-pressed while shown. Put them in a group you name.',
    },
    {
      name: 'ScSchedulerMonth',
      selector: 'div[scSchedulerMonth]',
      description:
        'The month: a grid of weeks, one Tab stop on its days; lines and bars; maxEvents (3).',
    },
    {
      name: 'ScSchedulerTimeGrid',
      selector: 'div[scSchedulerTimeGrid]',
      description:
        'Week and day: a column per day, the all-day row, events by time (overlaps side by side), now. startHour (0), endHour (24), scrollToHour (8); --sc-scheduler-hour-height (3rem).',
    },
    {
      name: 'ScSchedulerAgenda',
      selector: 'div[scSchedulerAgenda]',
      description:
        'The month’s days with events, each a list. Its content: what it says when nothing is on.',
    },
    {
      name: 'ScSchedulerEventTemplate, ScSchedulerEvent',
      selector:
        'ng-template[scSchedulerEventTemplate], button[scSchedulerEvent], a[scSchedulerEvent]',
      description:
        'How an event looks, in every view (let-event is your type). The event: a line, a bar, a block, a row; --sc-scheduler-event its colour; Alt with the arrows moves it (editable).',
    },
    {
      name: 'ScSchedulerEventTime',
      selector: 'time[scSchedulerEventTime]',
      description:
        'Its times in the app’s language ("10:00 – 11:30 AM"; over days, with the dates; a month’s line, its start).',
    },
    {
      name: 'ScSchedulerMoreTemplate, ScSchedulerMore',
      selector: 'ng-template[scSchedulerMoreTemplate], button[scSchedulerMore]',
      description:
        'A crowded day: let-count, let-day="day"; the button opens the day. Write its text.',
    },
  ];
}
