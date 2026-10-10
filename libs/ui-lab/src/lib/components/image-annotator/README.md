# Image Annotator

A composable, canvas-based image annotator: pen, line, rectangle, circle, arrow and eraser tools, colors, stroke width, undo/redo, clear and download.

## Features

- **Mouse, touch and pen** (pointer events); the page doesn't scroll while drawing
- **Responsive** — scales to its container, keeping the `width`/`height` ratio; annotations are stored in image coordinates, so they survive resizing
- **Sharp on high-DPI screens** — both layers render at the device pixel ratio; downloads are exported at full `width` × `height`
- **Undo / redo** for every change, including erasing (one step per eraser gesture)
- **Accessible toolbar** — `role="toolbar"` (one Tab stop, arrow keys), named tools/colors/actions, a labelled width slider; the canvas is `role="img"` named by `alt`
- **Configurable** colors and tools; icons are yours (projected `<svg>`s)

## Installation

```typescript
import { ScImageAnnotator, ScImageAnnotatorAction, ScImageAnnotatorCanvas, ScImageAnnotatorColorButton, ScImageAnnotatorLineWidth, ScImageAnnotatorToolButton, ScImageAnnotatorToolbar } from '@semantic-components/ui-lab';
import type { Annotation, AnnotatorColor, AnnotatorToolOption } from '@semantic-components/ui-lab';
```

## Usage

```html
<div scImageAnnotator [src]="imageSrc()" [width]="700" [height]="450" alt="Person standing by a lake" (annotationsChange)="onAnnotationsChange($event)" (save)="onSave($event)">
  <div scImageAnnotatorToolbar #toolbar="scImageAnnotatorToolbar">
    <div class="flex items-center gap-1 border-r pr-2">
      @for (tool of toolbar.tools(); track tool.id) {
      <button scImageAnnotatorToolButton [tool]="tool.id" [title]="tool.label">
        <!-- your icon for tool.id -->
      </button>
      }
    </div>

    <div class="flex items-center gap-1 border-r pr-2">
      @for (color of toolbar.colors(); track color.value) {
      <button scImageAnnotatorColorButton [color]="color.value" [title]="color.label"></button>
      }
    </div>

    <div class="flex items-center gap-2 border-r pr-2">
      <span class="text-muted-foreground text-xs">Width:</span>
      <input type="range" scImageAnnotatorLineWidth min="1" max="20" />
      <span class="w-4 text-xs">{{ toolbar.lineWidth() }}</span>
    </div>

    <div class="ml-auto flex items-center gap-1">
      <button scImageAnnotatorAction action="undo"><svg siUndo2Icon></svg></button>
      <button scImageAnnotatorAction action="redo"><svg siRedo2Icon></svg></button>
      <button scImageAnnotatorAction action="clear"><svg siTrash2Icon></svg></button>
      <button scImageAnnotatorAction action="download"><svg siDownloadIcon></svg></button>
    </div>
  </div>

  <div scImageAnnotatorCanvas></div>
</div>
```

Tool, color and action buttons get their accessible name automatically (the tool's label, the color's label, "Undo"…). Write a static `aria-label` to override it. Keep extra content (like a counter) **outside** the `scImageAnnotator` element or below it in a column layout — the annotator is `w-full` up to `width` px.

### Custom colors and tools

```html
<div scImageAnnotator [src]="src" [colors]="brandColors" [tools]="tools">…</div>
```

```typescript
readonly brandColors: AnnotatorColor[] = [
  { value: '#e11d48', label: 'Rose' },
  { value: '#0ea5e9', label: 'Sky' },
];
readonly tools: AnnotatorToolOption[] = [
  { id: 'pen', label: 'Pen' },
  { id: 'arrow', label: 'Arrow' },
  { id: 'eraser', label: 'Eraser' },
];
```

### Programmatic control

```html
<div scImageAnnotator #annotator="scImageAnnotator" [src]="src">…</div>
```

```typescript
readonly annotator = viewChild.required(ScImageAnnotator);

load(saved: Annotation[]) {
  this.annotator().setAnnotations(saved); // resets undo history, emits nothing
}
```

## API Reference

### ScImageAnnotator — `div[scImageAnnotator]`

| Input    | Type                    | Default                    | Description                                      |
| -------- | ----------------------- | -------------------------- | ------------------------------------------------ |
| `src`    | `string` (required)     | —                          | Image URL (served with CORS headers to download) |
| `width`  | `number`                | `600`                      | Image coordinate width and export width (px)     |
| `height` | `number`                | `400`                      | Image coordinate height and export height (px)   |
| `alt`    | `string`                | `'Annotated image'`        | Accessible name of the canvas (`role="img"`)     |
| `colors` | `AnnotatorColor[]`      | `DEFAULT_ANNOTATOR_COLORS` | Color palette (value + accessible label)         |
| `tools`  | `AnnotatorToolOption[]` | `DEFAULT_ANNOTATOR_TOOLS`  | Available tools                                  |
| `class`  | `string`                | `''`                       | Additional CSS classes                           |

| Output              | Type           | Description                                             |
| ------------------- | -------------- | ------------------------------------------------------- |
| `annotationsChange` | `Annotation[]` | After every user change: draw, erase, undo, redo, clear |
| `save`              | `string`       | PNG data URL, when the image is downloaded              |

Methods: `getAnnotations()`, `setAnnotations(annotations)`.

### ScImageAnnotatorToolbar — `div[scImageAnnotatorToolbar]`

`role="toolbar"` (aria `Toolbar`), named "Annotation tools" unless given an `aria-label`. Exposes `tools()`, `colors()`, `lineWidth()`, `hasAnnotations()` for the template (`exportAs: 'scImageAnnotatorToolbar'`).

### ScImageAnnotatorToolButton — `button[scImageAnnotatorToolButton]`

| Input  | Type             | Description      |
| ------ | ---------------- | ---------------- |
| `tool` | `AnnotationTool` | Tool to activate |

`aria-pressed` reflects the active tool.

### ScImageAnnotatorColorButton — `button[scImageAnnotatorColorButton]`

| Input   | Type     | Description        |
| ------- | -------- | ------------------ |
| `color` | `string` | Color value to use |

`aria-pressed` reflects the active color.

### ScImageAnnotatorLineWidth — `input[type="range"][scImageAnnotatorLineWidth]`

Stroke width. Named "Line width" unless given an `aria-label`. Its own Tab stop; its arrow keys change the value.

### ScImageAnnotatorAction — `button[scImageAnnotatorAction]`

| Input    | Type                                        | Description   |
| -------- | ------------------------------------------- | ------------- |
| `action` | `'undo' \| 'redo' \| 'clear' \| 'download'` | Action to run |

`aria-disabled` (still focusable) when there is nothing to undo, redo or clear, or before the image has loaded.

### ScImageAnnotatorCanvas — `div[scImageAnnotatorCanvas]`

The drawing surface. `role="img"` named by `alt`; `data-state="loading" | "ready"`; aspect ratio from `width`/`height`.

## Types

```typescript
type AnnotationTool = 'pen' | 'line' | 'rectangle' | 'circle' | 'arrow' | 'eraser';

interface Annotation {
  id: string;
  tool: Exclude<AnnotationTool, 'eraser'>;
  points: AnnotationPoint[]; // image coordinates
  color: string;
  lineWidth: number; // image units
}

interface AnnotatorColor {
  value: string;
  label: string;
}

interface AnnotatorToolOption {
  id: AnnotationTool;
  label: string;
}
```

## Tools

| Tool        | How to draw                                               |
| ----------- | --------------------------------------------------------- |
| `pen`       | Freehand; a click draws a dot                             |
| `line`      | Drag from start to end                                    |
| `rectangle` | Drag from one corner to the opposite one                  |
| `circle`    | Drag from the center outwards                             |
| `arrow`     | Drag from start to tip                                    |
| `eraser`    | Click or drag over strokes to remove them (one undo step) |

## Accessibility

- Toolbar: one Tab stop, ←/→ between buttons, Home/End; the width slider is a separate Tab stop.
- Every control has an accessible name; pressed/disabled states are exposed with `aria-pressed` / `aria-disabled`.
- The canvas is `role="img"` with `alt` as its name.
- Freehand drawing is path-dependent input, so it has no keyboard equivalent (WCAG 2.1.1 exception).

## Notes

- Downloading needs the image served with CORS headers (`crossorigin="anonymous"` is used); otherwise the browser blocks reading the canvas and `save` doesn't fire.
- `width`/`height` define the coordinate space: changing them does not rescale existing annotations.
