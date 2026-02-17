# Signature Pad

Canvas-based signature capture component with touch and mouse support.

## Composable Architecture

The signature pad uses a **composable architecture** that gives you full control over layout and functionality.

### Basic Usage

```typescript
import { ScSignaturePad, ScSignaturePadCanvas, ScSignaturePadControls, ScSignaturePadUndoButton, ScSignaturePadClearButton } from '@semantic-components/ui-lab';
import { SiUndoIcon, SiTrash2Icon } from '@semantic-icons/lucide-icons';

@Component({
  imports: [ScSignaturePad, ScSignaturePadCanvas, ScSignaturePadControls, ScSignaturePadUndoButton, ScSignaturePadClearButton, SiUndoIcon, SiTrash2Icon],
  template: `
    <div scSignaturePad class="relative inline-block">
      <canvas scSignaturePadCanvas [(value)]="signature" [width]="400" [height]="200"></canvas>

      <div scSignaturePadControls>
        <button scSignaturePadUndo>
          <svg si-undo-icon class="size-4"></svg>
        </button>
        <button scSignaturePadClear>
          <svg si-trash-2-icon class="size-4"></svg>
        </button>
      </div>
    </div>
  `,
})
export class MyComponent {
  readonly signature = signal('');
}
```

### Composable Components

**`ScSignaturePad` (Directive)**

- Root directive that provides context
- Manages signature state and drawing logic
- **Selector**: `[scSignaturePad]`
- **Inputs**: `disabled`, `penColor`, `penWidth`, `backgroundColor`

**`ScSignaturePadCanvas` (Component)**

- Canvas element for drawing
- **Selector**: `canvas[scSignaturePadCanvas]`
- **Inputs**: `width`, `height`, `ariaLabel`, `class`
- **Model**: `value` (two-way bindable data URL)
- **Outputs**: `signatureChange`, `strokeEnd`

**`ScSignaturePadControls` (Component)**

- Container for control buttons (uses `<ng-content>`)
- **Selector**: `div[scSignaturePadControls]`
- **Default position**: `absolute top-2 right-2`

**`ScSignaturePadUndoButton` (Component)**

- Undo last stroke
- **Selector**: `button[scSignaturePadUndo]`
- **Auto-disabled**: When no strokes to undo

**`ScSignaturePadClearButton` (Component)**

- Clear entire signature
- **Selector**: `button[scSignaturePadClear]`
- **Auto-disabled**: When signature is empty

**`ScSignaturePadToolbar` (Component)**

- Optional container for toolbar items (uses `<ng-content>`)
- **Selector**: `div[scSignaturePadToolbar]`
- **Default styling**: Flex row with gap

**`ScSignaturePadColorButton` (Component)**

- Button to select pen color
- **Selector**: `button[scSignaturePadPenColor]`
- **Inputs**: `color` (required, hex color string)
- **Auto-active**: When color matches current pen color

**`ScSignaturePadWidthButton` (Component)**

- Button to select pen width
- **Selector**: `button[scSignaturePadPenWidth]`
- **Inputs**: `width` (required, number in pixels)
- **Auto-active**: When width matches current pen width

### Flexible Examples

#### Custom Button Layout

```html
<div scSignaturePad>
  <canvas scSignaturePadCanvas [width]="500" [height]="250"></canvas>

  <!-- Controls at bottom instead of top-right -->
  <div scSignaturePadControls class="static mt-2 justify-center">
    <button scSignaturePadUndo class="px-4 py-2">Undo</button>
    <button scSignaturePadClear class="px-4 py-2">Clear</button>
  </div>
</div>
```

#### With Custom Buttons

```html
<div scSignaturePad #pad>
  <canvas scSignaturePadCanvas [(value)]="signature"></canvas>

  <div scSignaturePadControls>
    <button scSignaturePadUndo>
      <svg si-undo-icon></svg>
    </button>
    <button scSignaturePadClear>
      <svg si-trash-icon></svg>
    </button>
    <!-- Add your own buttons -->
    <button (click)="downloadSignature(pad)">
      <svg si-download-icon></svg>
    </button>
  </div>
</div>
```

#### Without Controls Container

```html
<div scSignaturePad>
  <canvas scSignaturePadCanvas></canvas>
</div>

<!-- External controls -->
<div class="flex gap-2 mt-2">
  <button scSignaturePadUndo>Undo</button>
  <button scSignaturePadClear>Clear</button>
  <button (click)="save()">Save</button>
</div>
```

#### With Color Selection

```html
<div scSignaturePad class="space-y-3">
  <!-- Color toolbar -->
  <div scSignaturePadToolbar>
    <button scSignaturePadPenColor [color]="'#000000'">
      <span class="size-4 rounded-full border" style="background: #000000"></span>
    </button>
    <button scSignaturePadPenColor [color]="'#1d4ed8'">
      <span class="size-4 rounded-full border" style="background: #1d4ed8"></span>
    </button>
    <button scSignaturePadPenColor [color]="'#dc2626'">
      <span class="size-4 rounded-full border" style="background: #dc2626"></span>
    </button>
  </div>

  <!-- Canvas -->
  <div class="relative inline-block">
    <canvas scSignaturePadCanvas></canvas>
    <div scSignaturePadControls>
      <button scSignaturePadUndo>Undo</button>
      <button scSignaturePadClear>Clear</button>
    </div>
  </div>
</div>
```

#### With Width Selection

```html
<div scSignaturePad class="space-y-3">
  <div scSignaturePadToolbar>
    <button scSignaturePadPenWidth [width]="2">
      <span class="w-4 rounded-full bg-foreground" style="height: 2px"></span>
    </button>
    <button scSignaturePadPenWidth [width]="4">
      <span class="w-4 rounded-full bg-foreground" style="height: 4px"></span>
    </button>
    <button scSignaturePadPenWidth [width]="6">
      <span class="w-4 rounded-full bg-foreground" style="height: 6px"></span>
    </button>
  </div>

  <div class="relative inline-block">
    <canvas scSignaturePadCanvas></canvas>
  </div>
</div>
```

#### Combined Toolbar

```html
<div scSignaturePadToolbar>
  <!-- Colors -->
  <button scSignaturePadPenColor [color]="'#000000'">
    <span class="size-4 rounded-full border" style="background: #000000"></span>
  </button>
  <button scSignaturePadPenColor [color]="'#1d4ed8'">
    <span class="size-4 rounded-full border" style="background: #1d4ed8"></span>
  </button>

  <!-- Separator (optional) -->
  <div class="w-px h-6 bg-border"></div>

  <!-- Widths -->
  <button scSignaturePadPenWidth [width]="2">
    <span class="w-4 rounded-full bg-foreground" style="height: 2px"></span>
  </button>
  <button scSignaturePadPenWidth [width]="4">
    <span class="w-4 rounded-full bg-foreground" style="height: 4px"></span>
  </button>
</div>
```

## Features

- ✅ Touch and mouse support
- ✅ Smooth drawing with line interpolation
- ✅ Undo functionality (stroke by stroke)
- ✅ Export to PNG, JPEG, or Blob
- ✅ Customizable pen color and width
- ✅ Responsive canvas sizing
- ✅ **Composable architecture** for maximum flexibility
- ✅ Use with `@semantic-icons` for consistent icons

## Accessibility

- Keyboard accessible controls
- ARIA labels for screen readers
- Focus indicators on buttons
- Disabled state support
- Touch-friendly button sizes
