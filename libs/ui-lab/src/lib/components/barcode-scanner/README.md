# Barcode Scanner

Scan barcodes and QR codes using your device's camera with the Barcode Detection API.

## Components

- `ScBarcodeScanner` - Full-featured scanner with controls
- `ScBarcodeScannerSimple` - Simplified scanner wrapper

## Usage

```html
<sc-barcode-scanner (detected)="onDetected($event)" />
```

## API

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

### ScBarcodeScanner

| Input            | Type              | Default                      | Description                   |
| ---------------- | ----------------- | ---------------------------- | ----------------------------- |
| `formats`        | `BarcodeFormat[]` | `['qr_code', 'ean_13', ...]` | Formats to detect             |
| `showLastResult` | `boolean`         | `true`                       | Show last scanned code        |
| `continuous`     | `boolean`         | `true`                       | Keep scanning after detection |
| `scanInterval`   | `number`          | `100`                        | Detection interval (ms)       |
| `class`          | `string`          | -                            | Additional CSS classes        |

| Output     | Type            | Description                 |
| ---------- | --------------- | --------------------------- |
| `detected` | `BarcodeResult` | Emits when barcode detected |
| `error$`   | `string`        | Emits on error              |

## Examples

### Basic Usage

```html
<sc-barcode-scanner (detected)="onDetected($event)" />
```

```typescript
onDetected(result: BarcodeResult): void {
  console.log('Scanned:', result.rawValue);
  console.log('Format:', result.format);
}
```

### QR Code Only

```html
<sc-barcode-scanner [formats]="['qr_code']" (detected)="onQRDetected($event)" />
```

### Product Barcodes

```html
<sc-barcode-scanner [formats]="['ean_13', 'ean_8', 'upc_a', 'upc_e']" (detected)="onProductDetected($event)" />
```

### Single Scan Mode

Stop scanning after first detection:

```html
<sc-barcode-scanner [continuous]="false" (detected)="onSingleScan($event)" />
```

### Without Result Overlay

```html
<sc-barcode-scanner [showLastResult]="false" (detected)="handleResult($event)" />
```

## Features

- Real-time barcode detection
- Multiple barcode format support
- Front/back camera switching
- Flashlight/torch control (where supported)
- Scanning area indicator
- Last result overlay
- Start/stop controls
- Graceful fallback for unsupported browsers

## Browser Support

The Barcode Detection API is supported in:

| Browser          | Support           |
| ---------------- | ----------------- |
| Chrome 83+       | Desktop & Android |
| Edge 83+         | Desktop           |
| Opera 69+        | Desktop & Android |
| Samsung Internet | Android           |
| Firefox          | Not supported     |
| Safari           | Not supported     |

For unsupported browsers, the component displays a helpful message.

## Permissions

The scanner requires camera access. Users will be prompted to grant permission when scanning starts.

## Supported Barcode Formats

| Format        | Description                         |
| ------------- | ----------------------------------- |
| `qr_code`     | QR Code                             |
| `ean_13`      | European Article Number (13 digits) |
| `ean_8`       | European Article Number (8 digits)  |
| `upc_a`       | Universal Product Code A            |
| `upc_e`       | Universal Product Code E            |
| `code_128`    | Code 128                            |
| `code_39`     | Code 39                             |
| `code_93`     | Code 93                             |
| `codabar`     | Codabar                             |
| `itf`         | Interleaved 2 of 5                  |
| `pdf417`      | PDF417                              |
| `aztec`       | Aztec Code                          |
| `data_matrix` | Data Matrix                         |

## Accessibility

- Keyboard accessible controls
- ARIA labels on buttons
- Focus indicators
- Status messages for screen readers
