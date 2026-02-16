# Image Annotator

A canvas-based image annotation component with drawing tools for adding annotations on top of images.

## Installation

```typescript
import { ScImageAnnotator } from '@/ui/image-annotator';
import type { Annotation, AnnotationPoint, AnnotationTool } from '@/ui/image-annotator';
```

## Usage

### Basic Usage

```html
<sc-image-annotator src="https://example.com/image.jpg" [width]="800" [height]="600" (annotationsChange)="onAnnotationsChange($event)" (save)="onSave($event)" />
```

```typescript
onAnnotationsChange(annotations: Annotation[]) {
  console.log('Annotations updated:', annotations);
}

onSave(dataUrl: string) {
  console.log('Image saved as data URL');
}
```

### With Custom Dimensions

```html
<sc-image-annotator src="/assets/photo.png" [width]="1200" [height]="800" />
```

### Programmatic Control

```html
<sc-image-annotator #annotator [src]="imageSrc" />

<button (click)="loadAnnotations()">Load</button>
<button (click)="clearAnnotations()">Clear</button>
```

```typescript
@ViewChild('annotator') annotator!: ScImageAnnotator;

loadAnnotations() {
  this.annotator.setAnnotations(savedAnnotations);
}

clearAnnotations() {
  this.annotator.clearAll();
}

getAnnotations() {
  return this.annotator.getAnnotations();
}
```

## API Reference

### Inputs

| Input    | Type     | Default    | Description             |
| -------- | -------- | ---------- | ----------------------- |
| `src`    | `string` | (required) | Image source URL        |
| `width`  | `number` | `600`      | Canvas width in pixels  |
| `height` | `number` | `400`      | Canvas height in pixels |
| `class`  | `string` | `''`       | Additional CSS classes  |

### Outputs

| Output              | Type           | Description                               |
| ------------------- | -------------- | ----------------------------------------- |
| `annotationsChange` | `Annotation[]` | Emitted when annotations are modified     |
| `save`              | `string`       | Emitted with data URL when image is saved |

### Methods

| Method                           | Description                      |
| -------------------------------- | -------------------------------- |
| `getAnnotations(): Annotation[]` | Get current annotations          |
| `setAnnotations(annotations)`    | Set annotations programmatically |
| `undo()`                         | Remove last annotation           |
| `clearAll()`                     | Clear all annotations            |
| `download()`                     | Download annotated image as PNG  |

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

- Multiple drawing tools (pen, line, rectangle, circle, arrow)
- Eraser tool for removing annotations
- Color picker with preset colors
- Adjustable line width
- Undo functionality
- Clear all annotations
- Download annotated image as PNG
- Cross-origin image support
- Real-time annotation preview
- Toolbar with tool selection
- Programmatic annotation control
