# OTP Input

A one-time code, one real `<input>` per character (Base UI's OTP Field), in shadcn's Input OTP look for each style (the `otpInput` style key: `group`, `input`, `separator`).

## Usage

```html
<div scField>
  <label scLabel>Verification code</label>
  <div scOtpInput [formField]="otpForm.code">
    <div scOtpInputGroup>
      <input scOtpInputSlot />
      <input scOtpInputSlot aria-label="Character 2 of 6" />
      <input scOtpInputSlot aria-label="Character 3 of 6" />
    </div>
    <div scSeparator></div>
    <div scOtpInputGroup>…</div>
  </div>
  <p scFieldErrors></p>
</div>
```

## Parts

| Part              | Selector                | What it does                                                                                                                                                                                     |
| ----------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ScOtpInput`      | `div[scOtpInput]`       | The row and the code (`[formField]` or `[(value)]`), as long as its inputs. `validationType`, `normalizeValue`, `mask`, `readOnly`; `complete()`; `data-complete`, `data-filled`, `data-focused` |
| `ScOtpInputGroup` | `div[scOtpInputGroup]`  | One chunk, its inputs joined into one box (separate boxes in sera)                                                                                                                               |
| `ScOtpInputSlot`  | `input[scOtpInputSlot]` | One character; the first takes the field's id and `autocomplete="one-time-code"`                                                                                                                 |

The label, description and errors go round the row, in a `scField` — as Base UI's OTP Field in a Field, shadcn's InputOTP in a Field. shadcn's slot is a div with a fake caret; ours a real input, its active look on `:focus`.

## Keyboard

Typing moves on, Backspace back, Delete clears; Left and Right move (mirrored right to left — the input's own direction, a `dir="rtl"` section too), Home and End to the ends; focus goes to the first empty input. A pasted or SMS-autofilled code fills them all.

Left out (Base UI): `autoSubmit`, `form` / `name` — native forms; Signal Forms only.

Between chunks, the library's Separator: `<div scSeparator></div>` — the OTP input draws it as a short dash (`*:data-[slot=separator]:`); no separator part of its own.
