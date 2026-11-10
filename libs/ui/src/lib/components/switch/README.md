# Switch

A switch: a native checkbox with `role="switch"` that draws itself (`appearance-none`) — its track, and its thumb as its `::before`. In the look of the app's preset: the `switch` key's `track` and `thumb`, from shadcn's (Base UI's `data-checked` / `data-unchecked` / `data-disabled` as `:checked` / `:not(:checked)` / `:disabled`; the thumb's size from the input's `data-size`). In lyra it is square, track and thumb — not shadcn's, whose lyra switch is round: a deliberate divergence ([shadcn-style-reference.md](../../../../../../docs/shadcn-style-reference.md#deliberate-divergences)). Alone, in a switch field beside its text, or in any field.

## Usage

```html
<div scSwitchField>
  <input scSwitch [formField]="form.airplane" />
  <label scLabel>Airplane Mode</label>
</div>
```

## Parts

| Part            | Selector                                   | What it does                                                                                                             |
| --------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `ScSwitchField` | `label[scSwitchField], div[scSwitchField]` | A switch beside its text (the `label` preset, normal weight): first, at the start; last, at the end. Optional            |
| `ScSwitch`      | `input[scSwitch]`                          | The native input, drawn: `checked` (model, or `[formField]`), `size` (`default`, `sm`), `disabled`; invalid once touched |

## Accessibility

- A native checkbox with `role="switch"`: announced as a switch, on or off; Tab, Space. Nothing drawn beside it.
- Named by its label (a label field, or `scLabel` in a div field or `scField`), or `aria-label`; the name stays the same as it toggles.
- A description in its field is read with it (`aria-describedby`).
