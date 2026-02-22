# Native Slider

A directive that styles native `<input type="range">` elements with a filled track, hover effect, and focus ring while preserving native form behavior.

## Why Native Slider?

Unlike `ScSlider` (which is a custom component), `ScNativeSlider` is a directive for native HTML range inputs. This provides:

- **Native form integration** - Works with `ngModel`, Reactive Forms, and Signal Forms
- **No ControlValueAccessor needed** - The native input handles all form state
- **Browser accessibility** - Leverages built-in browser accessibility features
- **Smaller bundle** - No custom form control logic

## Components

- `ScNativeSlider` - Directive for `<input type="range">`

## Usage

### Basic

```html
<input scNativeSlider [value]="volume()" (input)="onInput($event)" />
```

### With Label (ScField)

```html
<div scField class="w-[280px]">
  <label scLabel>Volume — {{ value() }}</label>
  <input scNativeSlider [value]="value()" (input)="onInput($event)" />
</div>
```

### Custom Min/Max

```html
<input scNativeSlider min="0" max="200" [value]="brightness()" (input)="onInput($event)" />
```

### Custom Color

Override `--primary` and `--secondary` CSS variables on a parent element to customize the fill and track colors:

```html
<div style="--primary: oklch(0.6 0.25 30); --secondary: oklch(0.9 0.05 30)">
  <input scNativeSlider [value]="temperature()" (input)="onInput($event)" />
</div>
```

### Disabled

```html
<input scNativeSlider disabled [value]="50" />
```

## Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

Standard native attributes (`min`, `max`, `value`, `step`, `disabled`) work as expected.

## Architecture

### Filled Track

Native `<input type="range">` has no universal CSS pseudo-element for styling the filled portion of the track. The directive uses two techniques for cross-browser support:

- **WebKit (Chrome, Safari, Edge):** A `linear-gradient` on `::-webkit-slider-runnable-track` with a `--fill-percent` CSS variable creates a sharp color stop between the primary (filled) and secondary (unfilled) colors.
- **Firefox:** The native `::-moz-range-progress` pseudo-element is styled with the primary color.

The `--fill-percent` variable is calculated as `(value - min) / (max - min) * 100` and updated on every `input` event.

```
┌──────────────────────────────────────────┐
│  Native <input type="range">             │
│  ┌──────────────────────────────────┐    │
│  │  Track                           │    │
│  │  ████████████░░░░░░░░░░░░░░░░░░  │    │
│  │  ← filled →  ○  ← unfilled →    │    │
│  │  (primary)  thumb  (secondary)   │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

### Hover Effect

The thumb displays a translucent primary-colored box-shadow ring on hover, using `oklch` relative color syntax for opacity.

### Comparison with ScSlider

| Feature          | ScSlider            | ScNativeSlider         |
| ---------------- | ------------------- | ---------------------- |
| Type             | Component           | Directive              |
| Form Integration | Two-way via model() | Native form controls   |
| ARIA             | Manual attributes   | Native browser support |
| Range support    | Yes (dual thumbs)   | No (single value only) |
| Filled track     | Custom element      | CSS gradient / pseudo  |

## Accessibility

- Native `<input type="range">` provides built-in accessibility
- Works with `<label for="id">` associations
- Keyboard accessible (Arrow keys to adjust, Tab to navigate)
- Focus ring styling via `:focus-visible`
- Disabled state via native `disabled` attribute
