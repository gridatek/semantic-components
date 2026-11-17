# Scroll Area Next2

A box that scrolls with the browser's own scrollbar, in the preset's look. One directive on your element; a `CdkScrollable`, so overlays opened from inside it follow its scroll.

## Usage

```html
<div scScrollAreaNext2 class="h-72 w-48 rounded-md border">
  <div class="p-4">…</div>
</div>
```

Its look: the preset's `nativeThumb` on `::-webkit-scrollbar` (Chromium, Safari); Firefox, which has none, gets its thin bar in the theme's colors. Your classes override them.

## Part

| Part                | Selector                 | What it does                                                                                                                                                                                |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScScrollAreaNext2` | `div[scScrollAreaNext2]` | Scrolls, with a thin themed native scrollbar; a tab stop while it overflows; `data-has-overflow-x` / `-y`, `data-overflow-{x,y}-{start,end}`, `--sc-scroll-area-overflow-{x,y}-{start,end}` |

## Keyboard and screen readers

- The browser scrolls it — the wheel, touch, the keyboard — with its own scrollbar.
- While it overflows it is in the tab order with a focus ring (as Base UI's viewport): the arrow keys, Page Up / Down, Home and End scroll it. A box that doesn't scroll isn't a stop.

## Not shadcn's

- **The browser's scrollbar**, not a drawn one (shadcn's is Base UI's: viewport, scrollbar, thumb, corner). shadcn's styles change only the thumb's corners (square in lyra and sera): the preset's `scrollArea.nativeThumb` sets them on `::-webkit-scrollbar-thumb` (Chromium, Safari). Firefox's `scrollbar-color` can't, so there its thumb keeps the browser's shape.
- **It takes room** where the system's scrollbars do (Windows, Linux; macOS when "Show scroll bars: Always"): a 10px gutter beside the content, where shadcn's sits over it.
- **One directive**, no parts: the overflow attributes and variables (for a fade) come from the box itself.
- **The variables carry our `--sc-` prefix**: `--sc-scroll-area-overflow-{x,y}-{start,end}` are Base UI's `--scroll-area-overflow-{x,y}-{start,end}` — rename them in a snippet taken from shadcn.
