# Rating Next

A score in stars, or any icon: WAI-ARIA's rating slider — one control, one tab stop, one value (`null` while not rated), whole or half stars, read out by your words. Built from MUI's, Mantine's, Zag's (Ark UI, Chakra) and ui-sdk's ratings: their features (halves, deselect, read-only for any score, a fill per star, no hover preview on touch), the slider so that halves read right ("3.5 out of 5 stars").

## Usage

```html
<div scField>
  <label scLabel>Your rating</label>
  <div scRatingNext [formField]="form.stars" [step]="0.5" valueText="{value} out of {max} stars">
    @for (star of stars; track star) {
    <span scRatingNextItem>
      <svg siStarIcon></svg>
      <svg siStarIcon></svg>
    </span>
    }
  </div>
  <div scFieldErrors></div>
</div>
```

```ts
readonly reviewForm = form(signal({ stars: null as number | null }), (path) =>
  required(path.stars, { message: 'Pick at least one star.' }),
);
```

## Parts

| Part               | Selector             | What it does                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScRatingNext`     | `div[scRatingNext]`  | `role="slider"` (read-only: `role="img"`), named by its field's label or `aria-label`. `value`: a number, `null` while not rated (two-way, or a `[formField]`: `FormValueControl<number \| null>`); `step` (1, or 0.5 for halves); `deselectable`; `readonly`; `disabled`; `valueText` (`{value}`, `{max}`, the value in `LOCALE_ID`). exportAs `scRatingNext`: `count()`, `shown()`, `text()`. |
| `ScRatingNextItem` | `[scRatingNextItem]` | A star, `aria-hidden`: your icon twice — empty, then full. The full one is drawn over the empty one up to the star's fill (`--sc-rating-fill`, 0 to 1). Its place gives its score (the first is 1). Its colour is the full icon's (`text-primary`; yours by `class`); the empty one `text-muted-foreground`; unsized icons `size-5`.                                                            |

Not `max`: a Signal Forms control's `max` is an input; the highest score is `count()`, one per star.

## Behaviour

- **Keys**: → and ↑ raise it by `step`, ← and ↓ lower it (mirrored right to left), Home and End go to the lowest and highest scores. Deselectable: Delete or Backspace, or ↓ from the lowest score, takes it back (`null`).
- **Pointer**: a press picks the star under it — with `step` 0.5, its first half gives a half (the right half, right to left). Deselectable, a press on the score given takes it back. A hover previews (not on touch: a tap picks at once); leaving shows the score again.
- **Read-only**: any score (4.2) shows, the fifth star a fifth filled; not focusable.
- **Why two icons**: the full one drawn over the empty one, clipped to the fill — whole, half or part of a star, rendered on the server as in the browser; and the two may differ (an outline heart, a filled one).

## Accessibility

- One tab stop; `aria-valuenow`, `aria-valuemin` (0), `aria-valuemax` (the number of stars), and your `aria-valuetext` ("3.5 out of 5 stars").
- Read-only, an image named by the value text. Required and invalid (once touched) from Signal Forms; a field's description is read with it.
- The empty and full stars differ by fill, not only by colour; the theme's `primary` keeps the 3:1 contrast a state needs (yellow on white doesn't).

## Style

No key of its own: theme colours (`primary`, `muted-foreground`), the focus ring of every control.
