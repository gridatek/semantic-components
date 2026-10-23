# Image Annotator

Annotate an image. Annotations are shapes over your image — SVG, in the image's own pixels — not pixels painted on it: each one is selected, moved, resized, restyled and deleted, with the pointer or the keyboard. They are plain data, to store and show again, and the image with them is exported as a file.

## Architecture

```
scImageAnnotator (annotations, tool, color, width, selected, readonly, label — undo(), redo(), toBlob())
├── your toolbar: scImageAnnotatorTool, scImageAnnotatorColor, your input[scSlider] on width,
│                 scImageAnnotatorUndo / Redo / Delete / Clear
└── scImageAnnotatorStage — name it
    ├── img[scImageAnnotatorImage] — your image, its src and alt
    └── input[scImageAnnotatorTextInput] — where a note is written; name it
```

## Usage

```html
<div scImageAnnotator [(annotations)]="annotations" [(width)]="width" [label]="labelOf">
  <div role="group" aria-label="Tools">
    <button scImageAnnotatorTool="select"><svg siMousePointer2Icon></svg><span class="sr-only">Select</span></button>
    <button scImageAnnotatorTool="arrow"><svg siMoveUpRightIcon></svg><span class="sr-only">Arrow</span></button>
    <button scImageAnnotatorTool="text"><svg siTypeIcon></svg><span class="sr-only">Note</span></button>
  </div>
  <div role="group" aria-label="Colour">
    <button scImageAnnotatorColor="#e11d48"><span class="sr-only">Red</span></button>
  </div>
  <input scSlider aria-label="Width" [min]="1" [max]="16" [(value)]="width" />
  <button scImageAnnotatorUndo><svg siUndo2Icon></svg><span class="sr-only">Undo</span></button>

  <div scImageAnnotatorStage aria-label="Screenshot to review">
    <img scImageAnnotatorImage src="/screenshot.png" alt="The settings page" />
    <input scImageAnnotatorTextInput aria-label="Note" />
  </div>
</div>
```

```ts
readonly labelOf = (annotation: ScImageAnnotatorAnnotation) =>
  annotation.kind === 'text' ? `Note: ${annotation.text}` : NAMES[annotation.kind];

async export(annotator: ScImageAnnotator) {
  const blob = await annotator.toBlob({ type: 'image/webp', quality: 0.9 });
}
```

## Tools

`select` · `pen` (smoothed) · `highlighter` (wide, see-through) · `line` · `arrow` · `rectangle` · `ellipse` · `text` · `eraser` (removes whole annotations).

## State

| On `scImageAnnotator` | Type                                     | Default    |                                                                       |
| --------------------- | ---------------------------------------- | ---------- | --------------------------------------------------------------------- |
| `annotations`         | `ScImageAnnotatorAnnotation[]` (two-way) | `[]`       | Plain data: `{ id, kind, points, color, width, text? }`, image pixels |
| `tool`                | `ScImageAnnotatorToolName` (two-way)     | `'select'` |                                                                       |
| `color`, `width`      | two-way                                  | red, `4`   | Drawn with — and the selected annotation's                            |
| `selected`            | `string \| null` (two-way)               | `null`     | The selected annotation's id                                          |
| `readonly`            | `boolean`                                | `false`    | Shown, named, reached with Tab — not edited                           |
| `label`               | `(annotation) => string`                 | —          | Each annotation's name, yours to write                                |

`undo()`, `redo()`, `canUndo()`, `canRedo()` — one step per gesture (a drawing, a move, a resize, a note written, an eraser stroke). `toBlob({ type, quality })` renders the image with its annotations at its own size.

## Keyboard and screen readers

- Each annotation is focusable and named by your `label`; focused, it is selected.
- On an annotation: arrows move it (Shift: by 10%), Alt + arrows resize it, Delete removes it, Enter edits a note, Escape leaves it.
- On the stage (named by you): Enter places a shape of the current tool in the middle, focused — to move and size with the keys.
- Ctrl+Z / Ctrl+Shift+Z (or Ctrl+Y) anywhere in the annotator.
- Tools and colours are buttons you name, `aria-pressed` while picked; put them in groups you name.

## Styling

The stage is the image's size (`w-full`, its height follows). The parts' buttons style themselves as the preset's button (`ghost`, `icon`; `variant` and `size` as on `scButton`); colours are swatches, their colour from their value.

## Not here

Polygons, rotating shapes, layers, filters and other photo editing.
