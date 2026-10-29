# Progress Next

A task's progress, as a bar or a circle: a value between `min` and `max` — or `null` while not known (indeterminate). Your label names it, your value text is what screen readers hear. After Ark UI / Zag (one progress, two shapes), MUI and Angular Material (determinate and indeterminate), antd and `react-circular-progressbar` (the text in the middle). Built beside `Progress` until it replaces it ([the rewrite process](../../../../../../docs/component-rewrite-process.md)).

## Usage

A bar:

```html
<div scProgressNext [value]="33">
  <span scProgressNextLabel>Uploading</span>
  <span scProgressNextValueText>{{ 0.33 | percent }}</span>
  <div scProgressNextTrack><div scProgressNextRange></div></div>
</div>
```

A circle — named with `aria-label`, as it has no label:

```html
<div scProgressNext [value]="60" aria-label="Storage used" class="size-24">
  <svg scProgressNextCircle [thickness]="4"></svg>
  <span scProgressNextValueText>{{ 0.6 | percent }}</span>
</div>
```

Indeterminate: leave `value` out (or `null`).

A spinner that shows how far it is — a download: `spin` turns the arc while loading, the value still known (your text says it, screen readers hear it). Done, the full ring; with motion reduced, the arc to the value.

```html
<div scProgressNext [value]="received()" aria-label="Downloading report.pdf" class="size-20">
  <svg scProgressNextCircle [spin]="downloading()"></svg>
  <span scProgressNextValueText>{{ received() / 100 | percent }}</span>
</div>
```

## Parts

| Part                        | What it does                                                                                                                                                                                                                                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `div[scProgressNext]`       | `value` (`null`: indeterminate), `min` (0), `max` (100). `role="progressbar"`, `aria-valuemin/max/now` (no `now` while indeterminate), `data-state` (`indeterminate`, `loading`, `complete`). A bar's row (label, value text, track); a circle's box (`size-16` unless you size it). `exportAs: 'scProgressNext'`: `fraction()`, `state()` |
| `[scProgressNextLabel]`     | Your label: the progress's name (`aria-labelledby`). Without one, give the progress an `aria-label`                                                                                                                                                                                                                                        |
| `[scProgressNextValueText]` | Your value text: the progress's `aria-valuetext`. At the end of a bar's line; in a circle's middle                                                                                                                                                                                                                                         |
| `div[scProgressNextTrack]`  | The bar's track                                                                                                                                                                                                                                                                                                                            |
| `div[scProgressNextRange]`  | The bar's filled part, from the start of the line (the right in right-to-left); indeterminate, a segment sliding across                                                                                                                                                                                                                    |
| `svg[scProgressNextCircle]` | The circle: its track and an arc from the top, clockwise (counter-clockwise in right-to-left); indeterminate, a quarter arc turning. `thickness` (8: hundredths of its width), `spin` (a spinner's look while loading, the value still known)                                                                                              |

## Accessibility

- Name every progress: a `scProgressNextLabel`, or `aria-label`.
- Your value text is read as its value — "3 of 5 steps" rather than a bare 60%.
- The indeterminate animations stop when the user prefers reduced motion: the bar's segment rests in the middle, the circle's arc still.
- The circle is drawn, not read (`aria-hidden`): the progress says it all.

## Not like Progress

- **Parts, not a component**: you write the track and the range, or the circle.
- **`value` is an input**, not a model: a progress shows a value, it isn't a form control (no `FormValueControl`).
- **`min`**, **value text**, **a label** and **the circle** are new; indeterminate now moves; the bar fills from the start in right-to-left.
