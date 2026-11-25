# Number Group

A number input with its buttons, modelled on Base UI's NumberField — in a `scField`, as any input:

- **Typed and read in the locale** — currencies, percents, units, the locale's digits and separators ("1.234,50 €"); what you type is kept as typed and formatted when you leave the field or press Enter, within the bounds.
- **As the APG spin button**: a `spinbutton` with its value, bounds and value text; buttons out of the Tab order, `aria-disabled` at the bounds, and their steps read out.
- **Stepped** with the arrow keys (Shift: `largeStep`, Alt: `smallStep`), Page Up / Page Down, Home / End (the bounds), held buttons (they repeat), the mouse wheel (`allowWheelScrub`), or by dragging a scrub area (the pointer is locked, so no screen edge stops you).
- **A Signal Forms control**: `[formField]` on the group; `min`, `max`, `required` and `disabled` come from the schema.

You write the markup and every piece of text — labels, the buttons' names, icons; the parts add the behaviour, ARIA and default styles.

## Usage

```html
<div scField>
  <div scNumberScrubArea>
    <label scLabel>Quantity</label>
  </div>
  <div scNumberGroup [(value)]="quantity" [min]="1" [max]="10">
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

The group's `stacked` variant puts the buttons after the input, increment over decrement:

```html
<div scNumberGroup variant="stacked">
  <input scNumberInput />
  <button scNumberIncrement>…</button>
  <button scNumberDecrement>…</button>
</div>
```

The label, `scFieldDescription` and `scFieldErrors` are the `scField`'s, tied to the input as for any input. The scrub area sits round the label, outside the group: it reaches the group through the field (the group registers itself there). Without a visible label, give the input an `aria-label`.

## Parts

| Part                      | Selector                    | Does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScNumberInput`           | `input[scNumberInput]`      | The text field, a `spinbutton` with `aria-valuenow` / `-valuetext` (formatted) / `-valuemin` / `-valuemax`. Only what can be part of a number gets typed. Numeric or decimal keypad on phones.                                                                                                                                                                                                                                                                                                                                                              |
| `ScNumberGroup`           | `div[scNumberGroup]`        | The input and its buttons, joined, with one focus (or invalid) ring round them; it holds the value, bounds, steps and format (`exportAs: 'scNumberGroup'`) — see below. Its `scField`'s state follows it: `data-disabled`, `data-invalid` (invalid and touched); `data-readonly`. Reads out the value a button steps to (a polite `status`, cleared after 2 s). `variant`: `split` (default — decrement, input, increment, as written) or `stacked` (the input, then increment over decrement, each 24px tall, whatever the order written); `data-variant`. |
| `ScNumberIncrement`       | `button[scNumberIncrement]` | Steps up — repeatedly while held (after 400 ms, every 60 ms). Out of the Tab order (the arrow keys do it), keeps focus in the input; `aria-controls` the input. At the bound, `aria-disabled` (still found by a screen reader or a voice command); disabled with the field. Name it.                                                                                                                                                                                                                                                                        |
| `ScNumberDecrement`       | `button[scNumberDecrement]` | Steps down, likewise.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `ScNumberScrubArea`       | `[scNumberScrubArea]`       | Drag to change the value: one step per `pixelSensitivity` px (default 2), `orientation` `horizontal` (right increases) or `vertical` (up increases) — Base UI's `direction`, named as our other axes. Pointer, pen and touch; `data-scrubbing`.                                                                                                                                                                                                                                                                                                             |
| `ScNumberScrubAreaCursor` | `[scNumberScrubAreaCursor]` | Inside the scrub area: stands in for the locked mouse pointer while scrubbing (write an icon); wraps round the window's edges. Optional: with it, the pointer is locked (no screen edge stops the drag); without it, the real pointer drags and stays visible.                                                                                                                                                                                                                                                                                              |

## `scNumberGroup`

- **Value**: `value` (two-way, `number | null` — empty is null), `valueCommitted` (on blur, Enter, a step, the end of a scrub).
- **Bounds and steps**: `min`, `max`, `step` (1), `smallStep` (0.1, with Alt), `largeStep` (10, with Shift and Page Up / Down), `snapOnStep` (steps land on multiples of `step` from `min` or 0). From empty, a step goes to `min` (or 0).
- **Format**: in `LOCALE_ID` (the app's, or one provided for a section), `format` (`Intl.NumberFormatOptions`: `{ style: 'currency', currency: 'EUR' }`, `{ style: 'percent' }` — the value 0.5 is "50 %" —, `{ style: 'unit', unit: 'degree' }`, fraction digits…). Typing accepts the locale's separators, the other usual decimal separator ("1234.5" in German), the format's text in any of its forms ("45°", "45 deg"), and the locale's digits.
- **Interaction**: `allowWheelScrub` (the wheel steps the value while the input has focus), `disabled`, `readonly`.
- **Forms**: `required`, `invalid`, `touched`, `name`, `touch` — set by `[formField]`. With a `name`, a hidden input submits the value as a plain number (`1234.5`, not the "1.234,50 €" shown); a disabled field submits nothing.
- **Methods**: `increment(amount?)`, `decrement(amount?)`, `setValue(value)`, `toMin()`, `toMax()`, `focus(options?)` (the input), `formatValue(value)`, `parse(text)`; `canIncrement()`, `canDecrement()`, `formattedValue()`.

## Signal Forms

```html
<div scField>
  <label scLabel>Quantity</label>
  <div scNumberGroup [formField]="orderForm.quantity">…</div>
  <p scFieldErrors></p>
</div>
```

```ts
readonly orderForm = form(this.order, (path) => {
  required(path.quantity);
  min(path.quantity, 1);
  max(path.quantity, 100);
});
```

The input gets `aria-invalid` once the field is touched and invalid. Give the validators a `message`; the field's `<p scFieldErrors></p>` describes the input. `focusBoundControl()` focuses the input.

## History

- **2026-11-19: Number Field → Number Group.** In this library a Field is `scField` (a label, a control and its text); the root `scNumberField` — a `scField` of its own and the value control — is gone: the group holds the value, the consumer's `scField` the label and text, as for any input. Parts renamed `scNumberField…` → `scNumber…`; the scrub area (round the label, outside the group) reaches the group through the field's new `control`. The page moved to `/docs/components/number-group`.
