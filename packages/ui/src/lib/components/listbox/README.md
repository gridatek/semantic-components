# Listbox

One option or several, chosen from a list always in view — like a native select with several rows. After ui-sdk's Listbox, on Angular Aria's (`ngListbox`, `ngOption`): the WAI-ARIA keyboard, ranges and typeahead. A `[formField]`.

## Architecture

```
div[scListbox]           ([(value)]: T | null — deselectable)     — exportAs scListbox: clear(), focus()
div[scListbox][multiple] ([(value)]: T[], in the list's order)    — exportAs scListbox: selectAll(), clear(), focus()
│   (both: activation, orientation, loop, virtualFocus, disabled, readonly)
├── div[scListboxGroup]                — role group, named by its label
│   ├── [scListboxGroupLabel]
│   └── [scListboxItem] [value]        — label (typeahead: its text by default), disabled
│       ├── [scListboxItemIcon]        — at its start; mirror; hidden from screen readers
│       └── [scListboxItemIndicator]   — shown while chosen
└── [scListboxSeparator]               — hidden from screen readers
```

The list holds options, groups and separators only: buttons, a search, an empty message go beside it.

## Usage

```html
<div scField>
  <div scLabel>Topping</div>
  <div scListbox [formField]="form.topping">
    @for (item of toppings; track item.value) {
    <div scListboxItem [value]="item.value">
      {{ item.label }}
      <span scListboxItemIndicator><svg siCheckIcon></svg></span>
    </div>
    }
  </div>
</div>
```

## Choosing

- `activation`: `automatic` — the arrows, Home, End and typing choose (with several, a press replaces and Ctrl adds); `manual` — they only move, Space, Enter or a click chooses (toggles, with several). One value: automatic by default; several: manual.
- `deselectable` (one value): the chosen option, pressed again, is no longer chosen. Without it, the value is never emptied by the keyboard or a click — only by `clear()` or the form.
- Several: Shift + arrow, Shift + click, Shift + Space a range (crossing groups, skipping disabled options); Ctrl + Shift + Home / End to the ends; Ctrl + A all (again: none). The value is in the list's order.
- Values are any type: primitives, or the same objects in the options and the value.
- `orientation="horizontal"`: ← → move, as the text reads. `loop` (on by default): the arrows wrap.
- `disabled` options are skipped by the arrows, typing and ranges; a `disabled` list is out of the Tab order; `readonly` is browsable, not changed.
- In Signal Forms, `required()` doesn't count an empty array as empty: `minLength(path, 1)`.

## Focus

One Tab stop: the chosen option (or the first). `virtualFocus`: focus stays on the list, which points at the option under it (`aria-activedescendant`). The option under focus shows only while the list has focus or a pointer is over it. The chosen option is scrolled into view at first, and the one under focus as it moves.

## Look

The box is the style's `listbox` key (as its textarea: corners, border, background); the options, the indicator, the group labels and the separators are the style's combobox parts.

## Not here

Native form submission (`name`; Signal Forms only), `itemToValue` / `isItemEqualToValue`, virtualization, Page Up / Page Down, filtering (a Combobox or a Command), reordering (a Sortable List).
