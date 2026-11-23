# Virtual List Next

A long list rendered only where it is seen — rows measured as they render, in a box or the page, down, along or in lanes; a chat that opens at its end. Our parts over TanStack Virtual's engine (`@tanstack/virtual-core`), as the Data Table over TanStack Table. Being built to replace the Virtual List of `@semantic-components/ui`.

## Architecture

```
[scVirtualListNext] (count, estimate, key, overscan, orientation, lanes, gap, anchor, follow, initialCount)
│  rows() · range() · size() · scrollToIndex(index, { align, behavior }) · scrollToEnd() · isAtEnd() · cancelScroll()
└── [scVirtualListNextRow]="row"   — placed (in its lane), measured; aria-posinset / aria-setsize; data-index
```

## Usage

```html
<ul scVirtualListNext #list="scVirtualListNext" [count]="contacts.length" [estimate]="56" aria-label="Contacts" class="h-96 overflow-y-auto">
  @for (row of list.rows(); track row.key) {
  <li [scVirtualListNextRow]="row">{{ contacts[row.index].name }}</li>
  }
</ul>
```

Render `rows()` — each `{ index, key, start, end, size, lane }` — and read your data by `row.index`. Track by `row.key`.

## Sizes

- `estimate`: a row's size before it is measured — the largest likely one (TanStack's advice). Each row is measured as it renders and again when it changes (ResizeObserver); the list and its scrollbar follow, and a row above the view settling keeps your place.
- `key`: your items' ids, when rows can move or come in above — sizes and the place you read follow the key, not the index.
- Margins on rows aren't measured: space rows with `gap`, or padding inside them. A padding that depends on the row's place (`first:pt-3`) moves content when rows come in above.

## What scrolls

- A size and an overflow (`h-96 overflow-y-auto`): it scrolls itself.
- Without: it takes its full size, and the box around it — or the page — scrolls it; where it starts in that box is kept up to date (TanStack's `scrollMargin`).
- It starts once it is shown (a lazy tab panel, a dialog).

## Chat

`anchor="end"`: it opens at the end; older rows come in above (with stable `key`s) and what you read stays put; new rows are followed while you are at the end (`follow`, on by default with `end`) — not while you read back. A wheel or a touch stops a scroll on its way.

## Before it measures

On the server and at the first paint it renders its first `initialCount` rows (10), stacked by `estimate` — the same on both sides, so hydration keeps them; the engine takes over in the browser.

## Accessibility

- Each row: `aria-posinset` of `aria-setsize`.
- The row with focus stays rendered as you scroll away (TanStack's `rangeExtractor`): focus is never lost.
- Name the list; with rows that can't take focus, give it `tabindex="0"` so the keys scroll it.
- Rows out of view aren't in the page: the browser's find doesn't see them.

## Not here

Sticky headers, saving and restoring the scroll across navigation (TanStack's `takeSnapshot`), two-axis grids (columns virtualized too), loading more (an Infinite Scroll, or `range()` near the end).
