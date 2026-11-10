# Switch Next

A switch: a native checkbox with `role="switch"` that draws itself (`appearance-none`) — its track, and its thumb as its `::before`. In the look of the app's preset: the `switch` key's `track` and `thumb`, from shadcn's (Base UI's `data-checked` / `data-unchecked` / `data-disabled` as `:checked` / `:not(:checked)` / `:disabled`; the thumb's size from the input's `data-size`). Alone, in a switch field beside its text, or in any field. Built beside [Switch](../switch/README.md), to compare.

## Usage

```html
<div scSwitchNextField>
  <input type="checkbox" scSwitchNext [formField]="form.airplane" />
  <label scLabel>Airplane Mode</label>
</div>
```

## Parts

| Part                | Selector                                           | What it does                                                                                                             |
| ------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `ScSwitchNextField` | `label[scSwitchNextField], div[scSwitchNextField]` | A switch beside its text (the `label` preset, normal weight): first, at the start; last, at the end. Optional            |
| `ScSwitchNext`      | `input[type="checkbox"][scSwitchNext]`             | The native input, drawn: `checked` (model, or `[formField]`), `size` (`default`, `sm`), `disabled`; invalid once touched |

## Accessibility

- A native checkbox with `role="switch"`: announced as a switch, on or off; Tab, Space. Nothing drawn beside it.
- Named by its label (a label field, or `scLabel` in a div field or `scField`), or `aria-label`; the name stays the same as it toggles.
- A description in its field is read with it (`aria-describedby`).
