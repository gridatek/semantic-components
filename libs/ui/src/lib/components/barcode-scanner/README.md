# Barcode Scanner

The camera or a picture, each code outlined where it is, its states to explain — written against the standard `BarcodeDetector`.

## Architecture

```
scBarcodeScanner (active, camera, torch — two-way; formats; (detected) — each new code)
│  state() · codes() (in the frame now) · hasTorch() · canSwitchCamera() · scan(picture)
├── video[scBarcodeScannerVideo]         — the camera
├── svg[scBarcodeScannerOverlay]          — the codes, outlined where they are
├── div[scBarcodeScannerFinder]           — the viewfinder's corners
├── button[scBarcodeScannerToggle]        — camera on / off
├── button[scBarcodeScannerTorch]         — the light, where there is one
├── button[scBarcodeScannerSwitchCamera]  — front / back, where there are two
└── input[type=file][scBarcodeScannerFile] — scan a picture
```

## Usage

```html
<div scBarcodeScanner #scanner="scBarcodeScanner" (detected)="read($event)">
  <div class="relative aspect-[4/3] overflow-hidden rounded-lg">
    <video scBarcodeScannerVideo></video>
    <svg scBarcodeScannerOverlay></svg>
    <div scBarcodeScannerFinder></div>
  </div>
  <button scBarcodeScannerToggle>{{ scanner.active() ? 'Stop' : 'Scan' }}</button>
  <label for="picture">A picture of a code</label>
  <input id="picture" type="file" scBarcodeScannerFile />
</div>
```

The frame (`relative`, its size, `overflow-hidden`) is yours; the video fills it, the overlay follows the video.

## Reading

- `(detected)` gives each new code: `{ rawValue, format, cornerPoints }`. The same code, still in view (or back within 1.5 s), is not new.
- To scan once, turn it off there: `scanner.active.set(false)` — or bind `[(active)]`.
- `formats`: the ones to read (`['qr_code']`, `['ean_13', 'upc_a']`…); none, all the browser reads.
- `scan(picture)` reads a `Blob` (a file) or an image; its codes come out of `(detected)` too, and it returns them. `scBarcodeScannerFile` does it for a file input.
- Frames are read as the video gives them (`requestVideoFrameCallback`), one at a time.

## States

`state()`: `idle` (off), `starting` (asking for the camera), `scanning`, `denied` (refused — the camera turns off), `unavailable` (no camera, or it could not start), `unsupported` (no `BarcodeDetector`). Say what each means, and offer a picture when there is no camera. `data-state` on the scanner.

## Browsers

The scanner uses the global `BarcodeDetector` — the standard; Chromium on Android and macOS has it. Elsewhere the app adds it, as a polyfill — not the library: `barcode-detector/polyfill` (on zxing-wasm) in the app's `polyfills`, its decoder served with the app's assets:

```ts
// polyfills.ts
import { prepareZXingModule } from 'barcode-detector/polyfill';

prepareZXingModule({ overrides: { locateFile: (path, prefix) => (path.endsWith('.wasm') ? `/zxing/${path}` : prefix + path) } });
```

```json
{ "glob": "zxing_reader.wasm", "input": "node_modules/zxing-wasm/dist/reader", "output": "zxing" }
```

## Accessibility

- A camera view is not for everyone: offer the picture (`scBarcodeScannerFile`, labelled) — and a field to type the code.
- Say each code read in a live region (`aria-live="polite"`); the overlay and the finder are decorative.
- Name the buttons; Toggle and Torch are `aria-pressed`.

## Not here

Zoom, beeps and vibration (yours, in `(detected)`), scanning in a worker.
