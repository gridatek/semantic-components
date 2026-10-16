# Image Cropper Next

The image cropper, rebuilt from parts. One set of parts crops both ways:

- **a box over the image** — put handles in the selection, and it is moved and resized over the image (as in document and photo editors);
- **a frame the image moves under** — no handles, and the selection is a fixed frame: the image is dragged, wheeled and pinched under it (as profile pictures are chosen).

## Architecture

```
scImageCropperNext (zoom, rotation, flipX, flipY, aspectRatio — area(), crop())
├── scImageCropperNextStage — give it a height
│   ├── img[scImageCropperNextImage] — your image, its src and alt
│   └── scImageCropperNextSelection — name it
│       ├── scImageCropperNextGrid — guide lines: columns, rows (3), restyled from its class
│       └── scImageCropperNextHandle × 8 — with any: a box
├── scImageCropperNextPreview → img[scImageCropperNextPreviewImage]
└── buttons: ZoomIn, ZoomOut, RotateLeft, RotateRight, FlipHorizontal, FlipVertical, Reset, AspectRatio
```

## Usage

```html
<div scImageCropperNext #cropper="scImageCropperNext" [(zoom)]="zoom">
  <div scImageCropperNextStage class="h-80 rounded-lg border">
    <img scImageCropperNextImage [src]="src()" alt="Mountains at dawn" />
    <div scImageCropperNextSelection aria-label="Crop area">
      <div scImageCropperNextGrid></div>
      @for (handle of handles; track handle) {
      <div [scImageCropperNextHandle]="handle"></div>
      }
    </div>
  </div>

  <input scSlider aria-label="Zoom" [min]="cropper.minZoom()" [max]="cropper.maxZoom()" [step]="0.01" [(value)]="zoom" />
  <button scImageCropperNextRotateRight><svg siRotateCwIcon></svg><span class="sr-only">Rotate right</span></button>
  <button scButton (click)="crop(cropper)">Crop</button>
</div>
```

```ts
async crop(cropper: ScImageCropperNext): Promise<void> {
  const blob = await cropper.crop({ type: 'image/webp', quality: 0.9, width: 512 });
  // upload it, or show it: URL.createObjectURL(blob)
}
```

A frame instead of a box: leave the handles out, and set a ratio and a shape — `<div scImageCropperNext shape="circle" [aspectRatio]="1">`.

## State

| On `scImageCropperNext` | Type                              | Default  |                                                               |
| ----------------------- | --------------------------------- | -------- | ------------------------------------------------------------- |
| `zoom`                  | `number` (two-way)                | `1`      | 1: the image fits the stage. Share it with a slider           |
| `maxZoom`               | `number`                          | `4`      | `minZoom()` is 1 for a box, what covers the frame for a frame |
| `rotation`              | `0 \| 90 \| 180 \| 270` (two-way) | `0`      | Quarter turns, clockwise                                      |
| `flipX`, `flipY`        | `boolean` (two-way)               | `false`  |                                                               |
| `aspectRatio`           | `number \| null` (two-way)        | `null`   | Width / height; free when null                                |
| `shape`                 | `'rect' \| 'circle'`              | `'rect'` | A circle crops to an ellipse, transparent around in a PNG     |

`area()` is the crop in the (turned) image's pixels; `crop({ type, quality, width })` makes it a `Blob`. Moving it yourself: `move()`, `resizeBy()`, `zoomBy()`, `pan()`, `rotate()`, `reset()`.

## The grid

`scImageCropperNextGrid` draws the lines between its `columns` and `rows` (3 each: thirds; 1: none that way). Faint at rest, clearer while the crop moves. Its lines are styled from its class — `class="*:border-amber-400"`, and `opacity-100` to keep them clear. Leave it out for no grid.

## The parts' buttons

Each styles itself with `buttonVariants()` (`outline`, `icon`; `variant` and `size` as on `scButton`) and is disabled until an image is in, and where it can't go further (zoom). Write each one's icon and name; `scImageCropperNextAspectRatio` (`[scImageCropperNextAspectRatio]="16 / 9"`, `null` for free) is pressed while its ratio is the one — put them in a group you name.

## Accessibility

- The selection is focusable and named by you: the arrows move the crop (Shift: by 10%), Alt + arrows resize it (with handles), + and − zoom. Under a frame, the arrows move the image.
- Handles and the grid are for the pointer, hidden from screen readers: the keyboard does what they do.
- Zoom with a real slider — your `input[scSlider]`, named.
- The preview's image and the cropped one are yours to describe (`alt`).

## Not here

A file input: show any file with `URL.createObjectURL(file)` as the image's `src` (see the demo). Free rotation (other than quarter turns).
