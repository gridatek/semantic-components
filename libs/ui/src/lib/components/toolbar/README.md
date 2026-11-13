# Toolbar

A row of controls of any kind — buttons, toggles, selects, links, an input — with one Tab stop and the arrow keys between them. Angular Aria's Toolbar, with its names (the user's choice, for being generic: any widget, mixed in a group). The features follow Base UI's Toolbar (loopFocus, disabled items still focusable, a group, a separator, a link, an input last).

## Usage

```html
<div scToolbar aria-label="Formatting">
  <div scToolbarWidgetGroup multiple [(value)]="marks" aria-label="Marks">
    <button scToolbarWidget scToggle value="bold"><svg siBoldIcon></svg><span class="sr-only">Bold</span></button>
    <button scToolbarWidget scToggle value="italic"><svg siItalicIcon></svg><span class="sr-only">Italic</span></button>
  </div>
  <div scToolbarSeparator></div>
  <button scToolbarWidget scButton variant="ghost" size="sm">Save</button>
  <a scToolbarWidget scLink variant="link" size="sm" href="…">Edited 51m ago</a>
</div>
```

## Parts

| Part                   | Selector                    | Angular Aria         | What it does                                                                                                                              |
| ---------------------- | --------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `ScToolbar`            | `div[scToolbar]`            | `Toolbar`            | `role="toolbar"`, one Tab stop; `orientation`, `loopFocus` (Aria's `wrap`, on), `disabled`, `softDisabled` (on). The preset's `frame`     |
| `ScToolbarWidget`      | `[scToolbarWidget]`         | `ToolbarWidget`      | Any element made a stop in the toolbar; `disabled`. Its look and state are the part beside it                                             |
| `ScToolbarWidgetGroup` | `div[scToolbarWidgetGroup]` | `ToolbarWidgetGroup` | Widgets grouped, any mix; `disabled` for all. Holds its toggles' pressed values: `value` (an array, `[formField]` or two-way), `multiple` |
| `ScToolbarSeparator`   | `div[scToolbarSeparator]`   | —                    | A separator across the toolbar's direction                                                                                                |

A widget is `scToolbarWidget` beside the part that gives it its look: `scButton`, `scToggle` (in a widget group: its `value`), `scLink`, `scInput`, a trigger (`scMenuTrigger`, `scTooltipTrigger`, `scSelectTrigger`…).

## Keyboard

One Tab stop; the arrow keys move between the widgets — Left and Right mirrored right to left (CDK's `Directionality`: the page's, or a `dir="rtl"` section's with CDK's `Dir` directive), Up and Down when vertical — Home and End to the ends, wrapping (`loopFocus`). A disabled widget stays reachable, announced as disabled (`softDisabled`). An input: one at most, last — Left and Right also move its text cursor.

A toggle group on its own, outside a toolbar, is the Toggle Group (`scToggleGroup`): its own Tab stop and keys, Base UI's.
