# Sortable

Your array, reordered — dragged by mouse, touch or pen, or lifted and moved by the keyboard, each step announced in your words; down, along, or as a grid. It replaced the Sortable List (2026-11-23), under a name that fits rows, grids and linked lists too.

## Architecture

```
[scSortable] ([(value)]: T[], orientation: 'vertical' | 'horizontal' | 'grid', announce, disabled)
│  items() · move(item, index) · active() · dragging() · lifted()
└── [scSortableItem]="item"   — an item: dragged, or lifted (data-dragging, data-lifted)
    └── [scSortableHandle]    — optional: only it starts a drag
```

## Linked lists

```
[scSortableGroup] ([(value)]: Record<key, T[]>, announce, disabled)
│  items(key) · move(item, key, index) · active() · over()
└── [scSortable]="key"   — one of its lists (data-over while an item is dragged over it)
    └── [scSortableItem]="item"
```

Items go from list to list — dragged, or lifted and carried across by the keyboard; the group's `announce` gets the item's list. A kanban board is this (see the Kanban Board recipe). The group lays nothing out: your row of columns is your class.

## Usage

```html
<p id="help" class="sr-only">Space lifts an item, the arrow keys move it, Space drops it, Escape puts it back.</p>

<ul scSortable #list="scSortable" [(value)]="items" [announce]="announce" aria-label="Priorities">
  @for (item of list.items(); track item.id) {
  <li [scSortableItem]="item" aria-describedby="help" class="px-3 py-2">{{ item.label }}</li>
  }
</ul>
```

```ts
readonly items = signal<Item[]>([...]);

readonly announce = ({ type, item, position, count }: ScSortableAnnouncement<Item>) =>
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
- The item follows the pointer; the others make room, gliding to their new places (150ms ease-out, as dnd-kit; measured where they settle, not where they glide from). Dropped, the item shows it a moment (700ms, Atlassian's flash: `data-dropped`). Neither under reduced motion. Near the list's edges, it scrolls. Escape cancels.
- A press on the item's buttons, links or fields is theirs. With a handle, only the handle drags.

## Keyboard

| Key          | Does                                    |
| ------------ | --------------------------------------- |
| Space, Enter | lifts the focused item; again, drops it |
| arrows       | lifted: moves it (see the orientation)  |
| Home, End    | lifted: to the start, the end           |
| Escape       | lifted: back where it was               |
| Tab          | lifted: stays — drop or cancel first    |

## Look

The item is a small box in the style (`frameSm`); its moments are the style's `sortable` key — `dragging` (raised), `lifted` (the keyboard's ring), `dropped` (the flash) — chosen as plain classes, so your classes win.

## Accessibility

- Each item is a Tab stop; describe the keys once (`aria-describedby`). `disabled`: not Tab stops, not moved.
- `announce` puts each keyboard step into words — the library writes none.
- Name the list. The handle is decorative (`aria-hidden`): the keyboard lifts the item itself.
- Offer `move()` in buttons too: some can neither drag nor lift.

## Not here

Nested lists, several items at once, a separate drag preview layer.
