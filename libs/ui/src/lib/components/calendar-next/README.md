# Calendar Next

The calendar, rebuilt: days, months and years in the app's language — every word from `Intl`, the week as the locale has it — one day, several, or a range; reached by the keyboard across months; a `[formField]`.

## Architecture

```
div[scCalendarNext] (mode, [(value)] / [formField], minDate, maxDate, unavailable, locale,
│                    firstDayOfWeek, numberOfMonths, showOutsideDays, fixedWeeks,
│                    showWeekNumbers, startView, disabled)
│  heading() · view() · focused() · previous() · next() · zoomOut() · goToToday() · clear()
├── div[scCalendarNextHeader]
│   ├── button[scCalendarNextPrevious]   — your icon and words
│   ├── button[scCalendarNextHeading]    — {{ cal.heading() }}: days → months → years
│   └── button[scCalendarNextNext]
├── ng-template[scCalendarNextDay] let-day — your content under a day's number (optional)
└── div[scCalendarNextFooter]
    ├── button[scCalendarNextToday]
    └── button[scCalendarNextClear]
```

## Usage

```html
<div scCalendarNext #cal="scCalendarNext" aria-label="Appointment" [(value)]="date">
  <div scCalendarNextHeader>
    <button scCalendarNextPrevious><svg siChevronLeftIcon></svg><span class="sr-only">Previous month</span></button>
    <button scCalendarNextHeading>{{ cal.heading() }}</button>
    <button scCalendarNextNext><svg siChevronRightIcon></svg><span class="sr-only">Next month</span></button>
  </div>
</div>
```

Name the previous and next buttons by `cal.view()` — month, year, or years.

## Value

| `mode`             | `value`                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- |
| `single` (default) | a `Temporal.PlainDate`                                                             |
| `multiple`         | `Temporal.PlainDate[]` — each day picked or unpicked                               |
| `range`            | `{ from, to }` — a preview runs to the pointer; picked before `from`, the two swap |

Empty, it is `null` (Signal Forms' empty: `required` works). A `[formField]`: `disabled`, `invalid`, `touched` come from the form, and it is touched when focus leaves it.

## Days that cannot be picked

- `minDate` / `maxDate` — kept in the month and year views too; the keys stop at them.
- `unavailable: (date) => boolean` — weekends, booked days. They can be focused (and read), not picked.

## Language

- `locale` (the app's by default): the day and month names, the heading, each day's full date — all from `Intl`.
- `firstDayOfWeek` (1 Monday – 7 Sunday): the locale's by default (`Intl.Locale` week info).

## Keyboard

One Tab stop: the focused day.

| Key               | Days                            | Months                 | Years            |
| ----------------- | ------------------------------- | ---------------------- | ---------------- |
| ← →               | a day (right to left: reversed) | a month                | a year           |
| ↑ ↓               | a week                          | three months           | three years      |
| Home / End        | the week's first / last day     | the row's first / last | —                |
| PageUp / PageDown | a month (Shift: a year)         | a year                 | twelve years     |
| Enter / Space     | picks                           | shows its days         | shows its months |

Focus crosses months by itself: the shown months follow it.

## Accessibility

- Each month is a `grid` named by its month; column headers say the days in full; each day says its full date ("Wednesday, October 14, 2026").
- Today is `aria-current="date"`; picked days `aria-selected`; unpicked-able ones `aria-disabled`.
- The heading is said when it changes (a polite live region).
- It is a `group`: name it (`aria-label` or `aria-labelledby`).

## Not here

Non-Gregorian calendars, picking a time, range length limits, sliding between months.
