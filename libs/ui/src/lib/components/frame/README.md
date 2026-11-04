# Frame

A frame round a box, in the app's preset: the style's card radius, ring and shadow — square in lyra and sera, `4xl` in luma. For a framed box that isn't a card: an aspect ratio, a table's container, any `div`.

```html
<div scAspectRatio scFrame [ratio]="16 / 9" class="w-full max-w-sm">
  <img ngSrc="…" fill alt="…" class="object-cover" />
</div>

<div scTableContainer scFrame>…</div>
```

- Only the look. Clipping its content is the box's: the aspect ratio clips (`overflow-hidden`), the table's container scrolls. On a plain box with an image, add `overflow-hidden` yourself.
- Use it instead of a hand-written frame (`rounded-md border`), which suits few styles.

## API reference

### ScFrame — `[scFrame]`

| Input   | Type     | Default | Description                     |
| ------- | -------- | ------- | ------------------------------- |
| `class` | `string` | `''`    | Classes merged over the preset. |

## Styles

From the preset (`frame`): the card's radius, ring and shadow in each style (`shadcn-reference/presets/<style>/card.tsx`). The Card draws its own frame from it too, so a framed box always matches the cards beside it — and a change to the card's frame is made here.
