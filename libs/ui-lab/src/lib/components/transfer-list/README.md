# Transfer List

One value — the chosen ids, in order, a form field — and two sides that are listboxes: select with the keys, move with Enter or a double-click, search, reorder.

## Architecture

```
[scTransferList] (items — yours: { id, label, disabled? } · value — two-way, a [formField]: the chosen ids)
├── [scTransferListPane]="'source' | 'target'" — a side: items() (searched), selected(), query
│   ├── input[type=checkbox][scTransferListSelectAll]
│   ├── input[scTransferListSearch]
│   └── [scTransferListListbox] — many selectable
│       └── [scTransferListOption]="item.id" [label] [disabled]
└── buttons: [scTransferListMove]="'target' | 'source'", [scTransferListMoveAll]=…, [scTransferListReorder]="-1 | 1"
```

## Usage

```html
<div scTransferList [items]="permissions" [formField]="form.permissions">
  <div scTransferListPane="source" #source="scTransferListPane">
    <input type="checkbox" scTransferListSelectAll aria-label="Select all available" />
    <span id="available">Available</span> {{ source.selected().length }} / {{ source.items().length }}
    <input scTransferListSearch aria-label="Search available" />
    <div scTransferListListbox aria-labelledby="available">
      @for (item of source.items(); track item.id) {
      <div [scTransferListOption]="item.id" [label]="item.label" [disabled]="item.disabled ?? false">{{ item.label }}</div>
      }
    </div>
    @if (!source.items().length) {
    <p>Nothing here</p>
    }
  </div>

  <div>
    <button scTransferListMove="target"><svg siChevronRightIcon></svg><span class="sr-only">Add selected</span></button>
    <button scTransferListMove="source"><svg siChevronLeftIcon></svg><span class="sr-only">Remove selected</span></button>
  </div>

  <div scTransferListPane="target" #target="scTransferListPane">…</div>
</div>
```

## Value

The chosen ids, in order — the source side is the rest of `items`, in theirs. A `[formField]`: `required`, `minLength`… in your schema; `disabled` from it. Moved items stay selected on their new side, so a move back is one key away.

## Keyboard

Each side is one Tab stop, a listbox (Angular Aria): ↑ ↓ Home End and typeahead (by `label`), Space selects, Shift extends, Ctrl+A all — and Enter moves the selection to the other side. A double-click moves one item.

## Buttons

- `Move`: the other side's selection, to its side; disabled with none.
- `MoveAll`: all the other side shows — searched, not disabled.
- `Reorder`: the chosen side's selection, up (−1) or down (1), together; disabled at the end.

## Accessibility

- Name each listbox (`aria-labelledby` its title), the search, the select-all, every button.
- A listbox holds options only: put an empty message after it, not in it.
- Disabled items are `aria-disabled`: reachable, never moved.

## Not here

Dragging between the sides, pagination, trees in a side.
