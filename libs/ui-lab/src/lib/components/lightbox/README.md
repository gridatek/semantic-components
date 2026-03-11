# Lightbox

Full-screen image viewer with zoom, navigation, and keyboard support. Built with CDK Overlay, composable directives, and Carousel for image navigation.

## Architecture

```
ScLightboxProvider (div[scLightboxProvider])  ← State + CDK Overlay + backdrop + focus trap + keyboard
├── ScLightboxTrigger                  ← Opens lightbox at a given index
├── ScLightboxGallery                  ← Grid layout for thumbnails
│   └── ScLightboxGalleryItem          ← Individual grid item (click to open)
└── ScLightboxPortal (ng-template)     ← Content projected into the overlay
    ├── ScLightboxContainer            ← Dialog wrapper (role="dialog", aria-modal)
    ├── ScLightboxImage                ← Displays current image with zoom transform
    └── ScLightboxThumbnail            ← Thumbnail strip item with active ring
```

State flows through the `SC_LIGHTBOX` injection token. Child directives inject it to read/write shared state (e.g., `lightbox.currentIndex()`, `lightbox.close()`).

## Components

### ScLightboxProvider

Root component that owns all state and manages the CDK Overlay lifecycle (create/attach/detach), backdrop animation, focus trapping, and keyboard shortcuts (+, -, 0, Esc).

**Selector:** `div[scLightboxProvider]` | **Export:** `scLightbox`

| Inputs          | Type              | Default | Description                |
| --------------- | ----------------- | ------- | -------------------------- |
| `images`        | `LightboxImage[]` | `[]`    | Array of images to display |
| `loop`          | `boolean`         | `true`  | Loop navigation at ends    |
| `closeOnEscape` | `boolean`         | `true`  | Close on Escape key        |

| Models         | Type      | Default | Description              |
| -------------- | --------- | ------- | ------------------------ |
| `isOpen`       | `boolean` | `false` | Whether lightbox is open |
| `currentIndex` | `number`  | `0`     | Current image index      |

| Outputs  | Type     | Description         |
| -------- | -------- | ------------------- |
| `opened` | `number` | Emitted when opened |
| `closed` | `void`   | Emitted when closed |

| Methods         | Description            |
| --------------- | ---------------------- |
| `open(index?)`  | Open at specific index |
| `close()`       | Close lightbox         |
| `goTo(index)`   | Navigate to image      |
| `zoomIn()`      | Increase zoom (+0.25)  |
| `zoomOut()`     | Decrease zoom (-0.25)  |
| `resetZoom()`   | Reset zoom to 1        |
| `onImageLoad()` | Mark image as loaded   |

| Signals        | Type       | Description           |
| -------------- | ---------- | --------------------- |
| `zoomLevel`    | `number`   | Current zoom (0.5-3)  |
| `imageLoading` | `boolean`  | Image loading state   |
| `currentImage` | `computed` | Current LightboxImage |

### ScLightboxPortal

Marks an `ng-template` whose content gets projected into the overlay.

**Selector:** `ng-template[scLightboxPortal]`

### ScLightboxContainer

Dialog wrapper with `role="dialog"` and dynamic `aria-label`.

**Selector:** `[scLightboxContainer]`

### ScLightboxTrigger

Opens the lightbox on click.

**Selector:** `[scLightboxTrigger]`

| Input   | Type     | Default | Description   |
| ------- | -------- | ------- | ------------- |
| `index` | `number` | `0`     | Image to open |

### ScLightboxImage

Displays the current image with zoom transform. Binds `src`, `alt`, `transform: scale()`, and emits `onImageLoad()`.

**Selector:** `img[scLightboxImage]`

### ScLightboxThumbnail

Thumbnail button with active ring indicator. Calls `lightbox.goTo(index)` on click.

**Selector:** `[scLightboxThumbnail]`

| Input   | Type     | Required | Description |
| ------- | -------- | -------- | ----------- |
| `index` | `number` | yes      | Image index |

### ScLightboxGallery / ScLightboxGalleryItem

Grid layout directives for building thumbnail galleries.

**Selectors:** `[scLightboxGallery]`, `[scLightboxGalleryItem]`

## LightboxImage

```typescript
interface LightboxImage {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}
```

## Usage

### Basic

```html
<div scLightboxProvider [images]="images">
  <div class="flex gap-4">
    @for (image of images; track image.src; let i = $index) {
    <button scLightboxTrigger [index]="i" class="h-32 w-32 overflow-hidden rounded">
      <img [src]="image.src" [alt]="image.alt" class="size-full object-cover" />
    </button>
    }
  </div>

  <ng-template scLightboxPortal>
    <div scLightboxContainer>
      <!-- your lightbox UI here: image, controls, thumbnails -->
    </div>
  </ng-template>
</div>
```

### Controlled

```html
<div scLightboxProvider [images]="images" [(isOpen)]="isOpen" [(currentIndex)]="currentIndex">...</div>
```

### Programmatic

```html
<div scLightboxProvider #lightbox="scLightboxProvider" [images]="images">
  <button (click)="lightbox.open(2)">Open at Image 3</button>
  ...
</div>
```

## Keyboard Shortcuts

| Key     | Action         |
| ------- | -------------- |
| `←`     | Previous image |
| `→`     | Next image     |
| `Esc`   | Close          |
| `+`/`=` | Zoom in        |
| `-`     | Zoom out       |
| `0`     | Reset zoom     |

Arrow keys are handled by the Carousel inside the container template. Esc/zoom keys are handled by the CDK Overlay keydown events in `ScLightboxProvider`.

## Notes

- `ScLightboxProvider` was created by merging the former `ScLightboxDirective` (state) and `ScLightboxProvider` (overlay) into a single component, eliminating the extra `<div scLightboxProvider>` wrapper in templates.

## Accessibility

- `role="dialog"` with `aria-modal="true"` on container
- Dynamic `aria-label`: "Image gallery, showing image X of Y"
- `cdkTrapFocus` with auto-capture in overlay
- Thumbnail buttons have `aria-label`: "Go to image X"
- Escape key closes lightbox
- Backdrop click closes lightbox
