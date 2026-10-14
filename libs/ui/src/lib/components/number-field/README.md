# Number Field

A number field assembled from parts, modelled on Base UI's NumberField:

- **Typed and read in the locale** — currencies, percents, units, the locale's digits and separators ("1.234,50 €"); what you type is kept as typed and formatted when you leave the field or press Enter, within the bounds.
- **Stepped** with the arrow keys (Shift: `largeStep`, Alt: `smallStep`), Page Up / Page Down, Home / End (the bounds), held buttons (they repeat), the mouse wheel (`allowWheelScrub`), or by dragging a scrub area (the pointer is locked, so no screen edge stops you).
- **A Signal Forms control**: `[formField]` on the root; `min`, `max`, `required` and `disabled` come from the schema.

You write the markup and every piece of text — labels, the buttons' names, icons; the parts add the behaviour, ARIA and default styles.

## Usage

```html
<div scNumberField [(value)]="quantity" [min]="1" [max]="10">
  <div scNumberFieldScrubArea>
    <label scLabel>Quantity</label>
  </div>
  <div scNumberFieldGroup>
    <button scNumberFieldDecrement>
      <svg siMinusIcon></svg>
      <span class="sr-only">Decrease quantity</span>
    </button>
    <input scNumberFieldInput />
    <button scNumberFieldIncrement>
      <svg siPlusIcon></svg>
      <span class="sr-only">Increase quantity</span>
    </button>
  </div>
</div>
```

The buttons can go elsewhere — stacked after the input, say:

```html
<div scNumberFieldGroup>
  <input scNumberFieldInput class="h-12 text-start" />
  <div scNumberFieldGroup orientation="vertical">
    <button scNumberFieldIncrement>…</button>
    <button scNumberFieldDecrement>…</button>
  </div>
</div>
```

`scNumberField` is a `scField` too: the label, `scFieldDescription` and `scFieldErrors` are tied to the input. Without a visible label, give the input an `aria-label`.

## Parts

| Part                           | Selector                         | Does                                                                                                                                                                                           |
| ------------------------------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScNumberField`                | `div[scNumberField]`             | The value, bounds, steps and format (`exportAs: 'scNumberField'`). Composes `scField` (`id`, `orientation`, `class`): `data-disabled`, `data-invalid` (invalid and touched); `data-readonly`.  |
| `ScNumberFieldInput`           | `input[scNumberFieldInput]`      | The text field, a `spinbutton` with `aria-valuenow` / `-valuetext` (formatted) / `-valuemin` / `-valuemax`. Only what can be part of a number gets typed. Numeric or decimal keypad on phones. |
| `ScNumberFieldGroup`           | `div[scNumberFieldGroup]`        | The input and its buttons, joined. Groups nest: an `orientation="vertical"` group inside stacks its buttons, sharing the row's height, joined to the parts beside it.                          |
| `ScNumberFieldIncrement`       | `button[scNumberFieldIncrement]` | Steps up — repeatedly while held (after 400 ms, every 60 ms). Out of the Tab order (the arrow keys do it), keeps focus in the input; `aria-controls` the input. Name it.                       |
| `ScNumberFieldDecrement`       | `button[scNumberFieldDecrement]` | Steps down, likewise.                                                                                                                                                                          |
| `ScNumberFieldScrubArea`       | `[scNumberFieldScrubArea]`       | Drag to change the value: one step per `pixelSensitivity` px (default 2), `direction` `horizontal` (right increases) or `vertical` (up increases). Pointer, pen and touch; `data-scrubbing`.   |
| `ScNumberFieldScrubAreaCursor` | `[scNumberFieldScrubAreaCursor]` | Inside the scrub area: stands in for the locked mouse pointer while scrubbing (write an icon); wraps round the window's edges.                                                                 |

## `scNumberField`

- **Value**: `value` (two-way, `number | null` — empty is null), `valueCommitted` (on blur, Enter, a step, the end of a scrub).
- **Bounds and steps**: `min`, `max`, `step` (1), `smallStep` (0.1, with Alt), `largeStep` (10, with Shift and Page Up / Down), `snapOnStep` (steps land on multiples of `step` from `min` or 0). From empty, a step goes to `min` (or 0).
- **Format**: `locale` (the browser's by default), `format` (`Intl.NumberFormatOptions`: `{ style: 'currency', currency: 'EUR' }`, `{ style: 'percent' }` — the value 0.5 is "50 %" —, `{ style: 'unit', unit: 'degree' }`, fraction digits…). Typing accepts the locale's separators, the other usual decimal separator ("1234.5" in German), the format's text in any of its forms ("45°", "45 deg"), and the locale's digits.
- **Interaction**: `allowWheelScrub` (the wheel steps the value while the input has focus), `disabled`, `readonly`.
- **Forms**: `required`, `invalid`, `touched`, `name`, `touch` — set by `[formField]`. With a `name`, a hidden input submits the value as a plain number (`1234.5`, not the "1.234,50 €" shown); a disabled field submits nothing.
- **Methods**: `increment(amount?)`, `decrement(amount?)`, `setValue(value)`, `toMin()`, `toMax()`, `focus(options?)` (the input), `formatValue(value)`, `parse(text)`; `canIncrement()`, `canDecrement()`, `formattedValue()`.

## Signal Forms

```html
<div scNumberField [formField]="orderForm.quantity">…</div>
```

```ts
readonly orderForm = form(this.order, (path) => {
  required(path.quantity);
  min(path.quantity, 1);
  max(path.quantity, 100);
});
```

The input gets `aria-invalid` once the field is touched and invalid. Give the validators a `message` and put a `<p scFieldErrors></p>` inside: it describes the input. `focusBoundControl()` focuses the input.
