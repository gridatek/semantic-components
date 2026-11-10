# Radio Group

One choice among several: native radios in the look of the app's preset (the `radioGroup` key: `group`, `item`, `dot` — the radio draws itself, its dot the `::before`). The group holds the choice: a `[formField]` or `[(value)]` on the group, a `value` on each radio.

## Usage

```html
<div scRadioGroup [formField]="spacingForm.spacing" aria-label="Spacing">
  <label scRadioField>
    <input scRadio value="default" />
    Default
  </label>
  <label scRadioField>
    <input scRadio value="comfortable" />
    Comfortable
  </label>
</div>
```

A radio field with a description is a `div`: `<label scLabel>` and `<p scFieldDescription>` inside, read with the radio.

## Parts

| Part           | Selector                                 | What it does                                                                                                                                                                                                    |
| -------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScRadioGroup` | `div[scRadioGroup]`                      | `role="radiogroup"`; the choice: `value` (a `[formField]`, or two-way); `orientation`; `disabled`. Checks the radio whose value matches, names its radios alike, invalid once touched (focus leaving the group) |
| `ScRadioField` | `label[scRadioField], div[scRadioField]` | A radio beside its text (a label), or its label and description (a div); the preset's label look, normal weight                                                                                                 |
| `ScRadio`      | `input[scRadio]`                         | A native radio (its own `type`), in the preset's look: `value` (its option, any type), `disabled`                                                                                                               |

## Why the group holds the choice

Signal Forms also binds a native radio itself — a `[formField]` on each radio, all on the same field (the Angular way). That still works here, but each radio then needs `type="radio"` written in the template: Angular's template type-checker types a native input's `[formField]` by the `type` it sees in the template (`string` for a radio), not by the part's own type — without it the input counts as text, and a field typed as a union (`'off' | 'all' | 'one'`) doesn't compile.

So the group is the control: `ScRadioGroup` implements `FormValueControl`, Signal Forms types the field by the group's `value` (any type, unions too), and the markup needs no `type` and one `[formField]` — as Base UI and shadcn, where the group holds the value.

```html
<!-- The Angular way: still works, with type="radio" on each -->
<div scRadioGroup aria-label="Spacing">
  <label scRadioField>
    <input type="radio" scRadio value="default" [formField]="form.spacing" />
    Default
  </label>
  …
</div>
```

## Accessibility

- Native radios, named alike by the group: one Tab stop, the arrows move the choice (mirrored right to left), Space picks.
- Name the group (a fieldset's legend, `aria-label` or `aria-labelledby`); each radio by its label.
- A description is read with its radio; invalid once the group is touched (`aria-invalid` on its radios).
