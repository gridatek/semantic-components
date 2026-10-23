# Dock

Your links and buttons in a bar, magnified by their distance to the pointer — and when focused — with labels, counts, dots and separators.

## Architecture

```
[scDock] (orientation; magnification — 1.6, 1 off; distance — 140 px)
├── a | button [scDockItem] — yours: href, routerLink, (click); grows near the pointer, and focused
│   ├── your icon
│   ├── [scDockLabel]     — its name, shown beside it on hover and focus
│   ├── [scDockBadge]     — a count, in its corner
│   └── [scDockIndicator] — the dot: open, current
└── [scDockSeparator]     — between groups
```

## Usage

```html
<nav scDock aria-label="Sections">
  <a scDockItem routerLink="/inbox" ariaCurrentWhenActive="page">
    <svg siInboxIcon></svg>
    <span scDockLabel>Inbox</span>
    <span scDockBadge>3<span class="sr-only"> unread</span></span>
  </a>
  <div scDockSeparator></div>
  <button scDockItem (click)="trash()">
    <svg siTrash2Icon></svg>
    <span scDockLabel>Bin</span>
  </button>
</nav>
```

Place the dock yourself (`fixed bottom-4 left-1/2 -translate-x-1/2`…).

## Magnification

Each item grows by its distance to the pointer along the dock — a smooth bell, `magnification` times at the pointer, none past `distance` — and really grows: its neighbours move aside, the dock grows from its base edge (`items-end`; vertical: `items-start`). Items are measured at rest, before any grows, so nothing shifts under the pointer. Focused from the keyboard, an item grows as if the pointer were on it. Touch does not magnify; nor does `prefers-reduced-motion`.

The items' size is `--dock-item` (`2.75rem`); set it with a class (`[--dock-item:3.5rem]`). Icons take half of an item.

## Accessibility

- Put it on a `nav` (named) for links, or `role="toolbar"` (named) for actions. Items are reached with Tab, as anywhere.
- The label is inside the item: its name, read once — shown beside it on hover and focus.
- A count is part of the name ("Mail 3"): add words if they help (`<span class="sr-only"> unread</span>`).
- The dot is decorative: mark the current link with `aria-current`.

## Not here

The launch bounce, dragging to reorder, a collapsed menu on small screens.
