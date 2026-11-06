# Scroll Area Next2

A box that scrolls with the browser's own scrollbar — thin, in the theme's colors. One directive on your element, Tailwind's scrollbar utilities for the look.

## Usage

```html
<div scScrollAreaNext2 class="h-72 w-48 rounded-md border">
  <div class="p-4">…</div>
</div>
```

Its look is classes — yours override them: `scrollbar-thin`, `scrollbar-thumb-border`, `scrollbar-track-transparent` by default; `scrollbar-thumb-primary/40`, `scrollbar-none`, `scrollbar-gutter-stable` (no shift when the bar appears)…

## Part

| Part                | Selector                 | What it does                                                                                                                                                                                               |
| ------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScScrollAreaNext2` | `div[scScrollAreaNext2]` | Scrolls, with a thin themed native scrollbar; a tab stop while it overflows; `data-has-overflow-x` / `-y`, `data-overflow-{x,y}-{start,end}`, `data-scrolling`, `--scroll-area-overflow-{x,y}-{start,end}` |

## Keyboard and screen readers

- The browser scrolls it — the wheel, touch, the keyboard — with its own scrollbar.
- While it overflows it is in the tab order with a focus ring (as Base UI's viewport): the arrow keys, Page Up / Down, Home and End scroll it. A box that doesn't scroll isn't a stop.

## Not shadcn's

- **The browser's scrollbar**, not a drawn one (shadcn's is Base UI's: viewport, scrollbar, thumb, corner). The thumb's shape is the browser's — shadcn's styles change only its corners (square in lyra and sera), which `scrollbar-color` can't; so there is no preset key.
- **One directive**, no parts: the overflow attributes and variables (for a fade) come from the box itself.
