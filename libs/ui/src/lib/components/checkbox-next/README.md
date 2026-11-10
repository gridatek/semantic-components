# Checkbox Next

A native checkbox that draws itself (`appearance-none`): its box, and its check or minus as its `::before` — the style's icon (lucide, hugeicons or phosphor) as a CSS mask. In the look of the app's preset: the `checkbox` key's `item` and `mark`. Alone (a table row), in a checkbox field beside its text, or in any field. Built beside [Checkbox](../checkbox/README.md), to compare.

## Usage

```html
<label scCheckboxNextField>
  <input type="checkbox" scCheckboxNext [formField]="form.terms" />
  Accept terms and conditions
</label>

<input type="checkbox" scCheckboxNext aria-label="Select all" [checked]="all()" [indeterminate]="some()" (checkedChange)="selectAll($event)" />
```

## Parts

| Part                  | Selector                                               | What it does                                                                                                |
| --------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `ScCheckboxNextField` | `label[scCheckboxNextField], div[scCheckboxNextField]` | A checkbox beside its text (the `label` preset, normal weight), or its label and description; optional      |
| `ScCheckboxNext`      | `input[type="checkbox"][scCheckboxNext]`               | The native input, drawn: `checked` (model, or `[formField]`), `indeterminate` (a property only), `disabled` |

Base UI's `data-checked` is `:checked` here, and `:indeterminate` is filled too. A click clears the native `indeterminate`; the input sets it back to its own.

## Accessibility

- A native checkbox: Tab, Space; indeterminate is announced as mixed. Nothing drawn beside it: no hidden element.
- Named by its label (a label field, or `scLabel` in a div field or `scField` — `for` is set), or `aria-label`.
- A description in its field is read with it (`aria-describedby`); invalid once touched (`aria-invalid`).
