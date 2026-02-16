# Lightbox

Full-screen image viewer with zoom, navigation, and keyboard support. Built using the composable architecture pattern for maximum flexibility.

## Components

- `ScLightbox` (directive) - Root state management
- `ScLightboxContainer` - Full-screen overlay UI with all controls
- `ScLightboxTrigger` - Trigger directive to open lightbox at specific index
- `ScLightboxGallery` - Pre-built gallery grid with integrated lightbox

## Basic Usage

```html
<div scLightbox [images]="images">
  <div class="flex gap-4">
    @for (image of images; track image.src; let i = $index) {
    <button scLightboxTrigger [index]="i" class="w-32 h-32 rounded overflow-hidden">
      <img [src]="image.src" [alt]="image.alt" class="size-full object-cover" />
    </button>
    }
  </div>
  <div scLightboxContainer></div>
</div>
```

## API

### LightboxImage

```typescript
interface LightboxImage {
  src: string; // Full-size image URL
  alt?: string; // Alt text
  title?: string; // Title shown in bottom bar
  description?: string; // Description shown in bottom bar
  thumbnail?: string; // Thumbnail URL (uses src if not provided)
}
```

### ScLightbox (Directive)

The root directive that manages state.

**Selector:** `[scLightbox]`

**Inputs:**

| Input                 | Type              | Default | Description                  |
| --------------------- | ----------------- | ------- | ---------------------------- |
| `images`              | `LightboxImage[]` | `[]`    | Array of images to display   |
| `showThumbnails`      | `boolean`         | `true`  | Show thumbnail strip         |
| `showZoom`            | `boolean`         | `true`  | Show zoom controls           |
| `showCounter`         | `boolean`         | `true`  | Show image counter           |
| `showInfo`            | `boolean`         | `true`  | Show image title/description |
| `loop`                | `boolean`         | `true`  | Loop navigation at ends      |
| `closeOnOverlayClick` | `boolean`         | `true`  | Close when clicking overlay  |
| `closeOnEscape`       | `boolean`         | `true`  | Close on Escape key          |

**Two-way Bindings:**

| Model          | Type      | Default | Description                     |
| -------------- | --------- | ------- | ------------------------------- |
| `isOpen`       | `boolean` | `false` | Whether lightbox is open        |
| `currentIndex` | `number`  | `0`     | Current image index (0-indexed) |

**Outputs:**

| Output        | Type     | Description                |
| ------------- | -------- | -------------------------- |
| `opened`      | `number` | Emitted when opened        |
| `closed`      | `void`   | Emitted when closed        |
| `indexChange` | `number` | Emitted when image changes |

**Methods (via template reference):**

| Method              | Returns | Description            |
| ------------------- | ------- | ---------------------- |
| `open(index?)`      | `void`  | Open at specific index |
| `close()`           | `void`  | Close lightbox         |
| `next()`            | `void`  | Go to next image       |
| `previous()`        | `void`  | Go to previous image   |
| `goTo(index)`       | `void`  | Go to specific image   |
| `zoomIn()`          | `void`  | Increase zoom          |
| `zoomOut()`         | `void`  | Decrease zoom          |
| `resetZoom()`       | `void`  | Reset zoom to 100%     |
| `getCurrentImage()` | `Image` | Get current image data |

### ScLightboxContainer

The full-screen overlay component that renders all UI.

**Selector:** `[scLightboxContainer]`

**Inputs:**

| Input   | Type     | Default | Description          |
| ------- | -------- | ------- | -------------------- |
| `class` | `string` | `''`    | Additional CSS class |

**Content Projection Slots:**

- `[scLightboxCloseIcon]` - Custom close button icon
- `[scLightboxPrevIcon]` - Custom previous button icon
- `[scLightboxNextIcon]` - Custom next button icon
- `[scLightboxLoading]` - Custom loading indicator

### ScLightboxTrigger

Directive that opens the lightbox when clicked.

**Selector:** `[scLightboxTrigger]`

**Inputs:**

| Input   | Type     | Default | Description                     |
| ------- | -------- | ------- | ------------------------------- |
| `index` | `number` | `0`     | Image index to open (0-indexed) |

### ScLightboxGallery

Pre-built gallery grid with integrated lightbox.

**Selector:** `sc-lightbox-gallery`

**Inputs:**

| Input            | Type              | Default | Description               |
| ---------------- | ----------------- | ------- | ------------------------- |
| `images`         | `LightboxImage[]` | `[]`    | Array of images           |
| `columns`        | `number`          | `3`     | Number of grid columns    |
| `gap`            | `number`          | `4`     | Gap size (Tailwind scale) |
| `loop`           | `boolean`         | `true`  | Loop navigation           |
| `showCounter`    | `boolean`         | `true`  | Show counter              |
| `showInfo`       | `boolean`         | `true`  | Show image info           |
| `showZoom`       | `boolean`         | `true`  | Show zoom controls        |
| `showThumbnails` | `boolean`         | `true`  | Show thumbnails           |
| `class`          | `string`          | `''`    | Additional CSS class      |

## Examples

### Basic Lightbox

```html
<div scLightbox [images]="images">
  <div class="flex gap-4">
    @for (image of images; track image.src; let i = $index) {
    <button scLightboxTrigger [index]="i" class="w-32 h-32 rounded-lg overflow-hidden">
      <img [src]="image.src" [alt]="image.alt" class="size-full object-cover" />
    </button>
    }
  </div>
  <div scLightboxContainer></div>
</div>
```

```typescript
readonly images: LightboxImage[] = [
  { src: '/images/photo1.jpg', alt: 'Photo 1' },
  { src: '/images/photo2.jpg', alt: 'Photo 2' },
  { src: '/images/photo3.jpg', alt: 'Photo 3' },
];
```

### With Image Info

```html
<div scLightbox [images]="images">
  <div class="flex gap-4">
    @for (image of images; track image.src; let i = $index) {
    <button scLightboxTrigger [index]="i">
      <img [src]="image.thumbnail || image.src" [alt]="image.alt" />
    </button>
    }
  </div>
  <div scLightboxContainer></div>
</div>
```

```typescript
readonly images: LightboxImage[] = [
  {
    src: '/images/photo1.jpg',
    alt: 'Sunset',
    title: 'Beautiful Sunset',
    description: 'Taken at the beach during golden hour',
    thumbnail: '/images/photo1-thumb.jpg',
  },
  // ...
];
```

### Pre-built Gallery

```html
<scLightboxGallery [images]="images" class="grid-cols-4 gap-2 max-w-4xl" />
```

### Controlled Lightbox

```typescript
@Component({
  template: `
    <div scLightbox [images]="images" [(isOpen)]="isOpen" [(currentIndex)]="currentIndex">
      <button (click)="isOpen.set(true)">Open Lightbox</button>
      <div scLightboxContainer></div>
    </div>

    <p>Currently showing image {{ currentIndex() + 1 }}</p>
  `,
})
export class MyComponent {
  readonly isOpen = signal(false);
  readonly currentIndex = signal(0);
  readonly images: LightboxImage[] = [...];
}
```

### Open Programmatically

```typescript
@Component({
  template: `
    <div scLightbox #lightbox="scLightbox" [images]="images">
      <button (click)="lightbox.open(2)">Open at Image 3</button>
      <div scLightboxContainer></div>
    </div>
  `,
})
export class MyComponent {
  readonly images: LightboxImage[] = [...];
}
```

### Without Thumbnails or Zoom

```html
<div scLightbox [images]="images" [showThumbnails]="false" [showZoom]="false">
  <div class="flex gap-4">
    @for (image of images; track image.src; let i = $index) {
    <button scLightboxTrigger [index]="i">
      <img [src]="image.src" [alt]="image.alt" />
    </button>
    }
  </div>
  <div scLightboxContainer></div>
</div>
```

### Custom Icons

Use content projection to customize icons:

```html
<div scLightbox [images]="images">
  <div class="flex gap-4">
    @for (image of images; track image.src; let i = $index) {
    <button scLightboxTrigger [index]="i">
      <img [src]="image.src" [alt]="image.alt" />
    </button>
    }
  </div>

  <div scLightboxContainer>
    <!-- Custom close icon -->
    <svg scLightboxCloseIcon>
      <!-- Your custom close icon -->
    </svg>

    <!-- Custom navigation icons -->
    <svg scLightboxPrevIcon>
      <!-- Your custom prev icon -->
    </svg>
    <svg scLightboxNextIcon>
      <!-- Your custom next icon -->
    </svg>

    <!-- Custom loading indicator -->
    <div scLightboxLoading>
      <span>Loading...</span>
    </div>
  </div>
</div>
```

### Listen to Events

```typescript
@Component({
  template: `
    <div
      scLightbox
      [images]="images"
      (opened)="onOpened($event)"
      (closed)="onClosed()"
      (indexChange)="onIndexChange($event)"
    >
      <div class="flex gap-4">
        @for (image of images; track image.src; let i = $index) {
          <button scLightboxTrigger [index]="i">
            <img [src]="image.src" [alt]="image.alt" />
          </button>
        }
      </div>
      <div scLightboxContainer></div>
    </div>
  `,
})
export class MyComponent {
  readonly images: LightboxImage[] = [...];

  onOpened(index: number) {
    console.log('Lightbox opened at index:', index);
  }

  onClosed() {
    console.log('Lightbox closed');
  }

  onIndexChange(index: number) {
    console.log('Image changed to index:', index);
  }
}
```

### No Loop

```html
<div scLightbox [images]="images" [loop]="false">
  <!-- Previous/Next buttons will be disabled at start/end -->
  <div class="flex gap-4">
    @for (image of images; track image.src; let i = $index) {
    <button scLightboxTrigger [index]="i">
      <img [src]="image.src" [alt]="image.alt" />
    </button>
    }
  </div>
  <div scLightboxContainer></div>
</div>
```

## Keyboard Navigation

When lightbox is open:

| Key                | Action             |
| ------------------ | ------------------ |
| `←` / `ArrowLeft`  | Previous image     |
| `→` / `ArrowRight` | Next image         |
| `Escape`           | Close lightbox     |
| `+` / `=`          | Zoom in            |
| `-`                | Zoom out           |
| `0`                | Reset zoom to 100% |

## Composable Architecture

This component follows the composable architecture pattern:

- **Root Directive** (`sc-lightbox`): Manages all state (isOpen, currentIndex, zoom, images)
- **Container** (`sc-lightbox-container`): Renders full-screen overlay with complete UI (close button, navigation, image display, loading, zoom controls, thumbnails)
- **Trigger**: Directive to open lightbox at specific index
- **Gallery**: Pre-built component that combines everything

Benefits:

- Separation of concerns: state vs UI
- Container handles all rendering and user interactions
- Content projection for customizing icons and loading indicator
- Can use triggers anywhere in your template
- Gallery component provides quick setup for common use case

## Accessibility

- Full keyboard navigation support
- ARIA dialog role with proper labeling
- Screen reader announcements for image changes
- Focus management when opening/closing
- Escape key to close
- Touch-friendly controls for mobile

## Notes

- Images are preloaded for smooth transitions
- Zoom level persists during navigation
- Thumbnails show current image with visual indicator
- Body scroll is locked when lightbox is open
- Overlay click and Escape key can be disabled if needed
