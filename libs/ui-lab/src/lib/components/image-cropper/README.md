# Image Cropper

An interactive image cropping component with drag, resize, zoom, and aspect ratio controls. Built using the composable architecture pattern for maximum flexibility.

## Components

- `ScImageCropper` (directive) - Root state management
- `ScImageCropperContainer` - Interactive UI with crop area, grid, handles, and canvas
- `ScImageCropperControls` - Zoom slider with buttons
- `ScImageCropperPreview` - Live preview of the cropped area
- `ScImageCropperAspectRatio` - Aspect ratio selector buttons

## Basic Usage

```html
<div sc-image-cropper [src]="imageUrl" [(cropArea)]="cropArea" [containerHeight]="400">
  <div sc-image-cropper-container #container class="rounded-lg overflow-hidden border"></div>

  <div sc-image-cropper-controls></div>

  <button (click)="cropImage(container)">Crop</button>
</div>
```

```typescript
async cropImage(container: InstanceType<typeof ScImageCropperContainer>) {
  const result = await container.crop();
  console.log(result.dataUrl); // Base64 image
  console.log(result.blob); // Blob for upload
}
```

## API

### ScImageCropper (Directive)

The root directive that manages state.

**Selector:** `[sc-image-cropper]`

**Inputs:**

| Input             | Type                                          | Default       | Description            |
| ----------------- | --------------------------------------------- | ------------- | ---------------------- |
| `src`             | `string`                                      | Required      | Image source URL       |
| `aspectRatio`     | `number \| null`                              | `null`        | Lock aspect ratio      |
| `minWidth`        | `number`                                      | `50`          | Minimum crop width     |
| `minHeight`       | `number`                                      | `50`          | Minimum crop height    |
| `containerHeight` | `number`                                      | `400`         | Container height in px |
| `showGrid`        | `boolean`                                     | `true`        | Show rule of thirds    |
| `disabled`        | `boolean`                                     | `false`       | Disable interactions   |
| `outputType`      | `'image/png' \| 'image/jpeg' \| 'image/webp'` | `'image/png'` | Output format          |
| `outputQuality`   | `number`                                      | `0.92`        | JPEG/WebP quality      |

**Two-way Bindings:**

| Binding    | Type       | Description              |
| ---------- | ---------- | ------------------------ |
| `cropArea` | `CropArea` | Current crop coordinates |
| `zoom`     | `number`   | Current zoom level       |

**Outputs:**

| Output        | Type                                | Description       |
| ------------- | ----------------------------------- | ----------------- |
| `cropChange`  | `CropArea`                          | Crop area changed |
| `imageLoaded` | `{ width: number; height: number }` | Image loaded      |

### ScImageCropperContainer

The interactive UI component that renders the image, crop area, grid, handles, and hidden canvas.

**Selector:** `[sc-image-cropper-container]`

**Inputs:**

| Input   | Type     | Default | Description          |
| ------- | -------- | ------- | -------------------- |
| `class` | `string` | `''`    | Additional CSS class |

**Methods (via template reference):**

| Method            | Returns               | Description           |
| ----------------- | --------------------- | --------------------- |
| `crop()`          | `Promise<CropResult>` | Get cropped image     |
| `resetCropArea()` | `void`                | Reset to initial crop |

### ScImageCropperControls

Zoom slider with zoom in/out buttons.

**Selector:** `[sc-image-cropper-controls]`

**Inputs:**

| Input   | Type     | Default | Description          |
| ------- | -------- | ------- | -------------------- |
| `class` | `string` | `''`    | Additional CSS class |

### ScImageCropperPreview

Live preview of the cropped area.

**Selector:** `[sc-image-cropper-preview]`

**Inputs:**

| Input    | Type     | Default | Description          |
| -------- | -------- | ------- | -------------------- |
| `width`  | `number` | `200`   | Preview width        |
| `height` | `number` | `200`   | Preview height       |
| `class`  | `string` | `''`    | Additional CSS class |

### ScImageCropperAspectRatio

Aspect ratio selector with predefined options.

**Selector:** `[sc-image-cropper-aspect-ratio]`

**Inputs:**

| Input     | Type                                          | Default                  | Description          |
| --------- | --------------------------------------------- | ------------------------ | -------------------- |
| `options` | `Array<{label: string, value: number\|null}>` | `[Free, 1:1, 4:3, 16:9]` | Aspect ratio options |
| `class`   | `string`                                      | `''`                     | Additional CSS class |

**Outputs:**

| Output              | Type             | Description                     |
| ------------------- | ---------------- | ------------------------------- |
| `aspectRatioChange` | `number \| null` | Emits when aspect ratio changes |

## Examples

### Basic Cropping

```html
<div sc-image-cropper [src]="imageSrc()" [(cropArea)]="cropArea" [containerHeight]="400">
  <div sc-image-cropper-container #container class="rounded-lg border"></div>

  <div sc-image-cropper-controls></div>

  <button (click)="cropImage(container)">Crop Image</button>
</div>
```

```typescript
@Component({...})
export class MyComponent {
  readonly imageSrc = signal('https://example.com/image.jpg');
  readonly cropArea = signal<CropArea>({ x: 50, y: 50, width: 200, height: 200 });
  readonly croppedImage = signal<string | null>(null);

  async cropImage(container: InstanceType<typeof ScImageCropperContainer>) {
    const result = await container.crop();
    this.croppedImage.set(result.dataUrl);
  }
}
```

### With Aspect Ratio Selector

```html
<div sc-image-cropper [src]="imageSrc()" [aspectRatio]="selectedAspectRatio()" [containerHeight]="400">
  <div sc-image-cropper-container class="rounded-lg border"></div>

  <div sc-image-cropper-aspect-ratio [options]="aspectRatioOptions" (aspectRatioChange)="selectedAspectRatio.set($event)"></div>

  <div sc-image-cropper-controls></div>
</div>
```

```typescript
readonly selectedAspectRatio = signal<number | null>(null);
readonly aspectRatioOptions = [
  { label: 'Free', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
];
```

### Avatar Cropper with Preview

```html
<div sc-image-cropper [src]="imageSrc()" [aspectRatio]="1" [containerHeight]="300">
  <div sc-image-cropper-container class="rounded-lg border"></div>

  <div class="flex gap-8">
    <div class="flex-1">
      <div sc-image-cropper-controls></div>
    </div>

    <div class="space-y-4">
      <p class="text-sm font-medium">Preview:</p>
      <div sc-image-cropper-preview [width]="100" [height]="100" class="rounded-full overflow-hidden"></div>
    </div>
  </div>
</div>
```

### Custom Output Format

```html
<div sc-image-cropper [src]="imageSrc()" [outputType]="'image/jpeg'" [outputQuality]="0.9">
  <div sc-image-cropper-container #container></div>
  <button (click)="container.crop()">Crop as JPEG</button>
</div>
```

### File Upload + Cropping

```html
<div class="space-y-4">
  <input type="file" accept="image/*" (change)="onFileChange($event)" />

  @if (uploadedImage()) {
  <div sc-image-cropper [src]="uploadedImage()!" [containerHeight]="400">
    <div sc-image-cropper-container #container class="rounded-lg border"></div>

    <div sc-image-cropper-controls></div>

    <button (click)="cropAndDownload(container)">Crop & Download</button>
  </div>
  }
</div>
```

```typescript
readonly uploadedImage = signal<string | null>(null);

onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImage.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}

async cropAndDownload(container: InstanceType<typeof ScImageCropperContainer>) {
  const result = await container.crop();
  const link = document.createElement('a');
  link.href = result.dataUrl;
  link.download = 'cropped-image.png';
  link.click();
}
```

### Real-time Crop Info

```html
<div sc-image-cropper [src]="imageSrc()" [(cropArea)]="cropArea">
  <div sc-image-cropper-container class="rounded-lg border"></div>

  <div class="grid grid-cols-2 gap-4 text-sm">
    <div>X: {{ cropArea().x.toFixed(0) }}px</div>
    <div>Y: {{ cropArea().y.toFixed(0) }}px</div>
    <div>Width: {{ cropArea().width.toFixed(0) }}px</div>
    <div>Height: {{ cropArea().height.toFixed(0) }}px</div>
  </div>
</div>
```

## Types

### CropArea

```typescript
interface CropArea {
  x: number; // Left position
  y: number; // Top position
  width: number; // Crop width
  height: number; // Crop height
}
```

### CropResult

```typescript
interface CropResult {
  dataUrl: string; // Base64 data URL
  blob: Blob | null; // Blob for uploading
  width: number; // Output image width
  height: number; // Output image height
}
```

## Composable Architecture

This component follows the composable architecture pattern:

- **Root Directive** (`sc-image-cropper`): Manages all state (crop area, zoom, aspect ratio, drag/resize)
- **Container** (`sc-image-cropper-container`): Renders UI (image, overlay, crop area, grid, handles, canvas) and handles interactions
- **Controls**: Optional zoom controls
- **Preview**: Optional live preview
- **Aspect Ratio**: Optional aspect ratio selector

Benefits:

- Separation of concerns: state vs UI
- Container handles all interactions (mouse, touch, drag, resize)
- Can add custom UI elements between components
- Methods like `crop()` and `resetCropArea()` are called on the container via template reference

## Accessibility

- Keyboard support for fine adjustments
- Screen reader announcements for crop area changes
- Focus indicators for interactive elements
- Touch-friendly resize handles
- ARIA labels for all controls

## Notes

- Images are loaded via `<img>` and rendered on a hidden `<canvas>` for cropping
- The crop operation preserves the original image quality
- Supports zoom from 0.1x to 3x
- Aspect ratios are maintained during resize when specified
- All calculations are done in natural image coordinates for accuracy
