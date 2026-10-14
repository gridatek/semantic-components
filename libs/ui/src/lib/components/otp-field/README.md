# OTP Field

A one-time password field, modelled on Base UI's OTP Field: one box per character, filled left to right, with paste, keyboard navigation and Signal Forms.

You write the markup and every piece of text — the slots' names, the separators' content; the parts add the behaviour, ARIA and default styles.

## Usage

```html
<div scOtpField [(value)]="code">
  <label scLabel>Verification code</label>
  <div scOtpFieldGroup>
    <div scOtpFieldSlotGroup>
      <div scOtpFieldSlot aria-label="Digit 1 of 6"></div>
      <div scOtpFieldSlot aria-label="Digit 2 of 6"></div>
      <div scOtpFieldSlot aria-label="Digit 3 of 6"></div>
    </div>
    <div scOtpFieldSeparator>
      <svg siMinusIcon></svg>
    </div>
    <div scOtpFieldSlotGroup>
      <div scOtpFieldSlot aria-label="Digit 4 of 6"></div>
      <div scOtpFieldSlot aria-label="Digit 5 of 6"></div>
      <div scOtpFieldSlot aria-label="Digit 6 of 6"></div>
    </div>
  </div>
  <p scFieldDescription>We sent it to your phone.</p>
</div>
```

`scOtpField` is a `scField` too: a label, `scFieldDescription` and `scFieldErrors` go inside it, above and below the `scOtpFieldGroup` row. The number of slots is the length of the code.

## Parts

| Part                  | Selector                | Does                                                                                                                                                                  |
| --------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScOtpField`          | `div[scOtpField]`       | The code, the paste handling, Signal Forms. Composes `scField` (`id`, `orientation`, `class`): `role="group"`, `data-disabled`, `data-invalid` (invalid and touched). |
| `ScOtpFieldGroup`     | `div[scOtpFieldGroup]`  | The row of slot groups and separators.                                                                                                                                |
| `ScOtpFieldSlotGroup` | `[scOtpFieldSlotGroup]` | Slots joined into one box (`123` `456`).                                                                                                                              |
| `ScOtpFieldSlot`      | `div[scOtpFieldSlot]`   | One character: renders its input, the character and a caret. `data-active` (focused), `data-filled`, `data-invalid`. Name it with `aria-label`.                       |
| `ScOtpFieldSeparator` | `[scOtpFieldSeparator]` | Between slot groups (`role="separator"`); write its content (an icon, a dash, a dot).                                                                                 |

`ScOtpFieldSlotInput`, `ScOtpFieldSlotChar` and `ScOtpFieldSlotCaret` are used by the slot's own template; you don't write them.

## `scOtpField`

- **Value**: `value` (two-way, a string as long as the code once complete).
- **Input**: `inputMode` (`numeric`, the default — digits only, numeric keypad — or `text`), `disabled`.
- **Forms**: `invalid`, `touched`, `touch` — set by `[formField]`. `touch` fires when focus leaves the field, not when it moves from one slot to the next.

## Signal Forms

```html
<div scOtpField [formField]="otpForm.otp">
  <div scOtpFieldGroup>…</div>
  <p scFieldErrors></p>
</div>
```

```ts
readonly otpForm = form(this.model, (path) => {
  required(path.otp, { message: 'Enter the code.' });
  minLength(path.otp, 6, { message: 'Enter all 6 digits.' });
});
```

Once the field is left invalid, its slots get `data-invalid` and their inputs `aria-invalid`, and `scFieldErrors` shows the messages.

## Keyboard and input

- **A character**: fills the slot and moves to the next. Focus always goes to the first empty slot, so the code is entered left to right.
- **Backspace**: clears the slot, or moves to the previous one if it is already empty.
- **← / →**: move between slots.
- **Paste**: a whole code fills the slots from the first (spaces are dropped; with `inputMode="numeric"`, anything but digits).

## Accessibility

- `scOtpField` has `role="group"` (from `scField`).
- Each slot's input is named by the slot's `aria-label` — write one per slot, e.g. "Digit 1 of 6"; the library adds no text of its own.
- The inputs are described by the field's `scFieldDescription` / `scFieldErrors` (`aria-describedby`), and get `aria-invalid` once the field is left invalid.
- `inputmode` (numeric keypad) and `autocomplete="one-time-code"` (the code from an SMS can be offered).
- Disabled: every input is disabled and the row is dimmed.
