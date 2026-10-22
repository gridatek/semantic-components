# Sortable List Next

The sortable list, rebuilt: your array, reordered — dragged by mouse, touch or pen, or lifted and moved by the keyboard, each step announced in your words; down, along, or as a grid.

## Architecture

```
[scSortableListNext] ([(value)]: T[], orientation: 'vertical' | 'horizontal' | 'grid', announce, disabled)
│  items() · move(item, index) · active() · dragging() · lifted()
└── [scSortableListNextItem]="item"   — an item: dragged, or lifted (data-dragging, data-lifted)
    └── [scSortableListNextHandle]    — optional: only it starts a drag
```

It shares its engine with the kanban board (`utilities/sortable`): a kanban is sortable lists, linked.

## Usage

```html
<p id="help" class="sr-only">Space lifts an item, the arrow keys move it, Space drops it, Escape puts it back.</p>

<ul scSortableListNext #list="scSortableListNext" [(value)]="items" [announce]="announce" aria-label="Priorities">
  @for (item of list.items(); track item.id) {
  <li [scSortableListNextItem]="item" aria-describedby="help" class="px-3 py-2">{{ item.label }}</li>
  }
</ul>
```

```ts
readonly items = signal<Item[]>([...]);

readonly announce = ({ type, item, position, count }: ScSortableListNextAnnouncement<Item>) =>
  ({
    lift: `Lifted ${item.label}, ${position} of ${count}.`,
    move: `${item.label}: ${position} of ${count}.`,
    drop: `Dropped ${item.label} at ${position} of ${count}.`,
    cancel: `${item.label} back at ${position} of ${count}.`,
  })[type];
```

## Value

- Your array, any type: a move replaces it (a new array), never changes your items.
- Render from `items()`: while an item is moved, it is the moving order; the value changes on the drop.
- `move(item, index)` moves one at once — for Move up / Move down buttons of yours.

## Orientation

| `orientation`        | Laid out                           | A drag goes before…                               | Lifted, moved by             |
| -------------------- | ---------------------------------- | ------------------------------------------------- | ---------------------------- |
| `vertical` (default) | down                               | the first item whose middle is below the pointer  | ↑ ↓                          |
| `horizontal`         | along a row (scrolls)              | the first item past the pointer, in reading order | ← → (reversed right to left) |
| `grid`               | your columns (`grid-cols-*` on it) | the first item after the pointer in reading order | ← → by one, ↑ ↓ by a row     |

## Pointer

- Mouse and pen: a press that moves a few pixels drags. Touch: a press held a moment, then moved (a quick swipe scrolls).
- The item follows the pointer; the others make room. Near the list's edges, it scrolls. Escape cancels.
- A press on the item's buttons, links or fields is theirs. With a handle, only the handle drags.

## Keyboard

| Key          | Does                                    |
| ------------ | --------------------------------------- |
| Space, Enter | lifts the focused item; again, drops it |
| arrows       | lifted: moves it (see the orientation)  |
| Home, End    | lifted: to the start, the end           |
| Escape       | lifted: back where it was               |
| Tab          | lifted: stays — drop or cancel first    |

## Accessibility

- Each item is a Tab stop; describe the keys once (`aria-describedby`). `disabled`: not Tab stops, not moved.
- `announce` puts each keyboard step into words — the library writes none.
- Name the list. The handle is decorative (`aria-hidden`): the keyboard lifts the item itself.
- Offer `move()` in buttons too: some can neither drag nor lift.

## Not here

Dragging between lists (the kanban board), animated shifting, nested lists, several items at once.
