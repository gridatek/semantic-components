# Scroll Area

A native scroll container with custom scrollbars — shadcn's Scroll Area (Base UI's) in the look of the app's preset (`scrollArea` key: the thumb, shadcn's in each of the eight styles).

## Usage

```html
<div scScrollArea scFrame class="h-72 w-48">
  <div scScrollAreaViewport>
    <div scScrollAreaViewportContent class="p-4">…</div>
  </div>
  <div scScrollAreaScrollbar>
    <div scScrollAreaThumb></div>
  </div>
</div>
```

Sideways: `<div scScrollAreaScrollbar orientation="horizontal">`. Both ways: both scrollbars, and `<div scScrollAreaCorner></div>` where they meet.

## Parts

| Part                          | Selector                           | What it does                                                                                                                                           |
| ----------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ScScrollArea`                | `div[scScrollArea]`                | The root: `data-has-overflow-x` / `-y`, `data-overflow-{x,y}-{start,end}`, `data-scrolling`                                                            |
| `ScScrollAreaViewport`        | `div[scScrollAreaViewport]`        | What scrolls: its own scrollbar hidden, a tab stop while it overflows (focus ring); `--sc-scroll-area-overflow-{x,y}-{start,end}`; a `CdkScrollable`   |
| `ScScrollAreaViewportContent` | `div[scScrollAreaViewportContent]` | The content: at least as wide as what it holds, so a wide row overflows sideways                                                                       |
| `ScScrollAreaScrollbar`       | `div[scScrollAreaScrollbar]`       | `orientation` (`vertical`, `horizontal`); hidden while that axis doesn't overflow; a press on its track jumps there; `data-hovering`, `data-scrolling` |
| `ScScrollAreaThumb`           | `div[scScrollAreaThumb]`           | In the preset's look; as long as the share in view; dragged, it scrolls                                                                                |
| `ScScrollAreaCorner`          | `div[scScrollAreaCorner]`          | Where the two scrollbars meet: shown while both axes overflow                                                                                          |

## Keyboard and screen readers

- The browser scrolls it — the wheel, touch, the keyboard. Its own scrollbar is hidden; the scroll area draws them, for the pointer.
- While it overflows, the viewport is in the tab order with a focus ring: the arrow keys, Page Up / Down, Home and End scroll it. A box that doesn't scroll isn't a stop.
- Overlays opened from inside it (a select, a menu, a tooltip) follow its scroll: the viewport is a `CdkScrollable`.
- In a right-to-left page the vertical scrollbar is at the end (the left), and the horizontal one runs from the right.

## Not shadcn's

- **Every part in your markup**, as Base UI's anatomy: shadcn's ScrollArea renders the viewport, a vertical scrollbar and the corner itself.
- **`scScrollAreaViewportContent`** is Base UI's `ScrollArea.Content`, named after the viewport it sits in: a part's content takes its parent's name ([content-body-naming.md](../../../../../../docs/content-body-naming.md)).
- **No `--scroll-area-corner-height` / `-width` measured** (Base UI's): the corner is the scrollbars' size (`--sc-scroll-area-corner-size`, 0.625rem while both overflow).
- **The variables carry our `--sc-` prefix**: `--sc-scroll-area-overflow-{x,y}-{start,end}` are Base UI's `--scroll-area-overflow-{x,y}-{start,end}` — rename them in a snippet taken from shadcn.
