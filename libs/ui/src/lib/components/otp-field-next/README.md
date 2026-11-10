# OTP Field Next

A one-time code, one real `<input>` per character (Base UI's OTP Field), in shadcn's Input OTP look for each style (the `otpField` preset key: `group`, `input`, `separator`). Built beside [OTP Field](../otp-field/README.md), to compare.

## Usage

```html
<div scField>
  <label scLabel>Verification code</label>
  <div scOtpFieldNext [formField]="otpForm.code">
    <div scOtpFieldNextGroup>
      <input scOtpFieldNextInput />
      <input scOtpFieldNextInput aria-label="Character 2 of 6" />
      <input scOtpFieldNextInput aria-label="Character 3 of 6" />
    </div>
    <div scOtpFieldNextSeparator><svg siMinusIcon></svg></div>
    <div scOtpFieldNextGroup>…</div>
  </div>
  <p scFieldErrors></p>
</div>
```

## Parts

| Part                      | Selector                     | What it does                                                                                                                                                                                     |
| ------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ScOtpFieldNext`          | `div[scOtpFieldNext]`        | The row and the code (`[formField]` or `[(value)]`), as long as its inputs. `validationType`, `normalizeValue`, `mask`, `readOnly`; `complete()`; `data-complete`, `data-filled`, `data-focused` |
| `ScOtpFieldNextGroup`     | `div[scOtpFieldNextGroup]`   | One chunk, its inputs joined into one box (separate boxes in sera)                                                                                                                               |
| `ScOtpFieldNextInput`     | `input[scOtpFieldNextInput]` | One character; the first takes the field's id and `autocomplete="one-time-code"`                                                                                                                 |
| `ScOtpFieldNextSeparator` | `[scOtpFieldNextSeparator]`  | Between chunks (`role="separator"`); its content yours                                                                                                                                           |

The label, description and errors go round the row, in a `scField` — as Base UI's OTP Field in a Field, shadcn's InputOTP in a Field. shadcn's slot is a div with a fake caret; ours a real input, its active look on `:focus`.

## Keyboard

Typing moves on, Backspace back, Delete clears; Left and Right move (mirrored right to left — the input's own direction, a `dir="rtl"` section too), Home and End to the ends; focus goes to the first empty input. A pasted or SMS-autofilled code fills them all.

Left out (Base UI): `autoSubmit`, `form` / `name` — native forms; Signal Forms only.
