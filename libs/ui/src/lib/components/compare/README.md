# Compare

Two things compared, one over the other, split by a divider you drag: photos before and after an edit, two themes of a design, two versions of a page — any content.

## Architecture

```
scCompare (position, orientation, hover, handleOnly, bounds)
├── [scCompareBefore] — yours: an img, a video, any content; it sizes the compare
├── [scCompareAfter] — yours: laid over it, shown after the divider
├── [scCompareLabel]="before" / "after" — your text, in its corner
└── [scCompareHandle] — the divider's slider: name it, your icon inside
```

## Usage

```html
<div scCompare class="aspect-3/2 w-full rounded-lg">
  <img scCompareBefore src="/before.jpg" alt="The photo, as shot" />
  <img scCompareAfter src="/after.jpg" alt="The photo, edited" />
  <span scCompareLabel="before">Before</span>
  <span scCompareLabel="after">After</span>
  <div scCompareHandle aria-label="Before and after">
    <svg siChevronsLeftRightIcon></svg>
  </div>
</div>
```

Any content compares the same way — the same card in two themes:

```html
<div scCompare class="rounded-xl border">
  <div scCompareBefore class="bg-background p-8"><app-card /></div>
  <div scCompareAfter class="dark bg-background p-8"><app-card /></div>
  <div scCompareHandle aria-label="Light and dark theme"><svg siChevronsLeftRightIcon></svg></div>
</div>
```

## Inputs

| On `scCompare` | Type                         | Default        |                                                           |
| -------------- | ---------------------------- | -------------- | --------------------------------------------------------- |
| `position`     | `number` (two-way)           | `50`           | How much of the before shows, 0–100, from the start (top) |
| `orientation`  | `'horizontal' \| 'vertical'` | `'horizontal'` |                                                           |
| `hover`        | `boolean`                    | `false`        | The divider follows the pointer, without a press          |
| `handleOnly`   | `boolean`                    | `false`        | Only the handle drags (a page scrolls over the rest)      |
| `bounds`       | `number`                     | `0`            | How close to the edges the divider goes, in percent       |

Before and after fill the same box: an image or a video covers it (`object-fit: cover`), so two of different sizes line up. The after is clipped at `--sc-compare-position` — no layout in JavaScript.

## Accessibility

- The handle is the slider (`role="slider"`, `aria-valuenow`, `aria-orientation`): focusable, named by you. Write its `aria-valuetext` when a percentage says too little ("30% before").
- Arrows move it (Shift: by 10), Page Up / Down by 10, Home and End to the ends — right to left, the arrows follow the text's direction.
- Labels are your text; each fades while the divider covers its side.
- Pointer events: mouse, touch and pen; a press anywhere moves the divider there (unless `handleOnly`).

## Styling

The handle is a line and a round knob: restyle them from its class — `before:` is the line, `after:` the knob (`class="before:bg-amber-400 after:bg-amber-400"`).
