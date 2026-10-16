import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSchedulerDemo } from './basic-scheduler-demo';

@Component({
  selector: 'app-basic-scheduler-demo-container',
  imports: [DemoContainer, BasicSchedulerDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/scheduler/basic-scheduler-demo"
    >
      <app-basic-scheduler-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSchedulerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
} from '@semantic-components/ui-lab';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

interface Meeting extends ScSchedulerEventData {
  readonly title: string;
}

/** Month, week and day views, with a toolbar; click an event to select it. */
@Component({
  selector: 'app-basic-scheduler-demo',
  imports: [
    ScScheduler,
    ScSchedulerToday,
    ScSchedulerPrevious,
    ScSchedulerNext,
    ScSchedulerTitle,
    ScSchedulerViewButton,
    ScSchedulerMonth,
    ScSchedulerTimeGrid,
    ScSchedulerEventTemplate,
    ScSchedulerEvent,
    ScSchedulerEventTime,
    ScSchedulerMoreTemplate,
    ScSchedulerMore,
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
      class="h-[40rem]"
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
          <button scSchedulerViewButton="day">Day</button>
        </div>
      </div>

      @if (scheduler.view() === 'month') {
        <div scSchedulerMonth class="flex-1"></div>
      } @else {
        <div scSchedulerTimeGrid class="flex-1"></div>
      }

      <ng-template [scSchedulerEventTemplate]="events" let-event>
        <button scSchedulerEvent (click)="selected.set(event)">
          <span class="font-medium">{{ event.title }}</span>
          <time scSchedulerEventTime></time>
        </button>
      </ng-template>
      <ng-template scSchedulerMoreTemplate let-count let-day="day">
        <button [scSchedulerMore]="day">{{ count }} more</button>
      </ng-template>
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      @if (selected(); as event) {
        Selected: {{ event.title }}
      }
    </p>
  \`,
  host: { class: 'flex w-full flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSchedulerDemo {
  readonly events = eventsAroundToday();
  readonly view = signal<ScSchedulerView>('week');
  readonly date = signal(Temporal.Now.plainDateISO());
  readonly selected = signal<Meeting | null>(null);
}

/** Around today, in your time zone. */
function eventsAroundToday(): Meeting[] {
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
    {
      id: 'review',
      title: 'Design review',
      ...at(0, '10:00', { minutes: 90 }),
    },
    {
      id: 'one-on-one',
      title: '1:1 with Sam',
      ...at(0, '10:30', { minutes: 30 }),
    },
    { id: 'lunch', title: 'Team lunch', ...at(-1, '12:30', { hours: 1 }) },
    {
      id: 'planning',
      title: 'Sprint planning',
      ...at(1, '14:00', { hours: 2 }),
    },
    { id: 'interview', title: 'Interview', ...at(1, '14:30', { hours: 1 }) },
    { id: 'demo', title: 'Product demo', ...at(1, '15:00', { minutes: 45 }) },
    { id: 'retro', title: 'Retrospective', ...at(1, '17:00', { hours: 1 }) },
    { id: 'focus', title: 'Focus time', ...at(2, '08:00', { hours: 3 }) },
    {
      id: 'conference',
      title: 'Conference',
      allDay: true,
      ...at(3, '00:00', { days: 2 }),
    },
    { id: 'release', title: 'Release', ...at(-2, '16:00', { minutes: 30 }) },
  ];
}`;
}
