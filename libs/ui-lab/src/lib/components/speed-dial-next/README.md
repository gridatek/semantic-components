# Speed Dial Next

The speed dial, rebuilt: a floating button that opens a few actions — a menu — in a line or on a quarter circle, each named by its label, with the arrow keys of its direction.

## Architecture

```
scSpeedDialNext (open — two-way; direction)
├── button[scSpeedDialNextTrigger]    — your icon and name; aria-haspopup="menu", aria-expanded
├── [scSpeedDialNextList]             — the menu, placed by the direction; inert while closed
│   └── button[scSpeedDialNextAction] — a menu item: your icon, and…
│       └── [scSpeedDialNextLabel]    — its text: its name, shown beside it as a chip
└── div[scSpeedDialNextBackdrop]      — optional: dims behind while open, a click closes
```

## Usage

```html
<div scSpeedDialNext class="fixed end-6 bottom-6">
  <div scSpeedDialNextList>
    <button scSpeedDialNextAction (click)="edit()">
      <svg siPencilIcon></svg>
      <span scSpeedDialNextLabel>Edit</span>
    </button>
    <button scSpeedDialNextAction disabled (click)="remove()">
      <svg siTrash2Icon></svg>
      <span scSpeedDialNextLabel>Delete</span>
    </button>
  </div>
  <button scSpeedDialNextTrigger>
    <svg siPlusIcon class="transition-transform in-data-open:rotate-45"></svg>
    <span class="sr-only">Actions</span>
  </button>
</div>
```

Place the dial yourself (`fixed`, `absolute`…); the actions open from it.

## Direction

- `up` (default), `down`, `left`, `right`: in a line, labels beside (above for a row).
- `up-left`, `up-right`, `down-left`, `down-right`: on a quarter circle toward that corner — for a button in the opposite one. Labels are read, not shown.

## Behaviour

- The trigger — click, Enter, Space or an arrow — opens it on its first action; again, closes it.
- An action done, Escape, or a press outside closes it, focus back on the trigger; Tab closes it and goes on.
- A disabled action (`disabled`) stays reachable, marked `aria-disabled`; its clicks don't reach your handlers.
- `open` is two-way. `data-open` on the dial (and the list, the backdrop) styles what is open — `in-data-open:rotate-45` turns a plus into a ×.

## Keyboard

In the actions: the arrow of the direction — away from the trigger — is the next action, the opposite one the previous (round); on a quarter circle, ↓ → next and ↑ ← previous. Home, End: the first, the last. Escape closes.

## Accessibility

- Name the trigger (visually hidden text); the menu is named by it.
- An action's label is inside it — its name, read once. Without a label, name it with visually hidden text.
- The actions are a `menu` of `menuitem`s, with roving focus; closed, the menu is `inert`.

## Not here

Opening on hover (it opens by accident, and not on touch), tooltips (the label is one).
