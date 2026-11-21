# Date Time Picker

A date and a time typed in a [Date Time Input](../date-time-input/README.md), or picked in a popover beside it: the day in a [Calendar](../calendar/README.md), the time in the [Time Picker](../time-picker/README.md)'s columns — on the input's clock, locale and limits.

## Architecture

```
div[scDateTimePicker] (minuteStep, secondStep)
│  date() · minDate() · maxDate() · unavailable() · pickDate(value) · pick(part, value) · enabled(part, value) · close()
└── div[scPopoverProvider]
    ├── div[scInputGroup]
    │   ├── div[scDateTimeInput] ([formField], hourCycle, granularity, minDateTime, maxDateTime, unavailable…)
    │   └── div[scInputGroupAddon]
    │       └── button[scDateTimePickerTrigger] — your icon and its name
    └── ng-template[scPopoverPortal]
        └── div[scPopover] class="w-auto flex-row gap-0 p-0" — name it
            ├── div[scCalendar] initialFocus [value]="dtp.date()" [minDate] [maxDate] [unavailable] (valueChange)="dtp.pickDate($event)"
            └── div[scTimePickerColumns] [initialFocus]="false"
```

The value, the locale, the clock and the limits are the input's: put `[formField]` on it. The calendar is yours (its header, its buttons' names); give it the picker's `date()`, `minDate()`, `maxDate()` and `unavailable()` — the input's.

## Picking

A day picked in the calendar sets the input's date parts; a value picked in a column, its time's part — at once, as typing does: the value comes once both are there. The popover stays open for the other; Enter in a column, Escape or a click outside closes it, focus back on the trigger. It opens on the day (focus in the calendar), the columns at the time — as tall as the calendar, scrolling.

On the first or last day of the limits, the times outside them can't be picked; on a day outside them, none.

## API

### ScDateTimePicker — `div[scDateTimePicker]`, `#dtp="scDateTimePicker"`

| Input        | Type     | Default |
| ------------ | -------- | ------- |
| `minuteStep` | `number` | `1`     |
| `secondStep` | `number` | `1`     |
| `class`      | `string` | `''`    |

| Member                                    | Description                                            |
| ----------------------------------------- | ------------------------------------------------------ |
| `dateTimeInput()`                         | Its date-time input                                    |
| `date()`                                  | The calendar's day: the input's date parts, once whole |
| `minDate()`, `maxDate()`, `unavailable()` | For the calendar: the input's limits                   |
| `pickDate(value)`                         | The calendar's `(valueChange)`: the date parts set     |
| `pick(part, value)`                       | A time's part, set (the columns)                       |
| `enabled(part, value)`                    | A time can be picked on the day chosen                 |
| `close()`                                 | Closes the popover                                     |

### ScDateTimePickerTrigger — `button[scDateTimePickerTrigger]`

Opens and closes the popover: ghost in an input group (`buttonSize`), outline alone (`variant`). `aria-haspopup="dialog"`, `aria-expanded`; disabled with the input. Write its icon and name.

The time columns are the Time Picker's `scTimePickerColumns` (they work with either picker, through `SC_TIME_COLUMNS`); here `[initialFocus]="false"`, the calendar takes the focus.

## Left out

A range of date-times; time zones; a "Now" button (the Time Picker's is for a time alone).
