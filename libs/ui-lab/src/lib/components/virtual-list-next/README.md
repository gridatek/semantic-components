# Virtual List Next

The virtual list, rebuilt: a long list rendered only where it is seen — rows measured as they render, in a scrolling box or the page, down, along or in lanes.

## Architecture

```
[scVirtualListNext] (count, estimate, key, overscan, orientation, lanes, gap)
│  rows() · size() · range() · scrollToIndex(index, { align })
└── [scVirtualListNextRow]="row"   — a row: placed, measured, aria-posinset / aria-setsize
```

## Usage

```html
<ul scVirtualListNext #list="scVirtualListNext" [count]="contacts.length" [estimate]="56" aria-label="Contacts" class="h-96 overflow-y-auto">
  @for (row of list.rows(); track row.key) {
  <li [scVirtualListNextRow]="row">{{ contacts[row.index].name }}</li>
  }
</ul>
```

Render `rows()` — each `{ index, key, start, size, lane }` — and read your data by `row.index`. Track by `row.key`.

## Sizes

- `estimate`: a row's size before it is measured. Each row is measured as it renders, and again when it changes (an image loading, text wrapping); the list and its scrollbar follow.
- Sizes are kept by `key(index)` — by default the index; give your items' ids when the list can change order or have rows put in.
- A row starting above the view grows or shrinks: the view keeps its place.

## What scrolls

- Give it a size and an overflow (`h-96 overflow-y-auto`): it scrolls itself.
- Without: it takes its full size, and the box around it — or the page — scrolls.

## Layout

| Input         | Does                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| `orientation` | `vertical` (default) or `horizontal` — along a row, from the right in right-to-left pages |
| `lanes`       | rows side by side (a grid): each in the lane that ends first                              |
| `gap`         | room between rows, and between lanes (px)                                                 |
| `overscan`    | rows rendered beyond each end of the view (5)                                             |

## Scroll to

`scrollToIndex(index, { align })`: `start`, `center`, `end`, or `auto` (only as far as needed). Rows measured on the way are corrected for, until it holds still.

## Accessibility

- Each row says its place in the whole list: `aria-posinset` of `aria-setsize` (`count`).
- A focused row stays rendered while scrolled away: focus is never lost.
- A list that scrolls itself needs keyboard access: focusable rows, or `tabindex="0"` on it — and a name.
- Find in page (Ctrl+F) sees only the rendered rows — a limit of every virtual list.

## With the infinite scroll

Put the virtual list in `scInfiniteScroll`, inside the box that scrolls: the infinite scroll asks for more near the end, the virtual list renders only what is seen.

## Not here

Sticky group headers, virtualizing columns too (2-D), bottom-anchored lists (a chat: the infinite scroll's `direction="start"`), server rendering of a window.
