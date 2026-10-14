# OTP Field

A one-time password field, modelled on Base UI's OTP Field: one `<input>` per character, filled left to right, with paste, the code from an SMS, keyboard navigation and Signal Forms.

You write the markup and every piece of text — the inputs and their names, the separators' content; the parts add the behaviour, ARIA and default styles.

## Usage

Used through Signal Forms: the code, its length, its state and its errors are the form's.

```html
<div scOtpField [formField]="otpForm.code">
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
  <p scFieldErrors></p>
</div>
```

```ts
readonly otpForm = form(signal({ code: '' }), (path) => {
  required(path.code, { message: 'Enter the code.' });
  minLength(path.code, 6, { message: 'Enter all 6 digits.' });
});
```

- **The length** is the schema's (`minLength`); write as many inputs. In development, a warning says when they differ.
- **Complete** is `otpForm.code().valid()` — with `required`: `minLength` lets an empty code through.
- **Disabled** is the schema's too: `disabled(path.code)`.
- `scOtpField` is a `scField`: a label, `scFieldDescription` and `scFieldErrors` go inside it, around the `scOtpFieldGroup` row.
- The first input takes the field's id, so the `scLabel` names it; name the others with `aria-label`. Without a visible label, give the first one an `aria-label` too.
- Inputs next to each other are joined into one box; a separator splits them.

## Parts

| Part                  | Selector                 | Does                                                                                                                                                                                              |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScOtpField`          | `div[scOtpField]`        | The code, paste, Signal Forms. Composes `scField` (`id`, `orientation`, `class`): `role="group"`, `data-disabled`, `data-invalid` (invalid and touched), `data-pending` (a server check running). |
| `ScOtpFieldGroup`     | `div[scOtpFieldGroup]`   | The row of inputs and separators; joins neighbouring inputs.                                                                                                                                      |
| `ScOtpFieldInput`     | `input[scOtpFieldInput]` | One character, on your `<input>`. `data-filled`; `aria-invalid` once the field is left invalid. The first: the field's `id`, `autocomplete="one-time-code"`.                                      |
| `ScOtpFieldSeparator` | `[scOtpFieldSeparator]`  | Between inputs (`role="separator"`); write its content (an icon, a dash, a dot).                                                                                                                  |

## `scOtpField`

- **Characters**: `validationType` — `numeric` (default, with a numeric keypad), `alpha`, `alphanumeric` or `none`; anything else is dropped, as is whitespace. Digits of any script are kept as ASCII digits ('٣', '३', '３' → '3'), so the code is always `0`–`9`.
- **Set by `[formField]`**: `value`, `disabled`, `invalid`, `touched`, `minLength` / `maxLength` (checked against the inputs); `touch` fires when focus leaves the field, not when it moves from one input to the next.

Once the field is left invalid, its inputs get `aria-invalid` and `scFieldErrors` shows the messages.

To check the code with a server, add `validateAsync` (or `validateHttp`) to the schema: it runs once the other validators pass; while it runs the field has `data-pending` and `pending()` is true; its errors show like the others. See the "Validation with a server call" example.

## Keyboard and input

- **A character**: fills the input — over what was there — and moves to the next. Focus always goes to the first empty input, so the code is entered in order.
- **Backspace**: clears the input, or the previous one if it is already empty. **Delete**: clears the input (the characters after it move back one).
- **← / →**: the input on that side — right to left (`dir="rtl"`), → is the previous one. **Home / End**: the first input / the first empty one (or the last).
- **Paste**: a code replaces the value, from the first input.
- **The code from an SMS** (iOS, Android): offered on the first input (`autocomplete="one-time-code"`) and spread over all of them when picked.

## Accessibility

- `scOtpField` has `role="group"` (from `scField`).
- The first input is named by the field's `scLabel` (it has the field's id); the others by their `aria-label` — e.g. "Digit 2 of 6". The library adds no text of its own.
- The inputs are described by the field's `scFieldDescription` / `scFieldErrors` (`aria-describedby`), and get `aria-invalid` once the field is left invalid.
- Disabled: every input is disabled and the row is dimmed.
