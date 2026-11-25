# Range Slider

A range on one track: two thumbs that never cross, the range between them, in the look of the app's Slider (the style's `slider` key: track, range, thumb). The value is the pair `[from, to]`, one Signal Forms field. Built from Base UI's range slider (shadcn's Slider, "Range"): one value for both thumbs, each thumb named, `minStepsBetweenValues`, `format`.

## Usage

```html
<div scField>
  <label scLabel>Price</label>
  <div scRangeSlider [formField]="priceForm.price" [step]="10" [format]="{ style: 'currency', currency: 'EUR' }" #range="scRangeSlider">
    <input scRangeSliderThumb aria-label="Minimum price" />
    <input scRangeSliderThumb aria-label="Maximum price" />
  </div>
  <p scFieldDescription>{{ range.formatted()[0] }} – {{ range.formatted()[1] }}</p>
</div>
```

```ts
readonly priceForm = form(signal({ price: [200, 800] as readonly [number, number] }), (path) =>
  // The ends: each value from 0 to 1000.
  applyEach(path.price, (value) => {
    min(value, 0);
    max(value, 1000);
  }),
);
```

## Parts

| Part                 | Selector                    | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScRangeSlider`      | `div[scRangeSlider]`        | A group (`role="group"`, named by its field's label). `value`: the pair, two-way or a `[formField]` (`FormValueControl<readonly [number, number]>`); `min` and `max` (without a form; with one, the schema's), `step` (1), `minStepsBetweenValues` (0), `orientation` (`horizontal`, `vertical`), `disabled`, `format` (`Intl.NumberFormatOptions`, in `LOCALE_ID`). exportAs `scRangeSlider`: `formatted()`, `fractions()`, `lowest()` and `highest()` (the ends). |
| `ScRangeSliderThumb` | `input[scRangeSliderThumb]` | A native range (`type="range"` set by the part) in the style's slider thumb: the first in the page is from, the second to. It stops at the other (and `minStepsBetweenValues` short of it); `aria-valuetext` from `format`. The first takes the field's id, so the label points to it.                                                                                                                                                                              |

## The ends

As every control's bounds (docs/component-design-principles.md, "Bounds Come From the Form"), one way per case:

- **With a form**, the schema's: `min` and `max` on each value of the pair (`applyEach`). The slider reads the first value's `min` and the second's `max` from the `[formField]` on it; they validate too (a value outside them is an error). Angular refuses `[min]` / `[max]` beside `[formField]` (NG8022).
- **Without a form**, `[min]` and `[max]`, as a Slider's: `<div scRangeSlider [(value)]="clip" [min]="0" [max]="duration">` — a clip's trim, a live filter, a chart's zoom.
- **Neither**: 0 and 100.

In the class they are `minInput` / `maxInput` (written `[min]` / `[max]`, as `classInput` is `[class]`): a Signal Forms control's `min` property is typed as its value, here a pair. With a form, Angular binds the field's `min` / `max` there too; not numbers, they are ignored.

## Behaviour

- **Thumbs never cross.** Dragged into the other, a thumb pushes it along (Base UI's `push`), the `minStepsBetweenValues` gap kept. On the keyboard it stops at the other instead: an arrow never moves a value you didn't focus. Home on "to" stops at "from".
- **The pointer**: a press anywhere on it brings the nearer thumb, which follows the drag (the slider drives it; the thumbs take the pointer only for their hover). With both on one spot, the direction of the drag picks the one that can move.
- **Vertical**: the native ranges turned (`writing-mode`), the values growing upward, `aria-orientation`.
- **Right to left**: from on the right; the arrows mirrored (Safari's too, `rtlArrowStep`, shared with the Slider).

## Accessibility

- Each thumb is a native range: Tab; the arrows by `step`, Page Up / Page Down by more, Home / End to the ends.
- The consumer names each thumb (`aria-label`); in a field, the group is named by its label and each thumb is described by its description.
- `format` reads the values out (`aria-valuetext`: "€200"). Invalid once touched (`aria-invalid` on both thumbs).

## Style

No key of its own: the Slider's (`slider.root`, `slider.track`, `slider.thumb`). The first thumb draws the track and the range between the thumbs' centres; the second's track is transparent.
