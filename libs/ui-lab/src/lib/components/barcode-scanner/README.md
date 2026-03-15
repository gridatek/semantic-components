# Barcode Scanner

Directive-based barcode/QR code scanner using the Barcode Detection API. Directives provide camera and detection logic — consumers own the templates.

## Directives

- `ScBarcodeScanner` — root directive (`[scBarcodeScanner]`) managing camera, detection, and state
- `ScBarcodeVideo` — video directive (`video[scBarcodeVideo]`) that registers the video element with the scanner

## Usage

### Basic Usage

```html
<div scBarcodeScanner #scanner="scBarcodeScanner" (detected)="onDetected($event)">
  @if (!scanner.isSupported()) {
  <p>Barcode Scanner Not Supported</p>
  } @else {
  <video scBarcodeVideo class="aspect-video w-full object-cover"></video>

  <div>
    @if (!scanner.isScanning()) {
    <button (click)="scanner.startScanning()">Start Scanning</button>
    } @else {
    <button (click)="scanner.stopScanning()">Stop</button>
    }
  </div>
  }
</div>
```

### QR Code Only

```html
<div scBarcodeScanner #scanner="scBarcodeScanner" [formats]="['qr_code']" (detected)="onQRDetected($event)">
  <!-- template -->
</div>
```

### Single Scan Mode

```html
<div scBarcodeScanner #scanner="scBarcodeScanner" [continuous]="false" (detected)="onSingleScan($event)">
  <!-- stops scanning after first detection -->
</div>
```

### With Camera Controls

```html
@if (scanner.hasMultipleCameras() && scanner.isScanning()) {
<button (click)="scanner.switchCamera()" aria-label="Switch camera">Switch</button>
} @if (scanner.hasTorch() && scanner.isScanning()) {
<button (click)="scanner.toggleTorch()" aria-label="Toggle flashlight">Torch</button>
}
```

## API

### ScBarcodeScanner (`[scBarcodeScanner]`)

#### Inputs

| Input          | Type              | Default                      | Description                   |
| -------------- | ----------------- | ---------------------------- | ----------------------------- |
| `formats`      | `BarcodeFormat[]` | `['qr_code', 'ean_13', ...]` | Formats to detect             |
| `continuous`   | `boolean`         | `true`                       | Keep scanning after detection |
| `scanInterval` | `number`          | `100`                        | Detection interval (ms)       |
| `class`        | `string`          | `''`                         | Additional CSS classes        |

#### Outputs

| Output      | Type            | Description                 |
| ----------- | --------------- | --------------------------- |
| `detected`  | `BarcodeResult` | Emits when barcode detected |
| `scanError` | `string`        | Emits on error              |

#### Public API

| Property/Method        | Type                            | Description                        |
| ---------------------- | ------------------------------- | ---------------------------------- |
| `isSupported()`        | `Signal<boolean>`               | Whether Barcode API is available   |
| `isScanning()`         | `Signal<boolean>`               | Whether actively scanning          |
| `error()`              | `Signal<string \| null>`        | Current error message              |
| `lastResult()`         | `Signal<BarcodeResult \| null>` | Last detected barcode              |
| `hasMultipleCameras()` | `Signal<boolean>`               | Whether multiple cameras available |
| `hasTorch()`           | `Signal<boolean>`               | Whether torch/flashlight available |
| `torchOn()`            | `Signal<boolean>`               | Whether torch is on                |
| `startScanning()`      | `Promise<void>`                 | Start camera and detection         |
| `stopScanning()`       | `void`                          | Stop camera and detection          |
| `switchCamera()`       | `Promise<void>`                 | Toggle front/back camera           |
| `toggleTorch()`        | `Promise<void>`                 | Toggle flashlight                  |

### ScBarcodeVideo (`video[scBarcodeVideo]`)

Apply to a `<video>` element inside a `[scBarcodeScanner]` host. Automatically registers the video element with the scanner and sets `autoplay`, `playsinline`, `muted` attributes.

## Type Definitions

### BarcodeFormat

```typescript
type BarcodeFormat = 'aztec' | 'code_128' | 'code_39' | 'code_93' | 'codabar' | 'data_matrix' | 'ean_13' | 'ean_8' | 'itf' | 'pdf417' | 'qr_code' | 'upc_a' | 'upc_e';
```

### BarcodeResult

```typescript
interface BarcodeResult {
  rawValue: string;
  format: BarcodeFormat;
  boundingBox?: DOMRectReadOnly;
  cornerPoints?: { x: number; y: number }[];
}
```

## Browser Support

| Browser          | Support           |
| ---------------- | ----------------- |
| Chrome 83+       | Desktop & Android |
| Edge 83+         | Desktop           |
| Opera 69+        | Desktop & Android |
| Samsung Internet | Android           |
| Firefox          | Not supported     |
| Safari           | Not supported     |

For unsupported browsers, `scanner.isSupported()` returns `false` — consumers render their own fallback UI.

## Accessibility

- Keyboard accessible controls (consumer-provided)
- All interactive elements should have `aria-label` attributes
- `isSupported()` and `error()` signals enable accessible error states
