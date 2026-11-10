# Toggle Group

Toggles sharing one value: the pressed items' values, an array (Base UI's ToggleGroup). One pressed at a time — or none — or several (`multiple`). The group holds the value: a `[formField]` (Signal Forms types it by the group) or `[(value)]`; each item carries its `value` (any type). In the look of the app's preset: the `toggleGroup` key (`group`, `item`'s place in it), the items' look the `toggle` key.

## Usage

```html
<div scToggleGroup variant="outline" multiple aria-label="Text formatting" [(value)]="formatting">
  <button scToggleGroupItem value="bold"><svg siBoldIcon></svg><span class="sr-only">Bold</span></button>
  <button scToggleGroupItem value="italic"><svg siItalicIcon></svg><span class="sr-only">Italic</span></button>
</div>
```

## Parts

| Part                | Selector                    | What it does                                                                                                                                         |
| ------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScToggleGroup`     | `div[scToggleGroup]`        | `role="group"`; `value` (an array); `multiple`; `variant`, `size`, `spacing` (2; 0 joins them), `orientation` for its items; `loopFocus`; `disabled` |
| `ScToggleGroupItem` | `button[scToggleGroupItem]` | A toggle: `value`, pressed when the group's value includes it (`aria-pressed`); `disabled`                                                           |

## Keyboard

One Tab stop (the pressed item, or the first): the arrow keys move between the items — Left and Right mirrored right to left, Up and Down when vertical — Home and End to the ends, wrapping at the ends (`loopFocus`, on by default); Space and Enter press. The CDK's `FocusKeyManager`, as Base UI's toggle group (`role="group"`).

**We follow Base UI here, not Angular Aria.** Angular Aria's Toolbar has the same keys, but it makes its host a `role="toolbar"`: a toolbar is its own component (`scToolbar`), so the toggle group stays Base UI's group, with the CDK's key manager.

Inside a toolbar, use a widget group in the toolbar (`scToolbarWidgetGroup`): its items share the toolbar's Tab stop and arrow keys (Angular Aria's Toolbar). The two are the consumer's choice: a toggle group on its own, or a toolbar.

## Accessibility

- Each item a button with `aria-pressed`; its name stays the same as it toggles (its text, or an icon with `sr-only` text).
- Name the group: `aria-label` or `aria-labelledby`.
