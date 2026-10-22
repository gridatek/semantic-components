# Time Picker

A time — typed in a [time input](../time-input/README.md), or picked from a list of times in a popover: every `interval` minutes, within the input's `minTime` / `maxTime`, written in its locale and hour cycle.

## Architecture

```
div[scTimePicker] (interval)
│  times() · label(time) · pick(time)
└── div[scPopoverProvider]
    ├── div[scInputGroup]
    │   ├── div[scTimeInput] ([formField], locale, hourCycle, minTime, maxTime…)
    │   └── div[scInputGroupAddon]
    │       └── button[scTimePickerTrigger] — your icon and its name
    └── ng-template[scPopoverPortal]
        └── div[scPopover]
            └── div[scTimePickerList] — the times (a listbox): name it
```

The value, the locale and the limits are the time input's: put `[formField]` on it; the picker reads them from there.

## Usage

```html
<div scField>
  <label scLabel>Meeting</label>
  <div scTimePicker>
    <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
      <div scInputGroup>
        <div scTimeInput [formField]="form.meeting"></div>
        <div scInputGroupAddon align="inline-end">
          <button scTimePickerTrigger #trigger="scTimePickerTrigger">
            <svg siClockIcon></svg>
            <span class="sr-only">Choose a time</span>
          </button>
        </div>
      </div>
      <ng-template scPopoverPortal>
        <div scPopover class="w-auto p-0" aria-label="Choose a time">
          <div scTimePickerList aria-label="Times"></div>
        </div>
      </ng-template>
    </div>
  </div>
</div>
```

## API

### ScTimePicker — `div[scTimePicker]`, `#tp="scTimePicker"`

| Input      | Type     | Default |
| ---------- | -------- | ------- |
| `interval` | `number` | `30`    |
| `class`    | `string` | `''`    |

| Member         | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| `timeInput()`  | Its time input                                                            |
| `times()`      | The times in the list: from `minTime` (or midnight) to `maxTime`          |
| `label(time)`  | A time as the input's locale writes it                                    |
| `startIndex()` | Where the list opens: the value, the time before it, or the next from now |
| `pick(time)`   | The value — and closed                                                    |

### ScTimePickerTrigger — `button[scTimePickerTrigger]`

An icon button that opens and closes the list: ghost in an input group (`buttonSize`, the group's corners), outline alone (`variant`). `aria-haspopup="dialog"`, `aria-expanded`; disabled with the input.

### ScTimePickerList — `div[scTimePickerList]`

The times, as a listbox (Angular Aria): the value selected. It opens focused on the value — or the time before it, or the next time from now — scrolled into view. Arrows, Home / End and typing move; Enter, Space or a click picks.

## Accessibility

- The list closes on a pick, Escape or a click outside; focus goes back to the trigger, and the input is marked touched.
- Name the popover, the list and the icon-only trigger (`sr-only`).
