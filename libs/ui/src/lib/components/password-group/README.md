# Password Group

A password input in its box, with a button to show or hide the password — the caret stays in the input — and one to generate a strong one, on your Signal Form. In a `scField`, as any input: its label, descriptions and errors. Parts to add: a warning while Caps Lock is on, a strength meter, the rules met or not. After Zag / Ark UI / Chakra (the parts, the toggle keeping the focus, no spellcheck, password managers ignored on demand), Mantine (the strength bar and the checklist).

## Usage

```html
<div scField>
  <label scLabel>Password</label>
  <div scPasswordGroup #password="scPasswordGroup">
    <input scPasswordInput [formField]="login.password" />
    <button scPasswordToggle>
      @if (password.visible()) {
      <svg siEyeOffIcon></svg>
      <span class="sr-only">Hide password</span>
      } @else {
      <svg siEyeIcon></svg>
      <span class="sr-only">Show password</span>
      }
    </button>
  </div>
  <p scFieldDescription>The one you signed up with.</p>
  <div scFieldErrors></div>
</div>
```

A new password, with what helps choosing it:

```html
<div scField>
  <label scLabel>New password</label>
  <div scPasswordGroup #password="scPasswordGroup">
    <input scPasswordInput autocomplete="new-password" [formField]="signup.password" />
    <button scPasswordGenerate [length]="20">
      <svg siWandSparklesIcon></svg>
      <span class="sr-only">Generate a password</span>
    </button>
    <button scPasswordToggle>…</button>
  </div>
  <p scPasswordCapsLock><svg siArrowBigUpIcon></svg> Caps Lock is on</p>
  <div scPasswordStrength [score]="score()" aria-label="Password strength">
    <span scPasswordStrengthLabel>{{ strength() }}</span>
  </div>
  <ul scPasswordRequirements>
    <li scPasswordRequirement [met]="long()">
      <svg siCheckIcon></svg> At least 12 characters
      <span class="sr-only">{{ long() ? '(met)' : '(not met)' }}</span>
    </li>
  </ul>
</div>
```

## Parts

| Part                         | What it does                                                                                                                                                                                                                                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `div[scPasswordGroup]`       | The box around the input and its buttons: one border, one focus ring, red when invalid. Holds `visible` (two-way, `false`). `exportAs`: `visible()`, `toggle()`                                                                                                                                       |
| `input[scPasswordInput]`     | Hidden, or text while visible. `autocomplete` (`current-password`, `new-password`, `off`), `ignorePasswordManagers` (a key, a code). Never spellchecked, capitalised or corrected. Signal Forms `[formField]`; its id and descriptions from the `scField` it is in                                    |
| `button[scPasswordToggle]`   | Shows or hides: `aria-controls` the input, `data-state` (`visible`, `hidden`); its name follows the state ("Show password", "Hide password") — not `aria-pressed`; a click leaves the caret in the input. The style's button: `variant` (`ghost`), `size` (`icon-sm`). Your icons and its name inside |
| `button[scPasswordGenerate]` | In the group, beside the toggle: a strong password into your form, shown — `length` (16), `lower`, `upper`, `digits`, `symbols` (all on; one at least of each; look-alikes left out), from `crypto`. `variant` (`ghost`), `size` (`icon-sm`). Your icon and its name                                  |
| `[scPasswordCapsLock]`       | In the `scField`: your warning, while Caps Lock is on and the field's input has the focus — a polite live region                                                                                                                                                                                      |
| `div[scPasswordStrength]`    | `score` 0 (nothing yet) to 4 (strong) as four segments; a meter — name it (`aria-label`). From your rules or an estimator (zxcvbn-ts: its 0–4 as at least 1 once there is a password)                                                                                                                 |
| `[scPasswordStrengthLabel]`  | The strength in your words: the meter's value                                                                                                                                                                                                                                                         |
| `ul[scPasswordRequirements]` | In the `scField`: your rules, read with its input (`aria-describedby`)                                                                                                                                                                                                                                |
| `li[scPasswordRequirement]`  | A rule: `met` (`data-met`). Your text, your icons, and the state in words (`sr-only`)                                                                                                                                                                                                                 |

## Keyboard and screen readers

- The toggle and the generator are real buttons: Tab reaches them, Enter and Space press them; with the pointer, the focus stays in the input.
- The `scField`'s label names the input; descriptions, errors and the rules are read with it.
- The Caps Lock warning is announced as it appears; the meter's value is your word.
- The colours of the meter are 3:1 on the background; the word says it too.

## History

- **2026-11-19: Password Field → Password Group.** In this library a Field is `scField` (a label, a control and its text); the root `scPasswordField`, a `scField` of its own, is gone. The input goes in your `scField`, as any input; `scPasswordGroup` (the box) holds the state (`[(visible)]`, `exportAs`); `scPasswordGenerate` moves into it, beside the toggle (an icon button); Caps Lock and the requirements find the input through the `scField` they are in. The page moved to `/docs/components/password-group`.
- **2026-10-29: Password rewritten** as Password Field: one field, not a provider (`scPasswordProvider` gone); the toggle keeps the caret, names the input it controls, takes `variant` / `size`; the input is never spellchecked; new parts: Caps Lock, strength, requirements, generate.
