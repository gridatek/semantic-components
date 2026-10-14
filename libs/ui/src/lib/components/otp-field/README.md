# OTP Field

A one-time password field, modelled on Base UI's OTP Field: one `<input>` per character, filled left to right, with paste, the code from an SMS, keyboard navigation and Signal Forms.

You write the markup and every piece of text — the inputs and their names, the separators' content; the parts add the behaviour, ARIA and default styles.

## Usage

```html
<div scOtpField [(value)]="code" (valueComplete)="verify($event)">
  <label scLabel>Verification code</label>
  <div scOtpFieldGroup>
    <input scOtpFieldInput />
    <input scOtpFieldInput aria-label="Digit 2 of 6" />
    <input scOtpFieldInput aria-label="Digit 3 of 6" />
    <div scOtpFieldSeparator>
      <svg siMinusIcon></svg>
    </div>
    <input scOtpFieldInput aria-label="Digit 4 of 6" />
    <input scOtpFieldInput aria-label="Digit 5 of 6" />
    <input scOtpFieldInput aria-label="Digit 6 of 6" />
  </div>
  <p scFieldDescription>We sent it to your phone.</p>
</div>
```

- The code is as long as there are inputs.
- `scOtpField` is a `scField` too: a label, `scFieldDescription` and `scFieldErrors` go inside it, around the `scOtpFieldGroup` row.
- The first input takes the field's id, so the `scLabel` names it; name the others with `aria-label`. Without a visible label, give the first one an `aria-label` too.
- Inputs next to each other are joined into one box; a separator splits them.

## Parts

| Part                  | Selector                 | Does                                                                                                                                                                                     |
| --------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScOtpField`          | `div[scOtpField]`        | The code, paste, Signal Forms. Composes `scField` (`id`, `orientation`, `class`): `role="group"`, `data-disabled`, `data-invalid` (invalid and touched). `data-filled`, `data-complete`. |
| `ScOtpFieldGroup`     | `div[scOtpFieldGroup]`   | The row of inputs and separators; joins neighbouring inputs.                                                                                                                             |
| `ScOtpFieldInput`     | `input[scOtpFieldInput]` | One character, on your `<input>`. `data-filled`; `aria-invalid` once the field is left invalid. The first: the field's `id`, `autocomplete="one-time-code"`.                             |
| `ScOtpFieldSeparator` | `[scOtpFieldSeparator]`  | Between inputs (`role="separator"`); write its content (an icon, a dash, a dot).                                                                                                         |

## `scOtpField`

- **Value**: `value` (two-way, a string as long as the code once complete), `valueComplete` (the code reached its full length: typed, pasted or autofilled).
- **Characters**: `validationType` — `numeric` (default, with a numeric keypad), `alpha`, `alphanumeric` or `none`; anything else is dropped, as is whitespace.
- **State**: `disabled`.
- **Forms**: `invalid`, `touched`, `touch` — set by `[formField]`. `touch` fires when focus leaves the field, not when it moves from one input to the next.

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

Once the field is left invalid, its inputs get `aria-invalid` and `scFieldErrors` shows the messages.

## Keyboard and input

- **A character**: fills the input — over what was there — and moves to the next. Focus always goes to the first empty input, so the code is entered in order.
- **Backspace**: clears the input, or the previous one if it is already empty. **Delete**: clears the input (the characters after it move back one).
- **← / →**: the previous / next input. **Home / End**: the first input / the first empty one (or the last).
- **Paste**: a code replaces the value, from the first input.
- **The code from an SMS** (iOS, Android): offered on the first input (`autocomplete="one-time-code"`) and spread over all of them when picked.

## Accessibility

- `scOtpField` has `role="group"` (from `scField`).
- The first input is named by the field's `scLabel` (it has the field's id); the others by their `aria-label` — e.g. "Digit 2 of 6". The library adds no text of its own.
- The inputs are described by the field's `scFieldDescription` / `scFieldErrors` (`aria-describedby`), and get `aria-invalid` once the field is left invalid.
- Disabled: every input is disabled and the row is dimmed.
