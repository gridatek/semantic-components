# Progress

A task's progress, as a bar or a circle: a value between `min` and `max` — or `null` while not known (indeterminate). Your label names it, your value text is what screen readers hear. After Ark UI / Zag (one progress, two shapes), MUI and Angular Material (determinate and indeterminate), antd and `react-circular-progressbar` (the text in the middle).

## Usage

A bar:

```html
<div scProgress [value]="33">
  <span scProgressLabel>Uploading</span>
  <span scProgressValueText>{{ 0.33 | percent }}</span>
  <div scProgressTrack><div scProgressRange></div></div>
</div>
```

A circle — named with `aria-label`, as it has no label:

```html
<div scProgress [value]="60" aria-label="Storage used" class="size-24">
  <svg scProgressCircle [thickness]="4"></svg>
  <span scProgressValueText>{{ 0.6 | percent }}</span>
</div>
```

Indeterminate: leave `value` out (or `null`).

A spinner that shows how far it is — a download: `spin` turns the arc while loading, the value still known (your text says it, screen readers hear it). Done, the full ring; with motion reduced, the arc to the value.

```html
<div scProgress [value]="received()" aria-label="Downloading report.pdf" class="size-20">
  <svg scProgressCircle [spin]="downloading()"></svg>
  <span scProgressValueText>{{ received() / 100 | percent }}</span>
</div>
```

## Parts

| Part                    | What it does                                                                                                                                                                                                                                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `div[scProgress]`       | `value` (`null`: indeterminate), `min` (0), `max` (100). `role="progressbar"`, `aria-valuemin/max/now` (no `now` while indeterminate), `data-state` (`indeterminate`, `loading`, `complete`). A bar's row (label, value text, track); a circle's box (`size-16` unless you size it). `exportAs: 'scProgress'`: `fraction()`, `state()` |
| `[scProgressLabel]`     | Your label: the progress's name (`aria-labelledby`). Without one, give the progress an `aria-label`                                                                                                                                                                                                                                    |
| `[scProgressValueText]` | Your value text: the progress's `aria-valuetext`. At the end of a bar's line; in a circle's middle                                                                                                                                                                                                                                     |
| `div[scProgressTrack]`  | The bar's track                                                                                                                                                                                                                                                                                                                        |
| `div[scProgressRange]`  | The bar's filled part, from the start of the line (the right in right-to-left); indeterminate, a segment sliding across                                                                                                                                                                                                                |
| `svg[scProgressCircle]` | The circle: its track and an arc from the top, clockwise (counter-clockwise in right-to-left); indeterminate, a quarter arc turning. `thickness` (8: hundredths of its width), `spin` (a spinner's look while loading, the value still known)                                                                                          |

## Accessibility

- Name every progress: a `scProgressLabel`, or `aria-label`.
- Your value text is read as its value — "3 of 5 steps" rather than a bare 60%.
- The indeterminate animations stop when the user prefers reduced motion: the bar's segment rests in the middle, the circle's arc still.
- The circle is drawn, not read (`aria-hidden`): the progress says it all.

## Since the first Progress (rewritten 2026-10-29)

- **Parts, not a component**: you write the track and the range, or the circle — what was `<div scProgress [value]="v"></div>` is now `<div scProgress [value]="v"><div scProgressTrack><div scProgressRange></div></div></div>`; `scProgressIndicator` is gone (style `scProgressRange`).
- **`value` is an input**, not a model: a progress shows a value, it isn't a form control (no `FormValueControl`).
- **`min`**, **value text**, **a label** and **the circle** are new; indeterminate now moves; the bar fills from the start in right-to-left.
