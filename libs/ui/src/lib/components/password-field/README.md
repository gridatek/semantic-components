# Password Field

A password field: its label, the input and a button to show or hide the password — the caret stays in the input — on your Signal Form, with descriptions and errors as in any field. Parts to add: a warning while Caps Lock is on, a strength meter, the rules met or not, a strong password generated. After Zag / Ark UI / Chakra (the parts, the toggle keeping the focus, no spellcheck, password managers ignored on demand), Mantine (the strength bar and the checklist).

## Usage

```html
<div scPasswordField #password="scPasswordField">
  <label scLabel>Password</label>
  <div scPasswordGroup>
    <input scPasswordInput [formField]="login.password" />
    <button scPasswordToggle>
      @if (password.visible()) {
      <svg siEyeOffIcon></svg>
      } @else {
      <svg siEyeIcon></svg>
      }
      <span class="sr-only">Show password</span>
    </button>
  </div>
  <p scFieldDescription>The one you signed up with.</p>
  <div scFieldErrors></div>
</div>
```

A new password, with what helps choosing it:

```html
<div scPasswordField #password="scPasswordField">
  <label scLabel>New password</label>
  <div scPasswordGroup>
    <input scPasswordInput autocomplete="new-password" [formField]="signup.password" />
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
  <button scPasswordGenerate [length]="20"><svg siWandSparklesIcon></svg> Generate</button>
</div>
```

## Parts

| Part                         | What it does                                                                                                                                                                                                                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `div[scPasswordField]`       | The whole field — a `scField` underneath (`id`, `orientation`, `invalid`, `disabled`): the label, `scFieldDescription`, `scFieldErrors` work as in any field. `visible` (two-way, `false`). `exportAs`: `visible()`, `capsLock()` |
| `div[scPasswordGroup]`       | The box around the input and the toggle: one border, one focus ring, red when invalid                                                                                                                                             |
| `input[scPasswordInput]`     | Hidden, or text while visible. `autocomplete` (`current-password`, `new-password`, `off`), `ignorePasswordManagers` (a key, a code). Never spellchecked, capitalised or corrected. Signal Forms `[formField]`                     |
| `button[scPasswordToggle]`   | Shows or hides: `aria-pressed`, `aria-controls` the input; a click leaves the caret in the input. The preset's button: `variant` (`ghost`), `size` (`icon-sm`). Your icons and its name inside                                    |
| `[scPasswordCapsLock]`       | Your warning, while Caps Lock is on and the input has the focus — a polite live region                                                                                                                                            |
| `div[scPasswordStrength]`    | `score` 0 (nothing yet) to 4 (strong) as four segments; a meter — name it (`aria-label`). From your rules or an estimator (zxcvbn-ts: its 0–4 as at least 1 once there is a password)                                             |
| `[scPasswordStrengthLabel]`  | The strength in your words: the meter's value                                                                                                                                                                                     |
| `ul[scPasswordRequirements]` | Your rules, read with the input (`aria-describedby`)                                                                                                                                                                              |
| `li[scPasswordRequirement]`  | A rule: `met` (`data-met`). Your text, your icons, and the state in words (`sr-only`)                                                                                                                                             |
| `button[scPasswordGenerate]` | A strong password into your form, shown: `length` (16), `lower`, `upper`, `digits`, `symbols` (all on; one at least of each; look-alikes left out) — from `crypto`. `variant` (`outline`), `size` (`sm`)                          |

## Keyboard and screen readers

- The toggle is a real button: Tab reaches it, Enter and Space show or hide; with the pointer, the focus stays in the input.
- The label names the input; descriptions, errors and the rules are read with it.
- The Caps Lock warning is announced as it appears; the meter's value is your word.
- The colours of the meter are 3:1 on the background; the word says it too.

## Since Password (rewritten 2026-10-29)

- **One field, not a provider**: `scPasswordField` is the field — `scPasswordProvider` is gone, and so are the `scField` around it and the `scInputGroup` and addon inside (now `scPasswordGroup`). `scPasswordInput` and `scPasswordToggle` keep their names. The page moved from `/docs/components/password` to `/docs/components/password-field`.
- **The toggle keeps the caret** in the input, names the input it controls, and takes `variant` / `size`.
- **The input is never spellchecked** — shown as text, a spellchecker could send it away.
- **New parts**: Caps Lock, strength, requirements, generate.
