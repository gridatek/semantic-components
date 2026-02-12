# Color Picker

A component for selecting colors with support for various formats and input methods.

## Usage

```html
<div sc-color-picker [(value)]="color" class="space-y-4">
  <div sc-color-picker-area></div>
  <div sc-color-picker-hue></div>
  <div class="flex items-center gap-3">
    <div sc-color-picker-preview></div>
    <input sc-color-picker-input format="hex" />
  </div>
</div>
```

## Components

### ScColorPicker

Root container that manages color state.

**Selector:** `[sc-color-picker]`

**Inputs:**

| Input      | Type      | Default | Description            |
| ---------- | --------- | ------- | ---------------------- |
| `disabled` | `boolean` | `false` | Disable picker         |
| `class`    | `string`  | `''`    | Additional CSS classes |

**Two-way Bindings:**

| Binding | Type     | Default     | Description     |
| ------- | -------- | ----------- | --------------- |
| `value` | `string` | `'#000000'` | Hex color value |

**Computed Properties:**

| Property | Type     | Description        |
| -------- | -------- | ------------------ |
| `hsv`    | `HSV`    | Current HSV values |
| `rgb`    | `RGB`    | Current RGB values |
| `hsl`    | `HSL`    | Current HSL values |
| `hex`    | `string` | Current hex value  |

**Methods:**

| Method             | Description            |
| ------------------ | ---------------------- |
| `setHsv(hsv)`      | Set HSV values         |
| `setRgb(rgb)`      | Set RGB values         |
| `setHex(hex)`      | Set hex value          |
| `setHue(h)`        | Set hue (0-360)        |
| `setSaturation(s)` | Set saturation (0-100) |
| `setValue(v)`      | Set value (0-100)      |

### ScColorPickerArea

Saturation/brightness selection area.

**Selector:** `[sc-color-picker-area]`

Features mouse and touch drag support.

### ScColorPickerHue

Hue slider (rainbow gradient).

**Selector:** `[sc-color-picker-hue]`

### ScColorPickerPreview

Color preview swatch.

**Selector:** `[sc-color-picker-preview]`

### ScColorPickerInput

Text input for color values.

**Selector:** `input[sc-color-picker-input]`

**Inputs:**

| Input    | Type                      | Default | Description    |
| -------- | ------------------------- | ------- | -------------- |
| `format` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Display format |
| `class`  | `string`                  | `''`    | Additional CSS |

### ScColorPickerSwatches

Preset color swatches.

**Selector:** `[sc-color-picker-swatches]`

**Inputs:**

| Input    | Type       | Default            | Description    |
| -------- | ---------- | ------------------ | -------------- |
| `colors` | `string[]` | (12 preset colors) | Swatch colors  |
| `class`  | `string`   | `''`               | Additional CSS |

### ScColorPickerEyeDropper

Eye dropper button (Chrome/Edge only).

**Selector:** `button[sc-color-picker-eyedropper]`

Uses the EyeDropper API to pick colors from the screen.

## Types

```typescript
interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}
```

## Examples

### Full Picker

```html
<div sc-color-picker [(value)]="color" class="space-y-4 rounded-lg border p-4">
  <div sc-color-picker-area></div>
  <div sc-color-picker-hue></div>
  <div class="flex items-center gap-3">
    <div sc-color-picker-preview></div>
    <input sc-color-picker-input format="hex" class="flex-1" />
  </div>
</div>
```

### With Swatches

```html
<div sc-color-picker [(value)]="color" class="space-y-4">
  <div sc-color-picker-area></div>
  <div sc-color-picker-hue></div>
  <div sc-color-picker-swatches></div>
</div>
```

### With Eye Dropper

```html
<div sc-color-picker [(value)]="color" class="space-y-4">
  <div sc-color-picker-area></div>
  <div sc-color-picker-hue></div>
  <div class="flex gap-2">
    <input sc-color-picker-input format="hex" class="flex-1" />
    <button sc-color-picker-eyedropper></button>
  </div>
</div>
```

### Custom Swatches

```html
<div sc-color-picker [(value)]="color">
  <div sc-color-picker-swatches [colors]="['#ff0000', '#00ff00', '#0000ff']"></div>
</div>
```

### Simple Swatch Only

```html
<div sc-color-picker [(value)]="color" class="space-y-4">
  <div sc-color-picker-swatches></div>
  <div class="flex items-center gap-3">
    <div sc-color-picker-preview></div>
    <span>{{ color() }}</span>
  </div>
</div>
```

### Compact

```html
<div sc-color-picker [(value)]="color" class="w-[200px] space-y-3">
  <div sc-color-picker-area class="h-32"></div>
  <div sc-color-picker-hue></div>
  <input sc-color-picker-input format="hex" />
</div>
```

## Features

- **Saturation/Brightness Area**: 2D picker for saturation and brightness
- **Hue Slider**: Full spectrum hue selection
- **Multiple Formats**: Hex, RGB, HSL display
- **Preset Swatches**: Quick color selection
- **Eye Dropper**: Pick colors from screen (Chrome/Edge)
- **Touch Support**: Works on mobile devices
- **Two-way Binding**: Sync color state with `[(value)]`

## Accessibility

- Keyboard accessible input field
- ARIA labels on swatch buttons
- Screen reader text for eye dropper
- Focus indicators on interactive elements
