# Number

A number field assembled from parts, modelled on Base UI's NumberField:

- **Typed and read in the locale** — currencies, percents, units, the locale's digits and separators ("1.234,50 €"); what you type is kept as typed and formatted when you leave the field or press Enter, within the bounds.
- **Stepped** with the arrow keys (Shift: `largeStep`, Alt: `smallStep`), Page Up / Page Down, Home / End (the bounds), held buttons (they repeat), the mouse wheel (`allowWheelScrub`), or by dragging a scrub area (the pointer is locked, so no screen edge stops you).
- **A Signal Forms control**: `[formField]` on the root; `min`, `max`, `required` and `disabled` come from the schema.

You write the markup and every piece of text — labels, the buttons' names, icons; the parts add the behaviour, ARIA and default styles.

## Usage

```html
<div scField scNumber [(value)]="quantity" [min]="1" [max]="10">
  <div scNumberScrubArea>
    <label scLabel>Quantity</label>
  </div>
  <div scNumberGroup>
    <button scNumberDecrement>
      <svg siMinusIcon></svg>
      <span class="sr-only">Decrease quantity</span>
    </button>
    <input scNumberInput />
    <button scNumberIncrement>
      <svg siPlusIcon></svg>
      <span class="sr-only">Increase quantity</span>
    </button>
  </div>
</div>
```

`scField` on the same element ties the label to the input. Without a visible label, give the input an `aria-label`.

## Parts

| Part                      | Selector                    | Does                                                                                                                                                                                           |
| ------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScNumber`                | `div[scNumber]`             | The value, bounds, steps and format (`exportAs: 'scNumber'`). `data-disabled`, `data-readonly`, `data-invalid` (invalid and touched).                                                          |
| `ScNumberInput`           | `input[scNumberInput]`      | The text field, a `spinbutton` with `aria-valuenow` / `-valuetext` (formatted) / `-valuemin` / `-valuemax`. Only what can be part of a number gets typed. Numeric or decimal keypad on phones. |
| `ScNumberGroup`           | `div[scNumberGroup]`        | The input and its buttons, joined.                                                                                                                                                             |
| `ScNumberIncrement`       | `button[scNumberIncrement]` | Steps up — repeatedly while held (after 400 ms, every 60 ms). Out of the Tab order (the arrow keys do it), keeps focus in the input; `aria-controls` the input. Name it.                       |
| `ScNumberDecrement`       | `button[scNumberDecrement]` | Steps down, likewise.                                                                                                                                                                          |
| `ScNumberScrubArea`       | `[scNumberScrubArea]`       | Drag to change the value: one step per `pixelSensitivity` px (default 2), `direction` `horizontal` (right increases) or `vertical` (up increases). Pointer, pen and touch; `data-scrubbing`.   |
| `ScNumberScrubAreaCursor` | `[scNumberScrubAreaCursor]` | Inside the scrub area: stands in for the locked mouse pointer while scrubbing (write an icon); wraps round the window's edges.                                                                 |

## `scNumber`

- **Value**: `value` (two-way, `number | null` — empty is null), `valueCommitted` (on blur, Enter, a step, the end of a scrub).
- **Bounds and steps**: `min`, `max`, `step` (1), `smallStep` (0.1, with Alt), `largeStep` (10, with Shift and Page Up / Down), `snapOnStep` (steps land on multiples of `step` from `min` or 0). From empty, a step goes to `min` (or 0).
- **Format**: `locale` (the browser's by default), `format` (`Intl.NumberFormatOptions`: `{ style: 'currency', currency: 'EUR' }`, `{ style: 'percent' }` — the value 0.5 is "50 %" —, `{ style: 'unit', unit: 'degree' }`, fraction digits…). Typing accepts the locale's separators, the other usual decimal separator ("1234.5" in German), the format's text in any of its forms ("45°", "45 deg"), and the locale's digits.
- **Interaction**: `allowWheelScrub` (the wheel steps the value while the input has focus), `disabled`, `readonly`.
- **Forms**: `required`, `invalid`, `touched`, `name`, `touch` — set by `[formField]`.
- **Methods**: `increment(amount?)`, `decrement(amount?)`, `setValue(value)`, `toMin()`, `toMax()`, `formatValue(value)`, `parse(text)`; `canIncrement()`, `canDecrement()`, `formattedValue()`.

## Signal Forms

```html
<div scField scNumber [formField]="orderForm.quantity">…</div>
```

```ts
readonly orderForm = form(this.order, (path) => {
  required(path.quantity);
  min(path.quantity, 1);
  max(path.quantity, 100);
});
```

The input gets `aria-invalid` once the field is touched and invalid; write the messages.
