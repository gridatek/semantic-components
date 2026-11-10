# Checkbox

A native checkbox that draws itself (`appearance-none`): its box, and its check or minus as its `::before` — the style's icon (lucide, hugeicons or phosphor) as a CSS mask. In the look of the app's preset: the `checkbox` key's `item` and `mark`. Alone (a table row), in a checkbox field beside its text, or in any field.

## Usage

```html
<label scCheckboxField>
  <input type="checkbox" scCheckbox [formField]="form.terms" />
  Accept terms and conditions
</label>

<input type="checkbox" scCheckbox aria-label="Select all" [checked]="all()" [indeterminate]="some()" (checkedChange)="selectAll($event)" />
```

## Parts

| Part              | Selector                                       | What it does                                                                                                |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `ScCheckboxField` | `label[scCheckboxField], div[scCheckboxField]` | A checkbox beside its text (the `label` preset, normal weight), or its label and description; optional      |
| `ScCheckbox`      | `input[type="checkbox"][scCheckbox]`           | The native input, drawn: `checked` (model, or `[formField]`), `indeterminate` (a property only), `disabled` |

## Custom mark

The mark is a mask: set `--sc-checkbox-check` (and `--sc-checkbox-indeterminate`) to your image, on the checkbox or any element round it. Its outline only, in the preset's colour; the style's icon when unset.

```html
<fieldset scFieldset style="--sc-checkbox-check: url(/images/checkbox-heart.svg)">…</fieldset>
```

Base UI's `data-checked` is `:checked` here, and `:indeterminate` is filled too. A click clears the native `indeterminate`; the input sets it back to its own.

## Accessibility

- A native checkbox: Tab, Space; indeterminate is announced as mixed. Nothing drawn beside it: no hidden element.
- Named by its label (a label field, or `scLabel` in a div field or `scField` — `for` is set), or `aria-label`.
- A description in its field is read with it (`aria-describedby`); invalid once touched (`aria-invalid`).
