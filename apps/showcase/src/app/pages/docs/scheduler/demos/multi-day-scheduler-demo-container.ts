import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultiDaySchedulerDemo } from './multi-day-scheduler-demo';

@Component({
  selector: 'app-multi-day-scheduler-demo-container',
  imports: [DemoContainer, MultiDaySchedulerDemo],
  template: `
    <app-demo-container
      title="Over days"
      [code]="code"
      demoUrl="/demos/scheduler/multi-day-scheduler-demo"
    >
      <app-multi-day-scheduler-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultiDaySchedulerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScScheduler,
  ScSchedulerEvent,
  type ScSchedulerEventData,
  ScSchedulerEventTemplate,
  ScSchedulerEventTime,
  ScSchedulerMonth,
  ScSchedulerMore,
  ScSchedulerMoreTemplate,
  ScSchedulerNext,
  ScSchedulerPrevious,
  ScSchedulerTimeGrid,
  ScSchedulerTitle,
  ScSchedulerToday,
  type ScSchedulerView,
  ScSchedulerViewButton,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

interface Meeting extends ScSchedulerEventData {
  readonly title: string;
}

/** Over days: an all-day event, or one from evening to morning, is a bar across its days — going on into the next week with square ends; a crowded day says how many more. */
@Component({
  selector: 'app-multi-day-scheduler-demo',
  imports: [
    ScScheduler,
    ScSchedulerEvent,
    ScSchedulerEventTemplate,
    ScSchedulerEventTime,
    ScSchedulerMonth,
    ScSchedulerMore,
    ScSchedulerMoreTemplate,
    ScSchedulerNext,
    ScSchedulerPrevious,
    ScSchedulerTimeGrid,
    ScSchedulerTitle,
    ScSchedulerToday,
    ScSchedulerViewButton,
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
        <div role="group" aria-label="View" class="ms-auto flex gap-1">
          <button scSchedulerViewButton="month">Month</button>
          <button scSchedulerViewButton="week">Week</button>
        </div>
      </div>

      @if (scheduler.view() === 'month') {
        <div scSchedulerMonth class="flex-1"></div>
      } @else {
        <div scSchedulerTimeGrid class="flex-1"></div>
      }

      <ng-template [scSchedulerEventTemplate]="events" let-event>
        <button scSchedulerEvent>
          <span class="font-medium">{{ event.title }}</span>
          <time scSchedulerEventTime></time>
        </button>
      </ng-template>
      <ng-template scSchedulerMoreTemplate let-count let-day="day">
        <button [scSchedulerMore]="day">{{ count }} more</button>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class MultiDaySchedulerDemo {
  private readonly events = meetings();
  private readonly view = signal<ScSchedulerView>('month');
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
    {
      id: 'trip',
      title: 'Trip to Lisbon',
      allDay: true,
      ...at(-2, '00:00', { days: 6 }),
    },
    {
      id: 'conference',
      title: 'Conference',
      allDay: true,
      ...at(1, '00:00', { days: 2 }),
    },
    { id: 'launch', title: 'Night launch', ...at(0, '21:00', { hours: 6 }) },
    { id: 'standup', title: 'Stand-up', ...at(1, '09:00', { minutes: 15 }) },
    { id: 'review', title: 'Design review', ...at(1, '10:00', { hours: 1 }) },
    { id: 'lunch', title: 'Team lunch', ...at(1, '12:30', { hours: 1 }) },
    { id: 'retro', title: 'Retrospective', ...at(1, '17:00', { hours: 1 }) },
  ];
}`;
}
