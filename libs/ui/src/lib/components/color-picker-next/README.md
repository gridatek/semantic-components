# Color Picker Next

A colour, picked on an area, sliders, fields, presets or the screen — in HSV, HSL, sRGB or OKLCH, held to a gamut. Its value is a CSS colour; a `[formField]`. After ui-sdk's Color Picker; being built to replace the [Color Picker](../color-picker/README.md).

## Architecture

```
[scColorPickerNext] (value, space, format, gamut, disabled, readonly; (valueCommit))  — role group
│  values() · channel() · set() · commit() · setColor() · parse() · css() · pickFromScreen()
├── div[scColorPickerNextArea] (x, y)          — two channels: a slider; CSS or a canvas
├── input[scColorPickerNextSlider]="'hue'"     — one channel on a native range; orientation
├── input[scColorPickerNextInput]              — any CSS colour, on Enter or when left
├── input[scColorPickerNextChannelInput]="'red'" — one channel as a number
├── [scColorPickerNextSwatch]                  — the colour (decorative)
├── [scColorPickerNextSwatches]                — presets: a radio group of…
│   └── button[scColorPickerNextSwatchItem]="'#e11d48'"
└── button[scColorPickerNextEyeDropper]        — from the screen; data-unsupported elsewhere
```

## Usage

```html
<div scColorPickerNext aria-label="Brand color" [formField]="form.color">
  <div scColorPickerNextArea aria-label="Color"></div>
  <input scColorPickerNextSlider="hue" aria-label="Hue" />
  <span scColorPickerNextSwatch></span>
  <input scColorPickerNextInput aria-label="Hex" />
</div>
```

## Spaces, formats, gamut

| `space`         | Channels (their units)                     | Written as                    |
| --------------- | ------------------------------------------ | ----------------------------- |
| `hsv` (default) | hue 0–360°, saturation, brightness 0–100 % | `#0ea5e9`                     |
| `hsl`           | hue, saturation, lightness                 | `hsl(198.63 88.66% 48.43%)`   |
| `srgb`          | red, green, blue 0–255                     | `rgb(14 165 233)`             |
| `oklch`         | lightness 0–100 %, chroma 0–0.4, hue       | `oklch(0.6847 0.1479 237.32)` |

Alpha (0–100 %) in every space. `format` (`hex`, `rgb`, `hsl`, `oklch`) writes it another way. Any CSS colour goes in (an `oklch()` keeps its wide colours; others are read into sRGB by the browser). Empty is no colour. The hue — and black's saturation — are kept where the colour has none.

The area takes any two channels (`x`, `y`; by default saturation × brightness, saturation × lightness, red × green, chroma × lightness), a slider any one. HSV saturation × brightness is CSS gradients; any other area is painted on a canvas (96 × 72, stretched).

`gamut`: `srgb` (default), `p3`, or `false`. Only OKLCH can leave sRGB. Past the gamut, the value is the nearest colour it holds (its chroma lowered) and the picker and its parts are `data-out-of-gamut`; let go (or any key), the colour moves there.

## Changes and commits

`[(value)]` follows every step of a drag. `(valueCommit)` fires once a change finishes — a drag let go, a key, a preset, a field committed, the eyedropper — to save. `setColor(css)` from outside (false if it isn't a colour).

## Keyboard

Area: ← → `x`, ↑ ↓ `y`, Shift ten steps, Page Up / Down `y` a tenth, Home / End `x` to its ends. Sliders: the arrows a step, Shift ten, Page Up / Down a tenth, Home / End (as the text reads). Field: Enter takes it, Escape puts the value back. Presets: one Tab stop, the arrows move and choose.

## Accessibility

- A group: name it (its field's label, or `aria-label`). Name the area, each slider, each input, the presets and each preset ("Rose").
- The area reads its two values ("76 %, 96 %"), a slider its value ("120°"), in the app's language — no channel names of ours; your words in `aria-valuetext`.
- The swatch is decorative: say the colour in text where it matters.

## CSS variables

`--sc-color-picker-color` (the picker, a preset), `--sc-color-area-background`, `--sc-area-x` / `--sc-area-y` (the area), `--sc-color-slider-background`, `--sc-color-picker-thumb` (a slider).

## Look

The style's `colorPicker` key: corners of the area, the thumbs, the sliders, the swatch and the presets. The eyedropper is the style's button.

## Not here

Native form submission (`name`; Signal Forms only), a controller object, colours named for you, a colour wheel.
