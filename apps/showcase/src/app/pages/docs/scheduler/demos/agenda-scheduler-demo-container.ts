import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AgendaSchedulerDemo } from './agenda-scheduler-demo';

@Component({
  selector: 'app-agenda-scheduler-demo-container',
  imports: [DemoContainer, AgendaSchedulerDemo],
  template: `
    <app-demo-container
      title="Agenda"
      [code]="code"
      demoUrl="/demos/scheduler/agenda-scheduler-demo"
    >
      <app-agenda-scheduler-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AgendaSchedulerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScScheduler,
  ScSchedulerAgenda,
  ScSchedulerEvent,
  ScSchedulerEventTemplate,
  ScSchedulerEventTime,
  ScSchedulerNext,
  ScSchedulerPrevious,
  ScSchedulerTitle,
  ScSchedulerToday,
  type ScSchedulerEventData,
  type ScSchedulerView,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

interface Meeting extends ScSchedulerEventData {
  readonly title: string;
}

/** The agenda: the month's days with events, each a list — what a phone and a screen reader read best. Nothing on: your words. */
@Component({
  selector: 'app-agenda-scheduler-demo',
  imports: [
    ScScheduler,
    ScSchedulerAgenda,
    ScSchedulerEvent,
    ScSchedulerEventTemplate,
    ScSchedulerEventTime,
    ScSchedulerNext,
    ScSchedulerPrevious,
    ScSchedulerTitle,
    ScSchedulerToday,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scScheduler
      #scheduler="scScheduler"
      [events]="events"
      [(view)]="view"
      [(date)]="date"
      class="h-[36rem]"
    >
      <div class="flex flex-wrap items-center gap-2">
        <button scSchedulerToday>Today</button>
        <button scSchedulerPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">Previous</span>
        </button>
        <button scSchedulerNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">Next</span>
        </button>
        <div scSchedulerTitle class="ms-2">{{ scheduler.label() }}</div>
      </div>

      <div scSchedulerAgenda class="flex-1">No events this month.</div>

      <ng-template [scSchedulerEventTemplate]="events" let-event>
        <button scSchedulerEvent>
          <span class="font-medium">{{ event.title }}</span>
          <time scSchedulerEventTime></time>
        </button>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AgendaSchedulerDemo {
  private readonly events = meetings();
  private readonly view = signal<ScSchedulerView>('agenda');
  private readonly date = signal(Temporal.Now.plainDateISO());
}

/** Around today, in your time zone. */
function meetings(): Meeting[] {
  const timeZone = Temporal.Now.timeZoneId();
  const today = Temporal.Now.plainDateISO();
  const at = (
    days: number,
    time: string,
    duration: Temporal.DurationLike,
  ): Pick<Meeting, 'start' | 'end'> => {
    const start = today.add({ days }).toZonedDateTime({
      timeZone,
      plainTime: Temporal.PlainTime.from(time),
    });
    return { start, end: start.add(duration) };
  };
  return [
    { id: 'standup', title: 'Stand-up', ...at(0, '09:00', { minutes: 15 }) },
    { id: 'review', title: 'Design review', ...at(0, '10:00', { minutes: 90 }) },
    { id: 'conference', title: 'Conference', allDay: true, ...at(2, '00:00', { days: 2 }) },
    { id: 'planning', title: 'Sprint planning', ...at(5, '14:00', { hours: 2 }) },
    { id: 'retro', title: 'Retrospective', ...at(9, '17:00', { hours: 1 }) },
  ];
}`;
}
