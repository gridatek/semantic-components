# Rating

A score in stars, or any icon: WAI-ARIA's rating slider — one control, one tab stop, one value (`null` while not rated), whole or half stars, read out by your words. Built from MUI's, Mantine's, Zag's (Ark UI, Chakra) and ui-sdk's ratings: their features (halves, deselect, read-only for any score, a fill per star, no hover preview on touch), the slider so that halves read right ("3.5 out of 5 stars").

## Usage

```html
<div scField>
  <label scLabel>Your rating</label>
  <div scRating [formField]="form.stars" [step]="0.5" valueText="{value} out of {max} stars">
    <ng-template scRatingIcon>
      <svg siStarIcon></svg>
    </ng-template>
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

| Part           | Selector                    | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScRating`     | `div[scRating]`             | The slider is a native range input inside it, visually hidden — in a field, the field's id: its label ties to it by `for` (read-only: no input, the rating `role="img"`); named by that label or `aria-label`. `value`: a number, `null` while not rated (two-way, or a `[formField]`: `FormValueControl<number \| null>`); `count` (5, the stars); `step` (1, or 0.5 for halves); `deselectable`; `readonly`; `disabled`; `valueText` (`{value}`, `{max}`, the value in `LOCALE_ID`). exportAs `scRating`: `shown()`, `text()`. |
| `ScRatingIcon` | `ng-template[scRatingIcon]` | Your icon, once, in `<ng-template scRatingIcon>`. The rating draws it for each star, twice: empty (`text-muted-foreground`), and full over it up to the star's fill (`--sc-rating-fill`, 0 to 1), filled in the rating's colour (`text-primary`; yours by `class` on the rating). Context: `$implicit`, the star (1 for the first), and `full` — `let-full="full"` for a different icon per layer (an outline heart, a filled one). Unsized icons `size-5`.                                                                      |

Not `max`: a Signal Forms control's `max` is the value's; the highest score is `count`, one per star.

## A different icon per layer

```html
<ng-template scRatingIcon let-full="full">
  @if (full) {
  <svg siHeartIcon></svg>
  } @else {
  <svg siHeartCrackIcon></svg>
  }
</ng-template>
```

## Behaviour

- **Keys**: → and ↑ raise it by `step`, ← and ↓ lower it (mirrored right to left), Home and End go to the lowest and highest scores. Deselectable: Delete or Backspace, or ↓ from the lowest score, takes it back (`null`).
- **Pointer**: a press picks the star under it — with `step` 0.5, its first half gives a half (the right half, right to left). Deselectable, a press on the score given takes it back. A hover previews (not on touch: a tap picks at once); leaving shows the score again.
- **Read-only**: any score (4.2) shows, the fifth star a fifth filled; not focusable.
- **One icon, two layers**: you write the icon once; the rating stamps it twice per star (a template), the full layer clipped to the fill — whole, half or part of a star, rendered on the server as in the browser. It's a `@Component` for that template.

## Accessibility

- One tab stop: a native `<input type="range">`, visually hidden — 0 to the number of stars, by `step` — with your `aria-valuetext` ("3.5 out of 5 stars"); the focus ring shows on the stars. In a field it takes the field's id, so the label ties to it by `for` (a click on the label focuses it). Its keys are the rating's (Home: the lowest score; Delete only when deselectable); a change from a screen reader or Page Up and Down goes through it too.
- Read-only, an image named by the value text. Required and invalid (once touched) from Signal Forms; a field's description is read with it.
- The empty and full stars differ by fill, not only by colour; the theme's `primary` keeps the 3:1 contrast a state needs (yellow on white doesn't).

## Style

No key of its own: theme colours (`primary`, `muted-foreground`), the focus ring of every control.
