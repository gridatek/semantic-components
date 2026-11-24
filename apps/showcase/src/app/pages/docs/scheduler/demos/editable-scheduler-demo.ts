import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScKbd,
  ScScheduler,
  ScSchedulerEvent,
  type ScSchedulerEventChange,
  type ScSchedulerEventData,
  ScSchedulerEventTemplate,
  ScSchedulerEventTime,
  ScSchedulerMonth,
  ScSchedulerMore,
  ScSchedulerMoreTemplate,
  ScSchedulerNext,
  ScSchedulerPrevious,
  type ScSchedulerSlot,
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

interface Task extends ScSchedulerEventData {
  readonly title: string;
  /** Its colour: a CSS colour, for --sc-scheduler-event. */
  readonly color: string;
}

/** Editable: drag an event (or Alt with the arrows) to move it, its bottom edge to resize it; pick an empty time (a click, a drag, or the arrows then Enter in the hours) to add one. Your code saves each change; the colours are --sc-scheduler-event. */
@Component({
  selector: 'app-editable-scheduler-demo',
  imports: [
    ScKbd,
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
  template: `
    <div
      scScheduler
      #scheduler="scScheduler"
      [events]="events()"
      [(view)]="view"
      [(date)]="date"
      pickable
      editable
      [slotMinutes]="15"
      (slotPick)="add($event)"
      (eventChange)="save($event)"
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
        </div>
      </div>

      @if (scheduler.view() === 'month') {
        <div scSchedulerMonth class="flex-1"></div>
      } @else {
        <div scSchedulerTimeGrid class="flex-1"></div>
      }

      <ng-template [scSchedulerEventTemplate]="events()" let-event>
        <button
          scSchedulerEvent
          [style.--sc-scheduler-event]="event.color"
          (click)="last.set('Opened ' + event.title)"
        >
          <span class="font-medium">{{ event.title }}</span>
          <time scSchedulerEventTime></time>
        </button>
      </ng-template>
      <ng-template scSchedulerMoreTemplate let-count let-day="day">
        <button [scSchedulerMore]="day">{{ count }} more</button>
      </ng-template>
    </div>
    <p class="text-muted-foreground text-sm">
      Move: drag, or <kbd scKbd>Alt + ↑</kbd> <kbd scKbd>Alt + ↓</kbd>
      <kbd scKbd>Alt + ←</kbd> <kbd scKbd>Alt + →</kbd>; resize: its bottom
      edge, or <kbd scKbd>Alt + Shift + ↓</kbd>.
    </p>
    <p class="text-sm" aria-live="polite" data-testid="last">{{ last() }}</p>
  `,
  host: { class: 'flex w-full flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class EditableSchedulerDemo {
  private readonly events = signal(tasksAroundToday());
  private readonly view = signal<ScSchedulerView>('week');
  private readonly date = signal(Temporal.Now.plainDateISO());
  private readonly last = signal('');
  private count = 0;

  /** A slot picked: a new task there. */
  private add(slot: ScSchedulerSlot): void {
    const task: Task = {
      id: `new-${++this.count}`,
      title: `New task ${this.count}`,
      color: 'var(--color-emerald-600)',
      ...slot,
    };
    this.events.update((events) => [...events, task]);
    this.last.set(`Added ${task.title}`);
  }

  /** A task moved or resized: saved. */
  private save({ event, start, end }: ScSchedulerEventChange<Task>): void {
    this.events.update((events) =>
      events.map((e) => (e.id === event.id ? { ...e, start, end } : e)),
    );
    this.last.set(`Moved ${event.title}`);
  }
}

/** Around today, in your time zone. */
function tasksAroundToday(): Task[] {
  const timeZone = Temporal.Now.timeZoneId();
  const today = Temporal.Now.plainDateISO();
  const at = (
    days: number,
    time: string,
    duration: Temporal.DurationLike,
  ): Pick<Task, 'start' | 'end'> => {
    const start = today.add({ days }).toZonedDateTime({
      timeZone,
      plainTime: Temporal.PlainTime.from(time),
    });
    return { start, end: start.add(duration) };
  };
  const blue = 'var(--color-sky-600)';
  const violet = 'var(--color-violet-600)';
  const amber = 'var(--color-amber-600)';
  return [
    {
      id: 'write',
      title: 'Write the brief',
      color: blue,
      ...at(0, '09:00', { hours: 1 }),
    },
    {
      id: 'review',
      title: 'Review designs',
      color: violet,
      ...at(0, '11:00', { minutes: 90 }),
    },
    {
      id: 'call',
      title: 'Client call',
      color: amber,
      ...at(1, '10:00', { minutes: 45 }),
    },
    {
      id: 'plan',
      title: 'Plan the sprint',
      color: blue,
      ...at(-1, '14:00', { hours: 2 }),
    },
    {
      id: 'offsite',
      title: 'Offsite',
      color: violet,
      allDay: true,
      ...at(2, '00:00', { days: 2 }),
    },
  ];
}
