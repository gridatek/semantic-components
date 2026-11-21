# Time Picker Next

A time typed in a [Time Input](../time-input/README.md), or picked in columns — hour, minute, second, AM/PM — in a popover beside it: on the input's clock, locale and limits. For a range's end, how long it makes.

Being built next to the [Time Picker](../time-picker/README.md) (a list of times), which it will replace.

## Architecture

```
div[scTimePickerNext] (minuteStep, secondStep, startTime)
│  values() · enabled(part, value) · pick(part, value) · now() · close() · duration()
└── div[scPopoverProvider]
    ├── div[scInputGroup]
    │   ├── div[scTimeInput] ([formField], hourCycle, granularity, minTime, maxTime…)
    │   └── div[scInputGroupAddon]
    │       └── button[scTimePickerNextTrigger] — your icon and its name
    └── ng-template[scPopoverPortal]
        └── div[scPopover] — name it
            ├── div[scTimePickerNextColumns]
            │   └── div[scTimePickerNextColumn] — one per part, written from the locale
            ├── [scTimePickerNextDuration] — with startTime
            └── button[scTimePickerNextNow] — your text
```

The value, the locale, the clock and the limits are the time input's: put `[formField]` on it; the picker reads them from there.

## Usage

```html
<div scField>
  <label scLabel>Meeting time</label>
  <div scTimePickerNext>
    <div scPopoverProvider [origin]="anchor" alignment="start">
      <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
        <div scTimeInput [formField]="form.time"></div>
        <div scInputGroupAddon side="inline-end">
          <button scTimePickerNextTrigger>
            <svg siClockIcon></svg>
            <span class="sr-only">Choose a time</span>
          </button>
        </div>
      </div>
      <ng-template scPopoverPortal>
        <div scPopover class="w-auto p-0" aria-label="Choose a time">
          <div scTimePickerNextColumns></div>
        </div>
      </ng-template>
    </div>
  </div>
</div>
```

## The columns

One per part of the time input, in the locale's order (AM/PM first in Korean), the clock's left to right in any page. A pick sets that part at once, through the time input — as typing does: an hour alone leaves the value `null` until the minute is there. Outside `minTime` / `maxTime`, or before `startTime`, values are disabled: an hour with no minute left in range, the minutes of the hour picked.

The columns are written by `scTimePickerNextColumns`, from the locale — not markup of yours, so not styled from it either: an option's look is the style's (`timePicker.option`, as its select item).

## Keyboard

| Key                | Does                                           |
| ------------------ | ---------------------------------------------- |
| Arrow Up / Down    | The value before / after in the column: picked |
| Home / End         | The column's first / last value                |
| Arrow Left / Right | The column to the left / right, as they show   |
| Space              | Picks the focused value                        |
| Enter              | Picks it and closes                            |
| Escape             | Closes, focus back on the button               |

It opens on the value — each column scrolled to it — focus on the hour.

## API

### ScTimePickerNext — `div[scTimePickerNext]`, `#tp="scTimePickerNext"`

| Input        | Type                 | Default |
| ------------ | -------------------- | ------- |
| `minuteStep` | `number`             | `1`     |
| `secondStep` | `number`             | `1`     |
| `startTime`  | `Temporal.PlainTime` | —       |
| `class`      | `string`             | `''`    |

| Member                 | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `timeInput()`          | Its time input                                                |
| `values()`             | Each column's values                                          |
| `enabled(part, value)` | Some time with it falls within the limits                     |
| `pick(part, value)`    | Sets the time input's part                                    |
| `now()`                | The current time, on the steps — and closed                   |
| `close()`              | Closes the popover                                            |
| `duration()`           | From `startTime` to the value, in the locale's words; or `''` |

### ScTimePickerNextTrigger — `button[scTimePickerNextTrigger]`

Opens and closes the columns: ghost in an input group (`buttonSize`), outline alone (`variant`). `aria-haspopup="dialog"`, `aria-expanded`; disabled with the input. Write its icon and name.

### ScTimePickerNextColumns, ScTimePickerNextColumn

The columns, and one column — a listbox named in the locale's words (`Intl.DisplayNames`), its options `aria-selected` / `aria-disabled`. Written by the picker, not placed by you.

### ScTimePickerNextNow — `button[scTimePickerNextNow]`

The style's button (`variant` ghost, `size` sm): `now()`. Write its text.

### ScTimePickerNextDuration — `[scTimePickerNextDuration]`

`duration()` as its text (`Intl.DurationFormat`, short: "1 hr, 30 min"), `aria-live="polite"`.

## Left out

The list of times (the columns replace it); a clock face in the popover (Time Clock, on its own); a range as one value (two pickers, the end's `startTime`).
