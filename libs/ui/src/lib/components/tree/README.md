# Tree

A hierarchical, collapsible tree for nested data — file explorers, navigation, nested selection. Built on `@angular/aria`'s `Tree`, following the WAI-ARIA tree view pattern.

## Features

- **One Tab stop** — arrows move between visible items (roving focus)
- **Selection** — single or multiple, `[(value)]` two-way binding, explicit or follow-focus
- **Navigation mode** — `nav` marks the current item with `aria-current` instead of `aria-selected`
- **Correct hierarchy** — `aria-level`, `aria-expanded`, `role="group"`; items find their parent automatically
- **Type-ahead** — jump to an item by typing its label
- **Unlimited nesting**, indentation from the item's level (`padding-inline-start`, RTL-safe)
- **Icons are yours** — every icon is an `<svg>` in your template

## Quick Start

```html
<ul scTree aria-label="Project files">
  <li scTreeItem value="src" [expanded]="true">
    <div scTreeItemTrigger>
      <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
      <svg scTreeItemIcon siFolderIcon></svg>
      <span>src</span>
    </div>
    <ul scTreeItemGroup>
      <li scTreeItem value="main.ts">
        <div scTreeItemTrigger>
          <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
          <svg scTreeItemIcon siFileIcon></svg>
          <span>main.ts</span>
        </div>
      </li>
    </ul>
  </li>
</ul>
```

**Rules**

- Give the tree an accessible name (`aria-label` or `aria-labelledby`).
- `scTreeItemTrigger` is the **row**, not a button: use a `div` or `span`. The `li` is the focusable element and handles clicks and keys; a focusable element inside it would add a Tab stop per item.
- Each item needs a `value` unique within the tree.
- Nest children in `<ul scTreeItemGroup>` inside the parent `li`. No `[parent]` binding — items register with the enclosing group (or the tree) themselves.

## Selection

```html
<!-- Multiple selection -->
<ul scTree multi [(value)]="selected" aria-label="Produce">
  …
</ul>

<!-- Navigation: the current page gets aria-current="page" -->
<ul scTree nav [(value)]="current" aria-label="Documentation">
  …
</ul>
```

```typescript
readonly selected = signal<string[]>(['apple']);
readonly current = signal<string[]>(['installation']);
```

`value` is always an array of item values. With `selectionMode="explicit"` (default) Enter/Space/click select; with `"follow"` the selection follows focus. Set `[selectable]="false"` on an item to make it expand-only.

## Controlled Expansion

```html
<li scTreeItem value="src" [(expanded)]="srcOpen">…</li>
```

## Components

### ScTree — `ul[scTree]`

Root (`role="tree"`), hosts aria `Tree`.

| Input            | Type                         | Default      | Description                                       |
| ---------------- | ---------------------------- | ------------ | ------------------------------------------------- |
| `value`          | `V[]` (two-way)              | `[]`         | Selected item values                              |
| `multi`          | `boolean`                    | `false`      | Allow several selected items                      |
| `selectionMode`  | `'explicit' \| 'follow'`     | `'explicit'` | Select on Enter/Space/click, or follow focus      |
| `nav`            | `boolean`                    | `false`      | Navigation tree: use `aria-current` for selection |
| `currentType`    | `'page' \| 'step' \| …`      | `'page'`     | `aria-current` value in `nav` mode                |
| `disabled`       | `boolean`                    | `false`      | Disable the whole tree                            |
| `softDisabled`   | `boolean`                    | `true`       | Disabled items stay focusable                     |
| `orientation`    | `'vertical' \| 'horizontal'` | `'vertical'` | Arrow-key axis                                    |
| `wrap`           | `boolean`                    | `true`       | Wrap from last to first item                      |
| `typeaheadDelay` | `number`                     | `500`        | Type-ahead buffer (ms)                            |
| `class`          | `string`                     | `''`         | Additional CSS classes                            |

### ScTreeItem — `li[scTreeItem]`

An item (`role="treeitem"`), hosts aria `TreeItem`. The focusable element.

| Input        | Type                | Default | Description                                   |
| ------------ | ------------------- | ------- | --------------------------------------------- |
| `value`      | `V` (required)      | —       | Unique value                                  |
| `expanded`   | `boolean` (two-way) | `false` | Whether the children are shown                |
| `label`      | `string`            | text    | Type-ahead text (defaults to the item's text) |
| `disabled`   | `boolean`           | `false` | Disable the item                              |
| `selectable` | `boolean`           | `true`  | Whether the item can be selected              |
| `class`      | `string`            | `''`    | Additional CSS classes                        |

`level()` gives the item's depth, starting at 1 (same as `aria-level`).

### ScTreeItemTrigger — `div[scTreeItemTrigger]`, `span[scTreeItemTrigger]`

The visible row: indentation by level, hover, selected (`data-selected`) and disabled (`data-disabled`) styles. Shows the focus ring when its item has keyboard focus. Not focusable.

### ScTreeItemTriggerIcon — `svg[scTreeItemTriggerIcon]`

The chevron. Rotates when expanded (mirrored in RTL), invisible on leaf items to keep alignment, `aria-hidden`.

### ScTreeItemIcon — `[scTreeItemIcon]`

Decorative item icon (folder, file…), `aria-hidden`.

### ScTreeItemGroup — `ul[scTreeItemGroup]`

The children of an item (`role="group"`). Rendered the first time the item opens and kept afterwards.

**Animation.** Opening and closing animate the group's height (`auto` ↔ `0`, 200 ms ease-out) through a CSS transition — no Angular animation hooks:

- Works in browsers that support `interpolate-size` (enabled globally in the theme); others open and close instantly.
- Nothing animates on page load, only when an item's state changes.
- A closed group is `height: 0` and `visibility: hidden` once the transition ends, so its rows are out of the accessibility tree and not focusable; keyboard navigation already skips them.
- Off under `prefers-reduced-motion`.

Why not `animate.enter` / `animate.leave` on the rows (as accordion does)? Tree rows are projected content of one view, and inserting a group's rows makes Angular run the enter animation on every row of the tree, not just the new ones.

## Keyboard Navigation

| Key                  | Action                                                  |
| -------------------- | ------------------------------------------------------- |
| `Tab`                | Into / out of the tree (one stop, on the active item)   |
| `↓` / `↑`            | Next / previous visible item                            |
| `→`                  | Closed item: expand. Open item: move to its first child |
| `←`                  | Open item: collapse. Otherwise: move to the parent      |
| `Home` / `End`       | First / last visible item                               |
| `Enter` / `Space`    | Select (toggle in `multi`)                              |
| Printable characters | Type-ahead to the next matching item                    |

## Styling

All parts accept `class`. Useful hooks:

- `li[scTreeItem]`: `data-state="open|closed"`, `aria-selected`, `aria-current` (nav), `aria-disabled`
- `[scTreeItemTrigger]`: `data-selected`, `data-disabled`
- `ul[scTreeItemGroup]`: `data-state="open|closed"` (drives the height transition)

## Accessibility

- `role="tree"` / `treeitem` / `group`, `aria-level`, `aria-expanded`, `aria-selected` or `aria-current`, `aria-multiselectable` — all managed by `@angular/aria`.
- One Tab stop with roving focus; the focus ring is drawn on the focused item's own row only.
- Decorative icons are `aria-hidden`.

## How it works

`@angular/aria`'s `TreeItem` needs its `parent` (the tree, or the enclosing `TreeItemGroup`) when it registers in `ngOnInit`, and that input is required. Nested items are projected content, so they are created and initialised before `ScTreeItemGroup`'s own view — where the aria `TreeItemGroup` lives — is built. A view query is too late, and binding `[parent]` by hand put every item at the root.

- `ScAriaTreeItem` extends aria's `TreeItem` with `parent` made optional, so `ScTreeItem` can host it without re-exposing a required input (angular/angular#50510).
- `ScTreeItem` resolves the parent itself: `SC_TREE_ITEM_GROUP.adopt(item)` for nested items, the root `Tree` otherwise.
- `ScTreeItemGroup` queues adopted items until `ScTreeItemGroupRef` (on the `ngTreeItemGroup` template) hands it the aria group as soon as that is created. It also sets the group's `ownedBy` right away, since registration reads it before the view's bindings run.
