# Checkbox

A native checkbox that draws itself (`appearance-none`): its box, and its check or minus as its `::before` — the style's icon (lucide, hugeicons or phosphor) as a CSS mask. In the look of the app's preset: the `checkbox` key's `item` and `mark`. Alone (a table row), in a checkbox field beside its text, or in any field.

## Usage

```html
<label scCheckboxField>
  <input scCheckbox [formField]="form.terms" />
  Accept terms and conditions
</label>

<input scCheckbox aria-label="Select all" [checked]="all()" [indeterminate]="some()" (checkedChange)="selectAll($event)" />
```

## Parts

| Part              | Selector                                       | What it does                                                                                                |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `ScCheckboxField` | `label[scCheckboxField], div[scCheckboxField]` | A checkbox beside its text (the `label` preset, normal weight), or its label and description; optional      |
| `ScCheckbox`      | `input[scCheckbox]`                            | The native input, drawn: `checked` (model, or `[formField]`), `indeterminate` (a property only), `disabled` |

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

## Checkbox Group

`div[scCheckboxGroup]`: checkboxes sharing one value — the ticked ones' values, an array. The group holds it: a `[formField]` (Signal Forms types it by the group, a union array works) or `[(value)]`; each checkbox carries its `value` (any type). As Base UI's CheckboxGroup.

```html
<fieldset scFieldset>
  <legend scLegend>Allowed network protocols</legend>
  <div scCheckboxGroup [formField]="form.protocols" [allValues]="['http', 'https', 'ssh']">
    <label scCheckboxField><input scCheckbox parent /> All</label>
    <label scCheckboxField><input scCheckbox value="http" /> HTTP</label>
    <label scCheckboxField><input scCheckbox value="https" /> HTTPS</label>
  </div>
</fieldset>
```

| Part              | Selector               | What it does                                                                                                                                |
| ----------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScCheckboxGroup` | `div[scCheckboxGroup]` | `role="group"`; `value` (an array: `[formField]` or two-way); `allValues` for a parent; `disabled`; invalid once touched (focus leaving it) |

In a group, `ScCheckbox` takes `value` — its option, ticked when the group's value includes it — or `parent`: ticked when all of `allValues` are, mixed when only some are (or when its `indeterminate` says so: a nested group partly ticked), a click ticks all or none. A checkbox with neither stays a plain checkbox. (Its `value` is `valueInput` in the class: Signal Forms' `FormCheckboxControl` keeps a `value` property for value controls.)

A fieldset round the group names it (its legend), and its preset closes up to `gap-3` (shadcn's `has-[>[data-slot=checkbox-group]]`); a group alone is named by `aria-label` or `aria-labelledby`.
