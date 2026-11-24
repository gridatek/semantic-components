import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
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

/** In a right-to-left page: the days run from the right, the dates and times in Arabic; ← goes on in the month. */
@Component({
  selector: 'app-rtl-scheduler-demo',
  imports: [
    Dir,
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
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div
      scScheduler
      #scheduler="scScheduler"
      [events]="events"
      [(view)]="view"
      [(date)]="date"
      dir="rtl"
      lang="ar"
      class="h-[36rem]"
    >
      <div class="flex flex-wrap items-center gap-2">
        <button scSchedulerToday>اليوم</button>
        <button scSchedulerPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">السابق</span>
        </button>
        <button scSchedulerNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">التالي</span>
        </button>
        <div scSchedulerTitle class="ms-2">{{ scheduler.label() }}</div>
        <div role="group" aria-label="العرض" class="ms-auto flex gap-1">
          <button scSchedulerViewButton="month">شهر</button>
          <button scSchedulerViewButton="week">أسبوع</button>
          <button scSchedulerViewButton="day">يوم</button>
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
        <button [scSchedulerMore]="day">{{ count }} أخرى</button>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSchedulerDemo {
  private readonly events = meetings();
  private readonly view = signal<ScSchedulerView>('week');
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
      id: 'standup',
      title: 'اجتماع الصباح',
      ...at(0, '09:00', { minutes: 30 }),
    },
    {
      id: 'review',
      title: 'مراجعة التصميم',
      ...at(0, '11:00', { minutes: 90 }),
    },
    { id: 'lunch', title: 'غداء الفريق', ...at(-1, '12:30', { hours: 1 }) },
    {
      id: 'conference',
      title: 'مؤتمر',
      allDay: true,
      ...at(1, '00:00', { days: 2 }),
    },
  ];
}
