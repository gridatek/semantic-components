# Slider

A directive that styles native `<input type="range">` elements with a filled track, hover effect, and focus ring while preserving native form behavior.

## Components

- `ScSlider` - Directive for `<input type="range">`

## Usage

### Basic

```html
<input scSlider [value]="volume()" />
```

### With Label (ScField)

```html
<div scField class="w-[280px]">
  <label scLabel>Volume — {{ value() }}</label>
  <input scSlider [value]="value()" />
</div>
```

### Custom Min/Max

```html
<input scSlider min="0" max="200" [value]="brightness()" />
```

### Custom Color

Override `--primary`, `--muted`, and `--ring` CSS variables on a parent element to customize colors:

```html
<div style="--primary: oklch(0.6 0.25 30); --muted: oklch(0.9 0.05 30); --ring: oklch(0.6 0.25 30)">
  <input scSlider [value]="temperature()" />
</div>
```

### Disabled

```html
<input scSlider disabled [value]="50" />
```

## Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

Standard native attributes (`min`, `max`, `value`, `step`, `disabled`) work as expected.

## Architecture

### Filled Track

Native `<input type="range">` has no universal CSS pseudo-element for styling the filled portion of the track. The directive uses two techniques for cross-browser support:

- **WebKit (Chrome, Safari, Edge):** A `linear-gradient` on `::-webkit-slider-runnable-track` with a `--fill-percent` CSS variable creates a sharp color stop between `primary` (filled) and `muted` (unfilled).
- **Firefox:** The native `::-moz-range-progress` pseudo-element is styled with the primary color.

The `--fill-percent` variable is calculated as `(value - min) / (max - min) * 100` and updated on every `input` event.

```
┌──────────────────────────────────────────┐
│  Native <input type="range">             │
│  ┌──────────────────────────────────┐    │
│  │  Track                           │    │
│  │  ████████████░░░░░░░░░░░░░░░░░░  │    │
│  │  ← filled →  ●  ← unfilled →    │    │
│  │  (primary)  thumb  (muted)       │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

### Styling

- **Thumb**: Solid `primary` color, `size-3` (12px), matching shadcn sizing
- **Track**: `h-1` (4px), `muted` background for unfilled portion
- **Hover**: Translucent `ring` box-shadow on thumb hover, using `oklch` relative color syntax for 50% opacity
- **Focus**: Same ring shadow on `:focus-visible`

## Accessibility

- Native `<input type="range">` provides built-in accessibility
- Works with `<label for="id">` associations
- Keyboard accessible (Arrow keys to adjust, Tab to navigate)
- Focus ring styling via `:focus-visible`
- Disabled state via native `disabled` attribute
