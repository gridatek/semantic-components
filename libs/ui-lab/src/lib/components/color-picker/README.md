# Color Picker

A component for selecting colors with support for various formats and input methods.

## Usage

```html
<div scColorPicker [(value)]="color" class="space-y-4">
  <div scColorPickerArea></div>
  <div scColorPickerHue></div>
  <div class="flex items-center gap-3">
    <div scColorPickerPreview></div>
    <input scColorPickerInput format="hex" />
  </div>
</div>
```

## Components

### ScColorPicker

Root container that manages color state.

**Selector:** `[scColorPicker]`

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

**Selector:** `[scColorPickerArea]`

Features mouse and touch drag support.

### ScColorPickerHue

Hue slider (rainbow gradient).

**Selector:** `[scColorPickerHue]`

### ScColorPickerPreview

Color preview swatch.

**Selector:** `[scColorPickerPreview]`

### ScColorPickerInput

Text input for color values.

**Selector:** `input[scColorPickerInput]`

**Inputs:**

| Input    | Type                      | Default | Description    |
| -------- | ------------------------- | ------- | -------------- |
| `format` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Display format |
| `class`  | `string`                  | `''`    | Additional CSS |

### ScColorPickerSwatches

Preset color swatches.

**Selector:** `[scColorPickerSwatches]`

**Inputs:**

| Input    | Type       | Default            | Description    |
| -------- | ---------- | ------------------ | -------------- |
| `colors` | `string[]` | (12 preset colors) | Swatch colors  |
| `class`  | `string`   | `''`               | Additional CSS |

### ScColorPickerEyeDropper

Eye dropper button (Chrome/Edge only).

**Selector:** `button[scColorPickerEyedropper]`

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
<div scColorPicker [(value)]="color" class="space-y-4 rounded-lg border p-4">
  <div scColorPickerArea></div>
  <div scColorPickerHue></div>
  <div class="flex items-center gap-3">
    <div scColorPickerPreview></div>
    <input scColorPickerInput format="hex" class="flex-1" />
  </div>
</div>
```

### With Swatches

```html
<div scColorPicker [(value)]="color" class="space-y-4">
  <div scColorPickerArea></div>
  <div scColorPickerHue></div>
  <div scColorPickerSwatches></div>
</div>
```

### With Eye Dropper

```html
<div scColorPicker [(value)]="color" class="space-y-4">
  <div scColorPickerArea></div>
  <div scColorPickerHue></div>
  <div class="flex gap-2">
    <input scColorPickerInput format="hex" class="flex-1" />
    <button scColorPickerEyedropper></button>
  </div>
</div>
```

### Custom Swatches

```html
<div scColorPicker [(value)]="color">
  <div scColorPickerSwatches [colors]="['#ff0000', '#00ff00', '#0000ff']"></div>
</div>
```

### Simple Swatch Only

```html
<div scColorPicker [(value)]="color" class="space-y-4">
  <div scColorPickerSwatches></div>
  <div class="flex items-center gap-3">
    <div scColorPickerPreview></div>
    <span>{{ color() }}</span>
  </div>
</div>
```

### Compact

```html
<div scColorPicker [(value)]="color" class="w-[200px] space-y-3">
  <div scColorPickerArea class="h-32"></div>
  <div scColorPickerHue></div>
  <input scColorPickerInput format="hex" />
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
