# Masonry Grid Next

The masonry grid, rebuilt: items of any height packed into columns by width, the source order kept for reading and Tab; laid out again whenever anything changes size, the moves animated; native where the browser can.

## Architecture

```
ul | div [scMasonryGridNext] (columnWidth — 240 px · gap — 16 px · order: shortest | sequential)
└── li | div [scMasonryGridNextItem] (span — 1)
```

## Usage

```html
<ul scMasonryGridNext [columnWidth]="200" [gap]="12">
  @for (photo of photos; track photo.src) {
  <li scMasonryGridNextItem><img [src]="photo.src" [alt]="photo.alt" /></li>
  }
  <li scMasonryGridNextItem [span]="2">A featured card, two columns wide.</li>
</ul>
```

## Layout

- Columns: as many of at least `columnWidth` as fit the grid's width — no breakpoints.
- Each item, in the source's order, goes into the shortest column (`order="shortest"`) or the next one in turn (`sequential`); `span` makes it as many columns wide. So the order on screen is the source's, row by row — the order of reading and of Tab.
- Laid out again whenever the grid or any item changes size (an image loading, text wrapping, the window) and when items come or go. Items move into place (not under reduced motion).
- Positions are logical: right to left, it starts from the right.
- Native: where the browser has `display: grid-lanes`, it lays out the shortest-column grid itself (`data-native` on the grid); in turn is always ours.

## Accessibility

- When the items are a list, use `ul` and `li`: the grid adds no roles.
- The order on screen follows the source: keep the source in the order it should be read.

## Not here

Virtualization for very long lists, filtering and sorting animations, dragging to reorder.
