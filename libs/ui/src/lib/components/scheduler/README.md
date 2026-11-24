# Scheduler

Events in a month, a week, a day or an agenda, put together from parts. The scheduler holds the events, the view and the date; its views place the events — overlapping ones side by side, bars across their days — and you write the rest: the toolbar, and how an event looks, once for every view. Pick a time to create, drag to move and resize, with the keyboard too. After FullCalendar, react-big-calendar and Schedule-X for the features; none of them documents a keyboard model, ours is the Calendar's grid and more.

## Architecture

```
scScheduler (events, view, date, timeZone, firstDayOfWeek, pickable, editable, slotMinutes — (slotPick), (eventChange))
├── your toolbar: scSchedulerToday, scSchedulerPrevious, scSchedulerNext, scSchedulerTitle, scSchedulerViewButton
├── a view: scSchedulerMonth, scSchedulerTimeGrid (week and day), or scSchedulerAgenda
├── ng-template [scSchedulerEventTemplate] — how an event looks
│     └── scSchedulerEvent → your title, scSchedulerEventTime
└── ng-template scSchedulerMoreTemplate — a crowded day
      └── scSchedulerMore
```

## Usage

```html
<div scScheduler #scheduler="scScheduler" [events]="events()" [(view)]="view" [(date)]="date" pickable editable (slotPick)="add($event)" (eventChange)="save($event)" class="h-[40rem]">
  <div class="flex items-center gap-2">
    <button scSchedulerToday>Today</button>
    <button scSchedulerPrevious><svg siChevronLeftIcon></svg><span class="sr-only">Previous</span></button>
    <button scSchedulerNext><svg siChevronRightIcon></svg><span class="sr-only">Next</span></button>
    <h2 scSchedulerTitle>{{ scheduler.label() }}</h2>
    <div role="group" aria-label="View" class="ms-auto flex gap-1">
      <button scSchedulerViewButton="month">Month</button>
      <button scSchedulerViewButton="week">Week</button>
      <button scSchedulerViewButton="agenda">Agenda</button>
    </div>
  </div>

  @switch (scheduler.view()) { @case ('month') {
  <div scSchedulerMonth class="flex-1"></div>
  } @case ('agenda') {
  <div scSchedulerAgenda class="flex-1">No events this month.</div>
  } @default {
  <div scSchedulerTimeGrid class="flex-1"></div>
  } }

  <ng-template [scSchedulerEventTemplate]="events()" let-event>
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
add(slot: ScSchedulerSlot) { this.events.update((events) => [...events, { id: crypto.randomUUID(), title: 'New event', ...slot }]); }
save({ event, start, end }: ScSchedulerEventChange<Meeting>) { this.events.update((events) => events.map((e) => (e.id === event.id ? { ...e, start, end } : e))); }
```

Events are data — `ScSchedulerEventData` (`id`, `start`, `end`, `allDay`) plus your own fields; binding them to `scSchedulerEventTemplate` gives `let-event` your type. What happens on an event is yours: write a `button` (or a link) and its `(click)`.

## Parts

| Part                       | Selector                                        | Does                                                                                                                                                                                                                                                 |
| -------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScScheduler`              | `div[scScheduler]`                              | The state: `events`, `view` (`month`, `week`, `day`, `agenda`) and `date` (two-way), `timeZone`, `firstDayOfWeek` (the locale's), `pickable`, `editable`, `slotMinutes` (30); `(slotPick)`, `(eventChange)`; `label()`, `now()`, `today()`, `days()` |
| `ScSchedulerToday`         | `button[scSchedulerToday]`                      | Shows today. Write its text                                                                                                                                                                                                                          |
| `ScSchedulerPrevious`      | `button[scSchedulerPrevious]`                   | The month, week or day before. Write its icon and name it                                                                                                                                                                                            |
| `ScSchedulerNext`          | `button[scSchedulerNext]`                       | The month, week or day after. Write its icon and name it                                                                                                                                                                                             |
| `ScSchedulerTitle`         | `h1, h2, h3, div[scSchedulerTitle]`             | What is shown — write `{{ scheduler.label() }}`; announced when it changes                                                                                                                                                                           |
| `ScSchedulerViewButton`    | `button[scSchedulerViewButton]`                 | Switches to its view (`="month"`), `aria-pressed` while shown. Put them in a group you name                                                                                                                                                          |
| `ScSchedulerMonth`         | `div[scSchedulerMonth]`                         | The month: a grid of weeks, one Tab stop on its days; lines and bars; `maxEvents` (3)                                                                                                                                                                |
| `ScSchedulerTimeGrid`      | `div[scSchedulerTimeGrid]`                      | Week and day: a column per day, the all-day row (bars), events by time (overlaps side by side), now. `startHour` (0), `endHour` (24), `scrollToHour` (8)                                                                                             |
| `ScSchedulerAgenda`        | `div[scSchedulerAgenda]`                        | The month's days with events, each a list named by its date. Its content: what it says when nothing is on                                                                                                                                            |
| `ScSchedulerEventTemplate` | `ng-template[scSchedulerEventTemplate]`         | How an event looks, in every view                                                                                                                                                                                                                    |
| `ScSchedulerEvent`         | `button[scSchedulerEvent], a[scSchedulerEvent]` | The event's root: a line (month), a bar (all day, over days), a block (time grid), a row (agenda). `--sc-scheduler-event`: its colour                                                                                                                |
| `ScSchedulerEventTime`     | `time[scSchedulerEventTime]`                    | Its times in the app's language ("10:00 – 11:30 AM"; over days, with the dates; a month's line, its start; a bar, nothing)                                                                                                                           |
| `ScSchedulerMoreTemplate`  | `ng-template[scSchedulerMoreTemplate]`          | A crowded day: `let-count`, `let-day="day"`                                                                                                                                                                                                          |
| `ScSchedulerMore`          | `button[scSchedulerMore]`                       | Opens the day (`[scSchedulerMore]="day"`). Write its text                                                                                                                                                                                            |

## Dates and times

Everything is [Temporal](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Temporal): events start and end as `Temporal.ZonedDateTime`, the date shown is a `Temporal.PlainDate`. Events are placed in `timeZone` (the user's by default), so an event from another zone shows at its local time. Dates, times and the title are written by `Intl` in the app's language (`LOCALE_ID`), and the week starts on the locale's first day.

## Rows of days: lines and bars

A month's week and the all-day row are laid out the same way (`layoutRow`): each event a piece across its days in the row, on the first lane free — bars first, longer first, then by start. An event all day, or over more than one day, is a bar; it goes on into the next week, with square ends where it continues. A day with more than `maxEvents` gives its last lane to your "more" (a bar over a crowded day goes there too). In the DOM, a piece is in the cell of its first day in the row (the cells are `display: contents`, so the piece spans the next columns): a screen reader finds it on the day it starts in that week.

## Creating and moving

- `pickable`: a click on an empty time or day picks a slot (`slotMinutes`, or the day, all day); a drag over several picks them all; in the hours, with the keyboard, a slot cursor (↑ ↓ a slot, ← → a day, Shift + ↓ longer, Enter picks, each step read out). `(slotPick)` gets `{ start, end, allDay }`.
- `editable`: an event dragged moves (by `slotMinutes`; to another day too; whole days in the month and the all-day row), dragged by its bottom edge (a time block) ends sooner or later; Alt with the arrows does the same from the keyboard. `(eventChange)` gets `{ event, start, end }`; the scheduler shows `events`, so it moves once you save it (it goes back if you don't). While dragged, it is drawn where it would go (`preview`).
- Mouse and pen: a touch scrolls, and a tap stays a click. Escape during a drag puts it back. A drag never clicks the event it started on.

## Styling

- The views are framed as the style's boxes (`frame`); the day's number and the events' corners are the style's `scheduler` key (`day`, `event`) — square in lyra and sera.
- An event's colour: `--sc-scheduler-event` (the primary by default), mixed into the background so bars are opaque; a time block's start edge in the colour itself.
- Give the scheduler a height (`class="h-[40rem]"`) and the view `flex-1`: the time grid scrolls inside it. An hour's height: `--sc-scheduler-hour-height` on the time grid (`3rem`). A short event is placed at least half an hour high, so its line can be read.

## Accessibility

- The month is a `grid`: its rows are weeks, its column headers the weekdays (full names for screen readers). One Tab stop on its days (the date shown): ← → (mirrored right to left), ↑ ↓ a week, Home and End the week's ends, Page Up and Page Down a month (Shift: a year); moving past the month shows the next; Enter opens the day. A day's number is a button named by its full date (`aria-current="date"` today). Your events are Tab stops, in order.
- In the time grid, each day is a group named by its date, with its events in time order. The hours are a scroll region (one Tab stop) named by the period; hours and the now line are hidden from screen readers.
- The agenda: a list of days, each a list named by its date.
- Moves and resizes from the keyboard are read out (the new times, by `Intl`), and the keyboard stays on the event.
- The title is a polite live region: moving or switching the view is announced.
