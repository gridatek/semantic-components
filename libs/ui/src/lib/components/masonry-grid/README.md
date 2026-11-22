# Masonry Grid

Items of any height packed into columns by width, the source order kept for reading and Tab — laid out again whenever anything changes size, the moves animated; native where the browser can. Rewritten 2026-11-22 after masonic, MUI and CSS `grid-lanes`.

## Architecture

```
ul | ol | div [scMasonryGrid] (columnWidth — 240 px · maxColumns · sequential; gaps: your classes)
└── li | div [scMasonryGridItem] (span — 1)
```

## Usage

```html
<ul scMasonryGrid [columnWidth]="200" class="gap-4">
  @for (photo of photos; track photo.src) {
  <li scMasonryGridItem><img [ngSrc]="photo.src" [alt]="photo.alt" … /></li>
  }
  <li scMasonryGridItem [span]="2">A featured card, two columns wide.</li>
</ul>
```

## Layout

- **Columns:** as many of at least `columnWidth` as fit the grid's content width (masonic's and `grid-lanes`' rule) — at most `maxColumns` (masonic's `maxColumnCount`). No breakpoints.
- **Gaps:** your classes (`gap-4`, `gap-x-6 gap-y-2`), read from the page — the same ones `grid-lanes` uses. The grid's padding is kept.
- **Order:** each item, in the source's order, goes into the shortest column — the first of the columns within 1em of it (`grid-lanes`' `fit-tolerance`), so near-equal columns don't send the reading order zig-zagging — or, `sequential` (MUI's name), into the next column in turn. `span` makes an item as many columns wide.
- **Before it is measured** — on the server, at the first paint — it is a plain CSS grid of the same columns, gaps and spans: rows, never a pile (MUI and Dice UI ask for default sizes instead). Then it lays out in three passes — every width written, every height read (one reflow), every place written — as `translate`, physical (right to left converted), animated once placed (not under reduced motion).
- **Again** whenever the grid or an item changes size (an image loading, text wrapping, the window) and when items come or go — in the page's order, whatever order they registered in.
- **Native:** where the browser has `display: grid-lanes`, it lays out the shortest-column grid itself (`data-native` on the grid); `sequential` is always ours.
- What the browser alone shows (the measured layout, native) is written on the elements, never bound: the server's render and hydration agree.

## State

Read: `columns()` (the count laid out), `native()`.

## Accessibility

- When the items are a list, use `ul` (or `ol`) and `li`: the grid adds no roles.
- The order on screen follows the source, row by row — the order of reading and of Tab: keep the source in the order it should be read.

## Not here

Virtualization for very long lists (masonic's), breakpoint objects (`columnWidth` instead), stamps (Desandro's), filtering and sorting animations, dragging to reorder.
