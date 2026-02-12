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
    <div sc-signature-pad class="relative inline-block">
      <canvas sc-signature-pad-canvas [(value)]="signature" [width]="400" [height]="200"></canvas>

      <div sc-signature-pad-controls>
        <button sc-signature-pad-undo>
          <svg si-undo-icon class="size-4"></svg>
        </button>
        <button sc-signature-pad-clear>
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
- **Selector**: `[sc-signature-pad]`
- **Inputs**: `disabled`, `penColor`, `penWidth`, `backgroundColor`

**`ScSignaturePadCanvas` (Component)**

- Canvas element for drawing
- **Selector**: `canvas[sc-signature-pad-canvas]`
- **Inputs**: `width`, `height`, `ariaLabel`, `class`
- **Model**: `value` (two-way bindable data URL)
- **Outputs**: `signatureChange`, `strokeEnd`

**`ScSignaturePadControls` (Component)**

- Container for control buttons (uses `<ng-content>`)
- **Selector**: `div[sc-signature-pad-controls]`
- **Default position**: `absolute top-2 right-2`

**`ScSignaturePadUndoButton` (Component)**

- Undo last stroke
- **Selector**: `button[sc-signature-pad-undo]`
- **Auto-disabled**: When no strokes to undo

**`ScSignaturePadClearButton` (Component)**

- Clear entire signature
- **Selector**: `button[sc-signature-pad-clear]`
- **Auto-disabled**: When signature is empty

**`ScSignaturePadToolbar` (Component)**

- Optional container for toolbar items (uses `<ng-content>`)
- **Selector**: `div[sc-signature-pad-toolbar]`
- **Default styling**: Flex row with gap

**`ScSignaturePadColorButton` (Component)**

- Button to select pen color
- **Selector**: `button[sc-signature-pad-pen-color]`
- **Inputs**: `color` (required, hex color string)
- **Auto-active**: When color matches current pen color

**`ScSignaturePadWidthButton` (Component)**

- Button to select pen width
- **Selector**: `button[sc-signature-pad-pen-width]`
- **Inputs**: `width` (required, number in pixels)
- **Auto-active**: When width matches current pen width

### Flexible Examples

#### Custom Button Layout

```html
<div sc-signature-pad>
  <canvas sc-signature-pad-canvas [width]="500" [height]="250"></canvas>

  <!-- Controls at bottom instead of top-right -->
  <div sc-signature-pad-controls class="static mt-2 justify-center">
    <button sc-signature-pad-undo class="px-4 py-2">Undo</button>
    <button sc-signature-pad-clear class="px-4 py-2">Clear</button>
  </div>
</div>
```

#### With Custom Buttons

```html
<div sc-signature-pad #pad>
  <canvas sc-signature-pad-canvas [(value)]="signature"></canvas>

  <div sc-signature-pad-controls>
    <button sc-signature-pad-undo>
      <svg si-undo-icon></svg>
    </button>
    <button sc-signature-pad-clear>
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
<div sc-signature-pad>
  <canvas sc-signature-pad-canvas></canvas>
</div>

<!-- External controls -->
<div class="flex gap-2 mt-2">
  <button sc-signature-pad-undo>Undo</button>
  <button sc-signature-pad-clear>Clear</button>
  <button (click)="save()">Save</button>
</div>
```

#### With Color Selection

```html
<div sc-signature-pad class="space-y-3">
  <!-- Color toolbar -->
  <div sc-signature-pad-toolbar>
    <button sc-signature-pad-pen-color [color]="'#000000'">
      <span class="size-4 rounded-full border" style="background: #000000"></span>
    </button>
    <button sc-signature-pad-pen-color [color]="'#1d4ed8'">
      <span class="size-4 rounded-full border" style="background: #1d4ed8"></span>
    </button>
    <button sc-signature-pad-pen-color [color]="'#dc2626'">
      <span class="size-4 rounded-full border" style="background: #dc2626"></span>
    </button>
  </div>

  <!-- Canvas -->
  <div class="relative inline-block">
    <canvas sc-signature-pad-canvas></canvas>
    <div sc-signature-pad-controls>
      <button sc-signature-pad-undo>Undo</button>
      <button sc-signature-pad-clear>Clear</button>
    </div>
  </div>
</div>
```

#### With Width Selection

```html
<div sc-signature-pad class="space-y-3">
  <div sc-signature-pad-toolbar>
    <button sc-signature-pad-pen-width [width]="2">
      <span class="w-4 rounded-full bg-foreground" style="height: 2px"></span>
    </button>
    <button sc-signature-pad-pen-width [width]="4">
      <span class="w-4 rounded-full bg-foreground" style="height: 4px"></span>
    </button>
    <button sc-signature-pad-pen-width [width]="6">
      <span class="w-4 rounded-full bg-foreground" style="height: 6px"></span>
    </button>
  </div>

  <div class="relative inline-block">
    <canvas sc-signature-pad-canvas></canvas>
  </div>
</div>
```

#### Combined Toolbar

```html
<div sc-signature-pad-toolbar>
  <!-- Colors -->
  <button sc-signature-pad-pen-color [color]="'#000000'">
    <span class="size-4 rounded-full border" style="background: #000000"></span>
  </button>
  <button sc-signature-pad-pen-color [color]="'#1d4ed8'">
    <span class="size-4 rounded-full border" style="background: #1d4ed8"></span>
  </button>

  <!-- Separator (optional) -->
  <div class="w-px h-6 bg-border"></div>

  <!-- Widths -->
  <button sc-signature-pad-pen-width [width]="2">
    <span class="w-4 rounded-full bg-foreground" style="height: 2px"></span>
  </button>
  <button sc-signature-pad-pen-width [width]="4">
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
