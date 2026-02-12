# Image Compare

Before/after image comparison slider with keyboard and touch support. Built using the composable architecture pattern for maximum flexibility.

## Components

- `ScImageCompare` (directive) - Root state management
- `ScImageCompareContainer` - Interactive container with event handling
- `ScImageCompareBefore` - Before image positioning
- `ScImageCompareAfter` - After image with clip-path reveal
- `ScImageCompareSlider` - Draggable slider line and handle
- `ScImageCompareLabel` - Customizable labels

## Basic Usage

```html
<div sc-image-compare class="w-full max-w-2xl aspect-[2/1]">
  <div sc-image-compare-container>
    <img sc-image-compare-before src="before.jpg" alt="Before" />
    <img sc-image-compare-after src="after.jpg" alt="After" />
    <div sc-image-compare-slider></div>
    <div sc-image-compare-label class="top-2 left-2">Before</div>
    <div sc-image-compare-label class="top-2 right-2">After</div>
  </div>
</div>
```

## API

### ScImageCompare (Directive)

The root directive that manages state.

| Input         | Type                         | Default        | Description        |
| ------------- | ---------------------------- | -------------- | ------------------ |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |

| Model      | Type     | Default | Description             |
| ---------- | -------- | ------- | ----------------------- |
| `position` | `number` | `50`    | Slider position (0-100) |

### ScImageCompareContainer

The interactive container that handles user input.

| Input       | Type     | Default                     | Description          |
| ----------- | -------- | --------------------------- | -------------------- |
| `ariaLabel` | `string` | `'Image comparison slider'` | Accessibility label  |
| `class`     | `string` | -                           | Additional CSS class |

### ScImageCompareBefore / ScImageCompareAfter

Image components for before/after images. Use as attribute directives on `<img>` tags.

| Input   | Type     | Default | Description          |
| ------- | -------- | ------- | -------------------- |
| `class` | `string` | -       | Additional CSS class |

### ScImageCompareSlider

The draggable slider line and handle.

| Input   | Type     | Default | Description          |
| ------- | -------- | ------- | -------------------- |
| `class` | `string` | -       | Additional CSS class |

**Content Projection:** Place custom handle icons inside the slider component.

### ScImageCompareLabel

Label component with full positioning control.

| Input   | Type     | Default | Description          |
| ------- | -------- | ------- | -------------------- |
| `class` | `string` | -       | Additional CSS class |

## Examples

### Basic Usage

```html
<div sc-image-compare class="w-full max-w-2xl aspect-[2/1]">
  <div sc-image-compare-container>
    <img sc-image-compare-before src="/images/before.jpg" alt="Before" />
    <img sc-image-compare-after src="/images/after.jpg" alt="After" />
    <div sc-image-compare-slider></div>
    <div sc-image-compare-label class="top-2 left-2">Before</div>
    <div sc-image-compare-label class="top-2 right-2">After</div>
  </div>
</div>
```

### Without Labels

Simply omit the label components:

```html
<div sc-image-compare class="w-full max-w-2xl aspect-[2/1]">
  <div sc-image-compare-container>
    <img sc-image-compare-before src="before.jpg" alt="Before" />
    <img sc-image-compare-after src="after.jpg" alt="After" />
    <div sc-image-compare-slider></div>
  </div>
</div>
```

### Vertical Orientation

```html
<div sc-image-compare [orientation]="'vertical'" class="w-full max-w-sm aspect-[2/3]">
  <div sc-image-compare-container>
    <img sc-image-compare-before src="before.jpg" alt="Top" />
    <img sc-image-compare-after src="after.jpg" alt="Bottom" />
    <div sc-image-compare-slider></div>
    <div sc-image-compare-label class="top-2 left-2">Top</div>
    <div sc-image-compare-label class="bottom-2 left-2">Bottom</div>
  </div>
</div>
```

### Custom Labels

Labels have full positioning control:

```html
<div sc-image-compare class="w-full max-w-2xl aspect-[2/1]">
  <div sc-image-compare-container>
    <img sc-image-compare-before src="before.jpg" alt="Before" />
    <img sc-image-compare-after src="after.jpg" alt="After" />
    <div sc-image-compare-slider></div>
    <div sc-image-compare-label class="bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full">Original</div>
    <div sc-image-compare-label class="bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full">Enhanced</div>
  </div>
</div>
```

### Custom Slider Handle

Use content projection to customize the slider handle:

```html
<div sc-image-compare>
  <div sc-image-compare-container>
    <img sc-image-compare-before src="before.jpg" alt="Before" />
    <img sc-image-compare-after src="after.jpg" alt="After" />
    <div sc-image-compare-slider>
      <!-- Custom handle content -->
      <svg><!-- Your custom icon --></svg>
    </div>
  </div>
</div>
```

### Controlled Position

```typescript
@Component({
  template: `
    <div sc-image-compare [(position)]="position" class="w-full max-w-2xl aspect-[2/1]">
      <div sc-image-compare-container>
        <img sc-image-compare-before src="before.jpg" alt="Before" />
        <img sc-image-compare-after src="after.jpg" alt="After" />
        <div sc-image-compare-slider></div>
      </div>
    </div>

    <input type="range" min="0" max="100" [value]="position()" (input)="position.set(+$any($event.target).value)" />
  `,
})
export class MyComponent {
  readonly position = signal(50);
}
```

### Custom Initial Position

```typescript
readonly position = signal(25); // Start at 25%
```

```html
<div sc-image-compare [(position)]="position">
  <div sc-image-compare-container>
    <img sc-image-compare-before src="before.jpg" alt="Before" />
    <img sc-image-compare-after src="after.jpg" alt="After" />
    <div sc-image-compare-slider></div>
  </div>
</div>
```

## Keyboard Navigation

| Key             | Action                   |
| --------------- | ------------------------ |
| `←` / `→`       | Move slider (horizontal) |
| `↑` / `↓`       | Move slider (vertical)   |
| `Shift` + Arrow | Move by 10%              |
| `Home`          | Go to 0%                 |
| `End`           | Go to 100%               |

## Styling

The component uses CSS `clip-path` for the reveal effect. Set dimensions on the root:

```html
<!-- Fixed aspect ratio -->
<div sc-image-compare class="w-full max-w-2xl aspect-[16/9]">...</div>

<!-- Square -->
<div sc-image-compare class="w-full max-w-md aspect-square">...</div>

<!-- Custom dimensions -->
<div sc-image-compare class="w-[600px] h-[400px]">...</div>
```

## Composable Architecture

This component follows the composable architecture pattern:

- **Root Directive** (`sc-image-compare`): Manages state (position, orientation)
- **Container** (`sc-image-compare-container`): Handles user interactions (mouse, touch, keyboard)
- **Image Components**: Positioned with appropriate clip-path
- **Slider**: Customizable via content projection
- **Labels**: Optional, fully customizable positioning and styling

Benefits:

- Full control over structure and layout
- Easy customization of all visual elements
- Content projection for icons and labels
- Can add additional elements between components

## Accessibility

- Full keyboard support with arrow keys
- ARIA slider role with value announcements
- Screen reader accessible labels
- Focus ring for keyboard navigation
- Touch support for mobile devices
