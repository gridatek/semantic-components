# Slider Next

A slider: a native `input[type=range]` in the look of the app's preset — the `slider` key's `root`, `track` and `thumb`, shadcn's classes put on the browser's parts (`::-webkit-slider-runnable-track` / `::-moz-range-track`, `::-webkit-slider-thumb` / `::-moz-range-thumb`), sizes logical (block = thickness, inline = along the track) so a vertical slider takes the same classes. The range (`bg-primary`) is Firefox's `::-moz-range-progress`, and on Chrome's track a fill up to the thumb's centre (`--sc-slider-value`, `--sc-slider-thumb`): the thumb stays inside the track at both ends, as shadcn's `thumbAlignment="edge"`. Built beside [Slider](../slider/README.md), to compare.

## Usage

```html
<input type="range" scSliderNext [formField]="form.volume" aria-label="Volume" /> <input type="range" scSliderNext orientation="vertical" [(value)]="bass" aria-label="Bass" />
```

## Part

| Part           | Selector                            | What it does                                                                                                                       |
| -------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `ScSliderNext` | `input[type="range"][scSliderNext]` | `value` (model, or `[formField]`: the schema's min and max), `min`, `max`, `step`, `orientation`, `disabled`; invalid once touched |

One thumb: a native range has one. Two thumbs are the Range Slider; shadcn's Multiple (three) is left out.

## Accessibility

- A native range: Tab; the arrows by its step, Page Up / Page Down, Home / End; mirrored right to left. Vertical: `aria-orientation`, ArrowUp raises it.
- Named by a label (`scLabel` in a field, or `for`) or `aria-label`.
- A description in its field is read with it; invalid once touched (`aria-invalid`).
