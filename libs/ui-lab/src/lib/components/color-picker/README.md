# Color Picker

A composable set of directives for selecting colors with support for various formats and input methods.

## Usage

```html
<div scColorPicker [(value)]="color" class="space-y-4">
  <div scColorPickerArea>
    <div scColorPickerAreaSaturation></div>
    <div scColorPickerAreaBrightness></div>
    <div scColorPickerAreaCursor></div>
  </div>
  <div scColorPickerHue>
    <div scColorPickerHueCursor></div>
  </div>
  <div class="flex items-center gap-3">
    <div scColorPickerPreview></div>
    <input scColorPickerInput format="hex" />
  </div>
</div>
```

## Directives

### ScColorPicker

Root container that manages color state. Provides `SC_COLOR_PICKER` injection token for child directives.

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

Interactive surface for saturation/brightness selection. Handles mouse and touch drag.

**Selector:** `div[scColorPickerArea]`

Sets hue-based background color automatically. Compose with `ScColorPickerAreaSaturation`, `ScColorPickerAreaBrightness`, and `ScColorPickerAreaCursor` children.

### ScColorPickerAreaSaturation

White-to-transparent gradient overlay (left to right).

**Selector:** `div[scColorPickerAreaSaturation]`

### ScColorPickerAreaBrightness

Black-to-transparent gradient overlay (bottom to top).

**Selector:** `div[scColorPickerAreaBrightness]`

### ScColorPickerAreaCursor

Position cursor that tracks the current saturation/brightness values.

**Selector:** `div[scColorPickerAreaCursor]`

### ScColorPickerHue

Hue slider track with rainbow gradient. Handles mouse and touch drag.

**Selector:** `div[scColorPickerHue]`

Compose with `ScColorPickerHueCursor` child.

### ScColorPickerHueCursor

Position cursor that tracks the current hue value.

**Selector:** `div[scColorPickerHueCursor]`

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

Container for preset color swatches. Use with `exportAs` to access the `colors` signal in templates.

**Selector:** `[scColorPickerSwatches]`
**Export As:** `scColorPickerSwatches`

**Inputs:**

| Input    | Type       | Default            | Description    |
| -------- | ---------- | ------------------ | -------------- |
| `colors` | `string[]` | (12 preset colors) | Swatch colors  |
| `class`  | `string`   | `''`               | Additional CSS |

### ScColorPickerSwatch

Individual swatch button. Injects `SC_COLOR_PICKER` to set color on click.

**Selector:** `button[scColorPickerSwatch]`

**Inputs:**

| Input   | Type     | Description              |
| ------- | -------- | ------------------------ |
| `color` | `string` | **(required)** Hex color |
| `class` | `string` | Additional CSS           |

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
  <div scColorPickerArea>
    <div scColorPickerAreaSaturation></div>
    <div scColorPickerAreaBrightness></div>
    <div scColorPickerAreaCursor></div>
  </div>
  <div scColorPickerHue>
    <div scColorPickerHueCursor></div>
  </div>
  <div class="flex items-center gap-3">
    <div scColorPickerPreview></div>
    <input scColorPickerInput format="hex" class="flex-1" />
  </div>
</div>
```

### With Swatches

```html
<div scColorPicker [(value)]="color" class="space-y-4">
  <div scColorPickerArea>
    <div scColorPickerAreaSaturation></div>
    <div scColorPickerAreaBrightness></div>
    <div scColorPickerAreaCursor></div>
  </div>
  <div scColorPickerHue>
    <div scColorPickerHueCursor></div>
  </div>
  <div scColorPickerSwatches #swatches="scColorPickerSwatches">
    @for (c of swatches.colors(); track c) {
    <button scColorPickerSwatch [color]="c">
      <span class="sr-only">Select color {{ c }}</span>
    </button>
    }
  </div>
</div>
```

### Custom Swatches

```html
<div scColorPicker [(value)]="color">
  <div scColorPickerSwatches [colors]="customColors" #swatches="scColorPickerSwatches">
    @for (c of swatches.colors(); track c) {
    <button scColorPickerSwatch [color]="c">
      <span class="sr-only">Select color {{ c }}</span>
    </button>
    }
  </div>
</div>
```

### With Eye Dropper

```html
<div scColorPicker [(value)]="color" class="space-y-4">
  <div scColorPickerArea>
    <div scColorPickerAreaSaturation></div>
    <div scColorPickerAreaBrightness></div>
    <div scColorPickerAreaCursor></div>
  </div>
  <div scColorPickerHue>
    <div scColorPickerHueCursor></div>
  </div>
  <div class="flex gap-2">
    <input scColorPickerInput format="hex" class="flex-1" />
    <button scColorPickerEyedropper>
      <svg siPipetteIcon class="size-4"></svg>
      <span class="sr-only">Pick color from screen</span>
    </button>
  </div>
</div>
```

### Compact

```html
<div scColorPicker [(value)]="color" class="w-[200px] space-y-3">
  <div scColorPickerArea class="h-32">
    <div scColorPickerAreaSaturation></div>
    <div scColorPickerAreaBrightness></div>
    <div scColorPickerAreaCursor></div>
  </div>
  <div scColorPickerHue>
    <div scColorPickerHueCursor></div>
  </div>
  <input scColorPickerInput format="hex" />
</div>
```

## Features

- **Saturation/Brightness Area**: 2D picker for saturation and brightness
- **Hue Slider**: Full spectrum hue selection
- **Multiple Formats**: Hex, RGB, HSL display
- **Composable Swatches**: Container + individual swatch buttons for full template control
- **Eye Dropper**: Pick colors from screen (Chrome/Edge)
- **Touch Support**: Works on mobile devices
- **Two-way Binding**: Sync color state with `[(value)]`

## Accessibility

- Keyboard accessible input field
- ARIA labels on swatch buttons (`"Select color #hex"`)
- Screen reader text for eye dropper
- Focus indicators on interactive elements
