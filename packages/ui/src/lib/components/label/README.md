# Label

A control's name, shown beside it — shadcn's Label (and FieldLabel) in the look of the app's style (`label` key: shadcn's in each of the eight styles).

## Usage

```html
<div scField orientation="horizontal">
  <input scCheckbox />
  <label scLabel>Accept terms and conditions</label>
</div>
```

In a field it names the field's control by itself:

```html
<div scField>
  <label scLabel>Email</label>
  <input scInput type="email" />
</div>
```

A custom control — a select's or a combobox's trigger, a date or time input, a listbox, a rating, a segmented control, a token input, a color picker — registers itself with its field: the control is named by the label (`aria-labelledby`), and a click on the label focuses the control — a group's first focusable part — without pressing or opening it. A `for` ties only to a native element: the label keeps it for a trigger that is a `button` (a select's, a combobox's: it takes the field's id), and has none for a group, a listbox, a slider:

```html
<div scField>
  <label scLabel>Birthday</label>
  <div scDateInput [formField]="form.birthday"></div>
</div>
```

Around a field, it is a choice card — the whole card picks:

```html
<label scLabel>
  <div scField orientation="horizontal">
    <div scFieldContentWrapper>
      <div scFieldTitle>Enable notifications</div>
      <p scFieldDescription>You can enable or disable notifications at any time.</p>
    </div>
    <input scCheckbox />
  </div>
</label>
```

## Parts

| Part          | Selector         | What it does                                                                                                                                                                              |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScLabel`     | `label[scLabel]` | The style's `label` look; in a field, or around one, its `field` look too (choice card: border, corners, padding, focus ring, tint when checked). `for`, `id`: from the field when in one |
| `ScLabelText` | `[scLabelText]`  | A label's text inside another label (a switch's), so there is never a label in a label                                                                                                    |

## Keyboard and screen readers

- A real label: a press on it focuses or toggles its control. In a field it is linked by `for`; around a control, by wrapping it.
- A field's group of controls (radios, checkboxes) is named by the label's id (`<field id>-label`), not by `for`.
- A custom control is named the same way — with a `for` only at a button trigger: a press on the label focuses the control (a group's first focusable part), as a native label's would, without pressing it. A control of yours does it with `ɵregisterFieldControl()` in its constructor.
- A field inside a label (a choice card) is not a `group`: its texts name the control.

## Not shadcn's

- **One part for Label and FieldLabel**: the field look is added when the label is in a field or around one.
- **Checked tint by `:checked`** (`has-checked:`): our checkboxes and radios are native inputs; shadcn's FieldLabel reads Base UI's `data-checked`.
