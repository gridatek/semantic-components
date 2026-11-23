# Compare Next

Two things compared, one over the other, split by a divider you drag: photos before and after an edit, two themes of a design, two versions of a page — any content. After react-compare-slider and img-comparison-slider; being built to replace the [Compare](../compare/README.md).

## Architecture

```
[scCompareNext] (position — two-way · orientation · handleOnly · hover · bounds · step)
├── [scCompareNextBefore] — yours: an img, a video, any content; it sizes the box
├── [scCompareNextAfter]  — yours: laid over it, shown past the divider (clipped at --sc-compare-position)
├── [scCompareNextLabel]="before" | "after" — your text, in its corner; fades while covered
└── [scCompareNextHandle] — the divider's slider: the line and the knob, your icon inside
```

## Usage

```html
<div scCompareNext scFrame class="aspect-3/2 w-full">
  <img scCompareNextBefore ngSrc="/before.jpg" fill priority alt="The photo, as shot" />
  <img scCompareNextAfter ngSrc="/after.jpg" fill priority alt="The photo, edited" />
  <span scCompareNextLabel="before">Before</span>
  <span scCompareNextLabel="after">After</span>
  <div scCompareNextHandle aria-label="Before and after"><svg siChevronsLeftRightIcon></svg></div>
</div>
```

## Dragging

- With a mouse or a pen, a press anywhere moves the divider there and drags it. On a touch screen only the handle drags — the page still scrolls over the photo (react-compare-slider's rule). `handleOnly`: `'touch'` (the default), `true` (everywhere), `false` (never).
- `hover`: the divider follows the pointer without a press. `bounds`: how close to the edges it goes (%).
- Before and after fill the same box: an image or a video covers it (`object-fit: cover`), so two of different sizes line up. The after is clipped at `--sc-compare-position` — no layout in script.

## Keyboard

On the handle (a WAI-ARIA slider): the arrows move the divider their way — as the text reads; up and down when vertical — by `step` (1%), Shift ten steps; Page Up / Page Down ten percent up the slider (forward across, up when vertical) and down; Home / End to the bounds. Moved by the keys the divider glides (0.15s, not under reduced motion); dragged, it follows at once.

## Accessibility

- The handle is the slider (`role="slider"`, `aria-valuenow`, `aria-valuemin` / `-max` at the bounds, `aria-orientation`): focusable, named by you. It reads its position as a percentage in the app's language (`LOCALE_ID`); your words in `aria-valuetext` (`[aria-valuetext]="position() + '% before'"`).
- Each photo has its `alt`; labels are your text.

## Look

The style's `compare` key: the knob's corners (round; square in lyra and sera) and the labels' (as `frameSm`). The knob takes the theme's colours (`bg-background`, a border, a shadow); the line stays light over photos. Restyle from the handle's class: `before:` the line, `after:` the knob.

## Not here

A `clip` option (which side is clipped), iframes, a handle following the pointer outside the box.
