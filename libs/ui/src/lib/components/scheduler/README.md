# Scheduler

Events in a month, a week or a day, put together from parts. The scheduler holds the events, the view and the date; its views place the events — overlapping ones side by side — and you write the rest: the toolbar, and how an event looks, once for every view.

## Architecture

```
scScheduler (events, view, date, timeZone, firstDayOfWeek — label(), previous(), next(), goToToday(), goTo())
├── your toolbar: scSchedulerToday, scSchedulerPrevious, scSchedulerNext, scSchedulerTitle, scSchedulerViewButton
├── a view: scSchedulerMonth, or scSchedulerTimeGrid (week and day)
├── ng-template [scSchedulerEventTemplate] — how an event looks
│     └── scSchedulerEvent → your title, scSchedulerEventTime
└── ng-template scSchedulerMoreTemplate — a month's crowded day
      └── scSchedulerMore
```

## Usage

```html
<div scScheduler #scheduler="scScheduler" [events]="events" [(view)]="view" [(date)]="date" class="h-[40rem]">
  <div class="flex items-center gap-2">
    <button scSchedulerToday>Today</button>
    <button scSchedulerPrevious><svg siChevronLeftIcon></svg><span class="sr-only">Previous</span></button>
    <button scSchedulerNext><svg siChevronRightIcon></svg><span class="sr-only">Next</span></button>
    <div scSchedulerTitle>{{ scheduler.label() }}</div>
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
    <button scSchedulerEvent (click)="open(event)">
      <span class="font-medium">{{ event.title }}</span>
      <time scSchedulerEventTime></time>
    </button>
  </ng-template>

  <ng-template scSchedulerMoreTemplate let-count let-day="day">
    <button [scSchedulerMore]="day">{{ count }} more</button>
  </ng-template>
</div>
```

```ts
interface Meeting extends ScSchedulerEventData {
  readonly title: string;
}

const timeZone = Temporal.Now.timeZoneId();
const start = Temporal.Now.plainDateISO().toZonedDateTime({ timeZone, plainTime: Temporal.PlainTime.from('10:00') });
readonly events: Meeting[] = [{ id: 'review', title: 'Design review', start, end: start.add({ minutes: 90 }) }];
```

Events are data — `ScSchedulerEventData` (`id`, `start`, `end`, `allDay`) plus your own fields; binding them to `scSchedulerEventTemplate` gives `let-event` your type. What happens on an event is yours: write a `button` and its `(click)`.

## Parts

| Part                       | Selector                                | Does                                                                                                                                          |
| -------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScScheduler`              | `[scScheduler]`                         | The state: `events`, `view` and `date` (two-way), `timeZone`, `firstDayOfWeek` (the locale's); `label()`, `now()`, `today()`, `days()`        |
| `ScSchedulerToday`         | `button[scSchedulerToday]`              | Shows today. Write its text                                                                                                                   |
| `ScSchedulerPrevious`      | `button[scSchedulerPrevious]`           | The month, week or day before. Write its icon and name it                                                                                     |
| `ScSchedulerNext`          | `button[scSchedulerNext]`               | The month, week or day after. Write its icon and name it                                                                                      |
| `ScSchedulerTitle`         | `[scSchedulerTitle]`                    | What is shown — write `{{ scheduler.label() }}`; announced when it changes                                                                    |
| `ScSchedulerViewButton`    | `button[scSchedulerViewButton]`         | Switches to its view (`="month"`), `aria-pressed` while shown. Put them in a group you name                                                   |
| `ScSchedulerMonth`         | `div[scSchedulerMonth]`                 | The month: a table of weeks; a day's number opens the day. `maxEvents` (3)                                                                    |
| `ScSchedulerTimeGrid`      | `div[scSchedulerTimeGrid]`              | Week and day: a column per day, all-day row, events by time (overlaps side by side), now. `startHour` (0), `endHour` (24), `scrollToHour` (8) |
| `ScSchedulerEventTemplate` | `ng-template[scSchedulerEventTemplate]` | How an event looks, in every view                                                                                                             |
| `ScSchedulerEvent`         | `[scSchedulerEvent]`                    | The event's root: a line (month), a chip (all-day), a block (time grid)                                                                       |
| `ScSchedulerEventTime`     | `time[scSchedulerEventTime]`            | Its times in the app's language ("10:00 – 11:30 AM"; a month's line: the start)                                                               |
| `ScSchedulerMoreTemplate`  | `ng-template[scSchedulerMoreTemplate]`  | A month's day with more than `maxEvents`: `let-count`, `let-day="day"`                                                                        |
| `ScSchedulerMore`          | `button[scSchedulerMore]`               | Opens the day (`[scSchedulerMore]="day"`). Write its text                                                                                     |

## Dates and times

Everything is [Temporal](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Temporal): events start and end as `Temporal.ZonedDateTime`, the date shown is a `Temporal.PlainDate`. Events are placed in `timeZone` (the user's by default), so an event from another zone shows at its local time. Dates, times and the title are written by `Intl` in the app's language (`LOCALE_ID`), and the week starts on the locale's first day.

## Styling

- Give the scheduler a height (`class="h-[40rem]"`) and the view `flex-1`: the time grid scrolls inside it.
- An hour's height: `--sc-scheduler-hour-height` on the time grid (`3rem`).
- A short event is placed at least half an hour high, so its line can be read.

## Accessibility

- The month is a table: its rows are weeks, its column headers the weekdays (full names for screen readers); a day's number is a button named by its full date (`aria-current="date"` today).
- In the time grid, each day is a group named by its date, with its events in time order — Tab goes through them as they happen. Hours and the now line are hidden from screen readers.
- The title is a polite live region: moving or switching the view is announced.
- Events are yours: write a `button` (or a link), so they are reached and named by their text and `scSchedulerEventTime`.
