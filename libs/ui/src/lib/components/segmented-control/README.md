# Segmented Control

One value from a short row of buttons — List or Grid, a view, a setting — an indicator sliding to the one checked. A radio group (one Tab stop), a `[formField]`. After ui-sdk's Segmented Control; in the look of the style's tabs.

## Architecture

```
div[scSegmentedControl] ([(value)]: T | null, orientation, loop, disabled, readonly)  — role radiogroup; exportAs: focus()
├── [scSegmentedControlIndicator]        — behind the checked item, sliding to it; aria-hidden
└── button[scSegmentedControlItem] [value]  — role radio, aria-checked; disabled
```

## Usage

```html
<div scField>
  <label scLabel>View</label>
  <div scSegmentedControl [formField]="form.view">
    <div scSegmentedControlIndicator></div>
    <button scSegmentedControlItem value="list">List</button>
    <button scSegmentedControlItem value="grid">Grid</button>
    <button scSegmentedControlItem value="board">Board</button>
  </div>
</div>
```

Icon-only items: an `sr-only` name in each.

## Behaviour

- One value, or none (`null`): then Tab enters on the first enabled item, and the indicator has no box.
- The arrows move and check — both ways in either `orientation`, left and right as the text reads — skipping disabled items, wrapping unless `loop` is off; Home and End to the ends; Space checks the item focused. Read-only: the arrows move focus only.
- A disabled control: its items disabled; a disabled item: skipped, not focused, not checked.
- The CDK's `FocusKeyManager`, as the Toggle Group.

## The indicator

Measured from the checked item, in the control (again when it or its items resize): `--sc-segmented-control-indicator-left`, `-top`, `-width`, `-height`, `-right`, `-bottom`. `data-activation-direction`: `none` at first — it doesn't slide into its first place — then `left`, `right`, `up` or `down`; it slides 200 ms (not with reduced motion).

## Look

The style's `segmentedControl` key, written from its tabs: `root` the tab list's bar, `item` a tab (checked: `aria-checked`), `indicator` the selected tab's raised look.

## Not here

Native form submission (`name`; Signal Forms only), a controller object (`focus()` on the part), several values (a Toggle Group).
