# Date Range Picker

A range of days — picked in a calendar (the start, then the end), typed in a [Date Range Input](../date-range-input/README.md), or a preset — written as one span in the app's language. Its own part: the [Date Picker](../date-picker/README.md) is for a day or several days.

## Architecture

```
div[scDateRangePicker] ([(value)] / [formField], format, minDate, maxDate, unavailable, closeOnPick, confirm, disabled)
│  hasValue() · draft() · canApply() · days() · nights() · pick(value) · apply() · cancel() · canPick(date)
└── div[scPopoverProvider]
    ├── button[scInputButton][scDateRangePickerTrigger]  — alone: your button, your icon and the value as written
    │   (or div[scInputGroup] > div[scDateRangeInput] + an icon trigger — typed)
    └── ng-template[scPopoverPortal]
        └── div[scPopover]
            ├── div[scDateRangePickerPresets]
            │   └── button[scDateRangePickerPreset] [value] — your words
            ├── div[scCalendar] mode="range" initialFocus [value]="dp.draft()" (valueChange)="dp.pick($event)"
            ├── [scDateRangePickerDuration]               — the days; nights(): your words
            └── button[scDateRangePickerCancel] · button[scDateRangePickerApply] — confirm
```

## The value

`ScCalendarRange | null` — `{ from, to }` — through `[formField]` or `[(value)]`. Your trigger writes it: `injectFormatDate()` gives one span (`Intl.DateTimeFormat#formatRange`: "Oct 12 – 18, 2026"), a start alone as a day, in the user's locale and digits — or write your own format.

## Picking

The first click sets the start, the second the end; whole, it closes, focus back on the trigger. `confirm`: picks and presets are a draft (`draft()`, what the calendar shows) until Apply; Cancel, Escape or a click outside drop it. Give the calendar `minDate`, `maxDate` and `unavailable` too; a typed field takes them from the picker (through `SC_DATE_INPUT_HOST`).

## Closing

The same in every picker: each pick moves on to the next part (the start to the end), and the popover closes once the value is whole, focus back on the trigger. `[closeOnPick]="false"`: the picks still move on, but it stays open until Enter (keeping what is picked), Escape or a click outside. The arrow keys only browse. With `confirm`, nothing closes by itself: Apply (or Enter) keeps what is picked; Cancel, Escape or a click outside leave the value as it was before it opened.

## Duration

`days()` — both ends counted — and `nights()`, from the draft. `scDateRangePickerDuration` writes the days in the locale's words (`Intl.NumberFormat`, unit `day`: "5 days", "5 Tage"), said as it changes. `Intl` has no word for nights: write it from `nights()`.

## Presets

`scDateRangePickerPreset [value]`: a ready range, picked as the calendar's pick would be; `aria-pressed` while it is the draft. `scDateRangePresets(labels, today?)` gives the common ones — today, yesterday, the last 7 and 30 days, this month, last month — named by you.

## Accessibility

- The trigger: `aria-haspopup="dialog"`, `aria-expanded`, `aria-invalid` alone; an icon trigger needs an `sr-only` name.
- The presets are a group you name; the duration is a polite live region.
- Closing puts focus back on the trigger.
