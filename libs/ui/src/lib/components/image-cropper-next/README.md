# Image Cropper Next

Choose the part of an image to keep, after Vercel's ui-sdk Image Cropper: a **box** moved and resized over the image (`mode="box"`, the default), or a **frame** the image moves under (`mode="frame"`, as profile pictures are chosen). The crop is one value — a box in the image's own pixels, with its quarter turn and flips — two-way, and `cropImage()` makes it a file.

## Architecture

```
scImageCropperNext ([(crop)], mode, aspectRatio, shape, minWidth, minHeight, maxZoom, disabled)
├── scImageCropperNextViewport — give it a height; pans, wheels and pinches in frame mode
│   ├── img[scImageCropperNextImage] — your src and alt
│   ├── scImageCropperNextSelection — a slider: name it, valueText
│   │   └── scImageCropperNextGrid — columns, rows (3), restyled from its class
│   └── scImageCropperNextHandle="n|ne|e|se|s|sw|w|nw" — box mode; sliders: name each
├── input[scImageCropperNextZoom] — the style's slider, 1 → mostZoom(); name it
├── button[scImageCropperNextRotate] — direction: clockwise | counterclockwise
├── button[scImageCropperNextFlip] — direction: horizontal | vertical
└── scImageCropperNextPreview → img[scImageCropperNextPreviewImage] — a live preview
```

## Usage

```html
<div scImageCropperNext aria-label="Photo" [(crop)]="crop" [aspectRatio]="ratio()">
  <div scImageCropperNextViewport class="h-80">
    <img scImageCropperNextImage src="/photo.jpg" alt="Mountains at dawn" />
    <div scImageCropperNextSelection aria-label="Crop" valueText="{width} by {height} pixels, at {x}, {y}">
      <div scImageCropperNextGrid></div>
    </div>
    @for (handle of handles; track handle.position) {
    <div [scImageCropperNextHandle]="handle.position" [attr.aria-label]="handle.label" valueText="{width} by {height} pixels"></div>
    }
  </div>
  <input scImageCropperNextZoom aria-label="Zoom" />
  <button scImageCropperNextRotate><svg siRotateCwIcon></svg><span class="sr-only">Rotate</span></button>
</div>
```

```ts
readonly crop = signal<ScImageCropNext | null>(null);

async save(): Promise<void> {
  const file = await cropImage('/photo.jpg', this.crop()!, { type: 'image/webp', quality: 0.9, width: 512 });
  // upload it, or show it: URL.createObjectURL(file)
}
```

## The crop

`{ x, y, width, height, rotation?, flipX?, flipY? }`: in the pixels of the image as shown — turned, then mirrored on the screen's axes. Written when the image loads (centred, at four fifths of the largest crop the ratio allows; all the frame in frame mode). Set it to restore a saved crop — one set before the first image loads is kept; set it to `null` to start again. Another image starts again.

Zoom is the crop's size: 1 is the largest box at its ratio; `maxZoom` (10) the smallest, or less where `minWidth` / `minHeight` come first (`mostZoom()`). In frame mode the frame stays the largest box at the ratio in the viewport, and the image is scaled under it.

Through `#c="scImageCropperNext"`: `zoom()`, `mostZoom()`, `loading()`, `dragging()`, `ready()`, `setZoom(zoom)`, `rotate(direction)`, `flip(direction)`, `focus()`.

## Keyboard and screen readers

- The root is a group you name; busy (`aria-busy`) until the image loads.
- The selection and each handle are WAI-ARIA sliders: the selection's value is its x, a handle's its width (its height for n and s). Their `valueText` is yours, with `{x}`, `{y}`, `{width}`, `{height}` written in the locale.
- Arrows move the selection, or a handle's edge (an edge takes only the arrows along it): one screen pixel, Shift ten. + and − zoom about the crop's middle; R turns the image a quarter, Shift + R back.
- Dragging: Shift on a handle keeps the ratio when it is free; Escape puts the crop back where the drag started. In frame mode the wheel zooms at the pointer and two fingers pinch.
- The zoom is the style's slider, read as a percentage in the locale.
- Disabled: nothing moves, the selection and handles leave the tab order, the controls are off.
- Right to left, the image is not mirrored: a photo has no direction.

## cropImage(source, crop, options)

`source`: a URL, a `Blob` / `File`, an `img` or an `ImageBitmap`. Options: `type` (`image/png`), `quality`, `width` / `height` (one alone: the other at the crop's ratio), `shape` (`'circle'`: an ellipse, its corners transparent), `name`. Returns a `File`. In the browser only; an image from another site needs CORS.

## Not here

A file input: show any file with `URL.createObjectURL(file)` as the image's `src`. Free rotation (other than quarter turns). A background for a circle in JPEG (its corners are black).
