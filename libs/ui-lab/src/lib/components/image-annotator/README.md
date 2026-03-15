# Image Annotator

A composable canvas-based image annotation component with drawing tools for adding annotations on top of images.

## Installation

```typescript
import { ScImageAnnotator, ScImageAnnotatorAction, ScImageAnnotatorCanvas, ScImageAnnotatorColorButton, ScImageAnnotatorLineWidth, ScImageAnnotatorToolButton, ScImageAnnotatorToolbar } from '@semantic-components/ui-lab';
import type { Annotation, AnnotationPoint, AnnotationTool } from '@semantic-components/ui-lab';
```

## Usage

### Basic Usage

```html
<div scImageAnnotator [src]="imageSrc()" [width]="800" [height]="600" (annotationsChange)="onAnnotationsChange($event)" (save)="onSave($event)">
  <div scImageAnnotatorToolbar #toolbar="scImageAnnotatorToolbar">
    <div class="flex items-center gap-1 border-r pr-2">
      @for (tool of toolbar.tools; track tool.id) {
      <button scImageAnnotatorToolButton [tool]="tool.id" [attr.aria-label]="tool.label" [title]="tool.label">
        <!-- provide icon per tool -->
      </button>
      }
    </div>

    <div class="flex items-center gap-1 border-r pr-2">
      @for (color of toolbar.colors; track color) {
      <button scImageAnnotatorColorButton [color]="color"></button>
      }
    </div>

    <div class="flex items-center gap-2 border-r pr-2">
      <span class="text-muted-foreground text-xs">Width:</span>
      <input type="range" scImageAnnotatorLineWidth min="1" max="20" />
      <span class="w-4 text-xs">{{ toolbar.lineWidth() }}</span>
    </div>

    <div class="ml-auto flex items-center gap-1">
      <button scImageAnnotatorAction action="undo" title="Undo">
        <!-- undo icon -->
      </button>
      <button scImageAnnotatorAction action="clear" title="Clear All">
        <!-- trash icon -->
      </button>
      <button scImageAnnotatorAction action="download" title="Download">
        <!-- download icon -->
      </button>
    </div>
  </div>

  <div scImageAnnotatorCanvas></div>
</div>
```

```typescript
onAnnotationsChange(annotations: Annotation[]): void {
  console.log('Annotations updated:', annotations);
}

onSave(dataUrl: string): void {
  console.log('Image saved as data URL');
}
```

### Programmatic Control

```html
<div scImageAnnotator #annotator="scImageAnnotator" [src]="imageSrc" />
```

```typescript
@ViewChild('annotator') annotator!: ScImageAnnotator;

loadAnnotations(): void {
  this.annotator.setAnnotations(savedAnnotations);
}

getAnnotations(): Annotation[] {
  return this.annotator.getAnnotations();
}
```

## API Reference

### ScImageAnnotator

Root directive. Provides shared state to all children.

| Input    | Type     | Default    | Description             |
| -------- | -------- | ---------- | ----------------------- |
| `src`    | `string` | (required) | Image source URL        |
| `width`  | `number` | `600`      | Canvas width in pixels  |
| `height` | `number` | `400`      | Canvas height in pixels |
| `class`  | `string` | `''`       | Additional CSS classes  |

| Output              | Type           | Description                               |
| ------------------- | -------------- | ----------------------------------------- |
| `annotationsChange` | `Annotation[]` | Emitted when annotations are modified     |
| `save`              | `string`       | Emitted with data URL when image is saved |

| Method                           | Description                      |
| -------------------------------- | -------------------------------- |
| `getAnnotations(): Annotation[]` | Get current annotations          |
| `setAnnotations(annotations)`    | Set annotations programmatically |

### ScImageAnnotatorToolbar

Container directive for toolbar controls. Exposes `tools`, `colors`, `lineWidth()`, and `hasAnnotations()` via `exportAs`.

### ScImageAnnotatorToolButton

Directive on `button`. Auto-binds active styling, `aria-pressed`, and click to select the tool.

| Input   | Type             | Description            |
| ------- | ---------------- | ---------------------- |
| `tool`  | `AnnotationTool` | Required               |
| `class` | `string`         | Additional CSS classes |

### ScImageAnnotatorColorButton

Directive on `button`. Auto-binds background color, ring styling, `aria-pressed`, and click to select the color.

| Input   | Type     | Description            |
| ------- | -------- | ---------------------- |
| `color` | `string` | Required               |
| `class` | `string` | Additional CSS classes |

### ScImageAnnotatorLineWidth

Directive on `input[type="range"]`. Auto-binds value and input event for adjusting line width.

### ScImageAnnotatorAction

Directive on `button`. Auto-binds disabled state and click handler based on the action type.

| Input    | Type                              | Description            |
| -------- | --------------------------------- | ---------------------- |
| `action` | `'undo' \| 'clear' \| 'download'` | Required               |
| `class`  | `string`                          | Additional CSS classes |

### ScImageAnnotatorCanvas

Component rendering the dual canvas layers (image + annotations). Handles mouse events, image loading, drawing, and download.

## Type Definitions

```typescript
type AnnotationTool = 'pen' | 'line' | 'rectangle' | 'circle' | 'arrow' | 'text' | 'eraser';

interface AnnotationPoint {
  x: number;
  y: number;
}

interface Annotation {
  id: string;
  tool: AnnotationTool;
  points: AnnotationPoint[];
  color: string;
  lineWidth: number;
  text?: string;
}
```

## Available Tools

| Tool      | Description                      |
| --------- | -------------------------------- |
| Pen       | Freehand drawing                 |
| Line      | Straight line between two points |
| Rectangle | Rectangle shape                  |
| Circle    | Circle/ellipse from center point |
| Arrow     | Line with arrowhead              |
| Eraser    | Remove annotations by proximity  |

## Features

- Fully composable directive-based architecture
- Multiple drawing tools (pen, line, rectangle, circle, arrow)
- Eraser tool for removing annotations
- Color picker with preset colors
- Adjustable line width
- Undo and clear all functionality
- Download annotated image as PNG
- Cross-origin image support
- Real-time annotation preview
- Programmatic annotation control
