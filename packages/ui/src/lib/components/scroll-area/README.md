# Scroll Area

A native scroll container with custom scrollbars — shadcn's Scroll Area (Base UI's) in the look of the app's style (`scrollArea` key: the thumb, in the theme's muted-foreground, 3:1 to be seen). The scrollbar as Base UI's: a track (the foreground at 12%), hidden at rest, fading in while the pointer is over the area and shown at once while it scrolls.

## Usage

```html
<div scScrollArea scFrame class="h-72 w-48">
  <div scScrollAreaViewport>
    <div scScrollAreaViewportContent class="p-4">…</div>
  </div>
</div>
```

A vertical scrollbar comes by default. Write your own and it takes its place — any `scScrollAreaScrollbar` or `scScrollAreaCorner` inside the root replaces the default, so write every scrollbar you want:

```html
<div scScrollArea scFrame class="h-72 w-96">
  <div scScrollAreaViewport>…</div>
  <div scScrollAreaScrollbar>
    <div scScrollAreaThumb></div>
  </div>
  <div scScrollAreaScrollbar orientation="horizontal">
    <div scScrollAreaThumb></div>
  </div>
  <div scScrollAreaCorner></div>
</div>
```

Sideways only: one `<div scScrollAreaScrollbar orientation="horizontal">`. Your own look: classes on your scrollbar and thumb (`class="w-1.5"`, `class="bg-primary"`).

## Parts

| Part                          | Selector                           | What it does                                                                                                                                                                             |
| ----------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScScrollArea`                | `div[scScrollArea]`                | The root: a vertical scrollbar by default, replaced by yours; `data-has-overflow-x` / `-y`, `data-overflow-{x,y}-{start,end}`, `data-scrolling`                                          |
| `ScScrollAreaViewport`        | `div[scScrollAreaViewport]`        | What scrolls: its own scrollbar hidden, a tab stop while it overflows (focus ring); `--sc-scroll-area-overflow-{x,y}-{start,end}`; a `CdkScrollable`                                     |
| `ScScrollAreaViewportContent` | `div[scScrollAreaViewportContent]` | The content: at least as wide as what it holds, so a wide row overflows sideways                                                                                                         |
| `ScScrollAreaScrollbar`       | `div[scScrollAreaScrollbar]`       | `orientation` (`vertical`, `horizontal`); hidden while that axis doesn't overflow; shown while hovered or scrolling; a press on its track jumps there; `data-hovering`, `data-scrolling` |
| `ScScrollAreaThumb`           | `div[scScrollAreaThumb]`           | In the style's look; as long as the share in view; dragged, it scrolls                                                                                                                   |
| `ScScrollAreaCorner`          | `div[scScrollAreaCorner]`          | Where the two scrollbars meet: shown while both axes overflow                                                                                                                            |

## Keyboard and screen readers

- The browser scrolls it — the wheel, touch, the keyboard. Its own scrollbar is hidden; the scroll area draws them, for the pointer.
- While it overflows, the viewport is in the tab order with a focus ring: the arrow keys, Page Up / Down, Home and End scroll it. A box that doesn't scroll isn't a stop.
- Overlays opened from inside it (a select, a menu, a tooltip) follow its scroll: the viewport is a `CdkScrollable`.
- In a right-to-left page the vertical scrollbar is at the end (the left), and the horizontal one runs from the right.

## Not shadcn's

- **The viewport in your markup**: shadcn's ScrollArea renders the viewport, a vertical scrollbar and the corner itself. Ours renders the scrollbar by default, which yours replace (Base UI's anatomy: every part yours); the viewport stays yours — it wraps your content.
- **Its state is `ScScrollAreaState`**, provided by the root: what the parts inject (the root renders the default scrollbar, which reads it — one class for both would import itself).
- **`scScrollAreaViewportContent`** is Base UI's `ScrollArea.Content`, named after the viewport it sits in: a part's content takes its parent's name ([content-body-naming.md](../../../../../../docs/principles/content-body-naming.md)).
- **No `--scroll-area-corner-height` / `-width` measured** (Base UI's): the corner is the scrollbars' size (`--sc-scroll-area-corner-size`, 0.625rem while both overflow).
- **The variables carry our `--sc-` prefix**: `--sc-scroll-area-overflow-{x,y}-{start,end}` are Base UI's `--scroll-area-overflow-{x,y}-{start,end}` — rename them in a snippet taken from shadcn.
