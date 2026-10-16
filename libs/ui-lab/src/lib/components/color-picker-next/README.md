# Color Picker Next

The color picker, rebuilt: an area and channel sliders, with alpha; a field that takes any CSS colour; swatches as a radio group; the value in the format you choose — a form field.

## Architecture

```
scColorPickerNext (value — two-way, a [formField]: a CSS colour; format; disabled)
├── div[scColorPickerNextArea]                 — saturation × brightness: one thumb, a slider
├── input[scColorPickerNextSlider]="'hue' | 'alpha'" — a native range on a painted track
├── input[scColorPickerNextField]              — type any CSS colour
├── [scColorPickerNextSwatch]                  — the colour, on a checkerboard
├── [scColorPickerNextSwatches]                — a radio group of…
│   └── button[scColorPickerNextOption]="'#e11d48'"
└── button[scColorPickerNextEyeDropper]        — from the screen (where the browser can)
```

## Usage

```html
<div scColorPickerNext #picker="scColorPickerNext" [(value)]="color">
  <div scColorPickerNextArea aria-label="Saturation and brightness" [attr.aria-valuetext]="'Saturation ' + (picker.hsva().s | number: '1.0-0') + '%, brightness ' + (picker.hsva().v | number: '1.0-0') + '%'"></div>
  <input scColorPickerNextSlider="hue" aria-label="Hue" />
  <input scColorPickerNextSlider="alpha" aria-label="Opacity" />
  <span scColorPickerNextSwatch></span>
  <input scColorPickerNextField aria-label="Colour" />
</div>
```

## Value

A CSS colour string, written in `format`:

| `format` | Opaque                     | Transparent              |
| -------- | -------------------------- | ------------------------ |
| `hex`    | `#3b82f6`                  | `#3b82f680`              |
| `rgb`    | `rgb(59 130 246)`          | `rgb(59 130 246 / 0.5)`  |
| `hsl`    | `hsl(217 91% 60%)`         | `hsl(217 91% 60% / 0.5)` |
| `oklch`  | `oklch(62.3% 0.188 259.8)` | `oklch(… / 0.5)`         |

Any CSS colour goes in — from outside, or typed in the field: hex, `rgb()`, `hsl()`, `oklch()`, `lab()`, `color()`, names. The browser reads it (into sRGB). Empty is no colour. Changing `format` writes the value again.

A `[formField]`: `required()` in your schema; `disabled` from it. The picker keeps its hue (and saturation) through greys and black, where the colour has none.

Read: `hsva()` (hue 0–360, saturation and value 0–100, alpha 0–1), `rgba()`, `css()` (also `--color` on the picker). Methods: `set({ h, s, v, a })`, `setColor(css)`, `parse(css)`, `pickFromScreen()`; `canPickFromScreen()`.

## Keyboard

- Area: ← → saturation, ↑ ↓ brightness (Shift: 10), Page Up / Down brightness 10, Home / End saturation 0 / 100.
- Sliders: native ranges.
- Swatches: one stop in the tab order; the arrows (Home, End) move and choose.

## Accessibility

- Name the area, the sliders, the field, the swatches' group and each option (visually hidden text: "Rose").
- Write the area's `aria-valuetext` from `picker.hsva()`; the texts are yours.
- An invalid colour typed is `aria-invalid`; left, the field shows the colour again.
- The swatch is decorative (`aria-hidden`): say the colour in text where it matters.

## Not here

A colour wheel, colour names announced for you (yours to write), wide-gamut (P3) editing — OKLCH is a format, the area is sRGB — and a history of recent colours.
