# Checkbox

A native checkbox in a checkbox field: the field draws the box (`ScCheckboxVisual`) beside it, in the look of the app's preset (the `checkbox` key's `visual`). A checkbox without its field is an error in dev mode — nothing would draw its box. Being rewritten as [Checkbox Next](../checkbox-next/README.md), which draws itself.

## Usage

```html
<label scCheckboxField>
  <input type="checkbox" scCheckbox [formField]="form.terms" />
  Accept terms and conditions
</label>

<div scCheckboxField>
  <input type="checkbox" scCheckbox [(checked)]="marketing" />
  <label scLabel>Marketing emails</label>
  <p scFieldDescription>Receive emails about new products.</p>
</div>
```

A checkbox with no text (a table row) is still in a field, named by `aria-label`:

```html
<div scCheckboxField>
  <input type="checkbox" scCheckbox aria-label="Select all" [checked]="all()" [indeterminate]="some()" (checkedChange)="selectAll($event)" />
</div>
```

## Parts

| Part               | Selector                                       | What it does                                                                                                    |
| ------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `ScCheckboxField`  | `label[scCheckboxField], div[scCheckboxField]` | Draws the box; lays out the checkbox and its text (the `label` preset, normal weight), or label and description |
| `ScCheckbox`       | `input[type="checkbox"][scCheckbox]`           | The native input, transparent over the box: `checked` (model, or `[formField]`), `indeterminate`, `disabled`    |
| `ScCheckboxVisual` | `span[scCheckboxVisual]`                       | The box and its check or minus (`data-checked`, `data-indeterminate`, `data-state`); placed by the field        |

Invalid once touched (`aria-invalid`, from Signal Forms). The field sets `data-state` (`checked`, `unchecked`, `indeterminate`) and `data-disabled`.

## Accessibility

- A native checkbox: Tab, Space; indeterminate is announced as mixed. The drawn box is `aria-hidden`.
- Named by its label (a label field, or `scLabel` in a div field — `for` is set), or `aria-label`.
- A description in the field is read with the checkbox (`aria-describedby`).
