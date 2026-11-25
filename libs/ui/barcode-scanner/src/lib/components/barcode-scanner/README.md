# Barcode Scanner

Reads barcodes and QR codes from the camera or a picture, each code outlined where it is; with the browser's BarcodeDetector, or barcode-detector's where it has none.

`@semantic-components/ui/barcode-scanner`, with `barcode-detector` (an optional peer of ui) installed.

## Architecture

```
scBarcodeScanner (active — two-way; formats; (detected) — each new code)
│  state() · codes() (in the frame now) · scan(picture)
├── video[scBarcodeScannerVideo]          — the camera
├── svg[scBarcodeScannerOverlay]           — the codes, outlined where they are
├── button[scBarcodeScannerToggle]         — camera on / off
└── input[type=file][scBarcodeScannerFile] — scan a picture
```

## Usage

```html
<div scBarcodeScanner #scanner="scBarcodeScanner" (detected)="read($event)">
  <div scFrame class="relative aspect-4/3 overflow-hidden">
    <video scBarcodeScannerVideo></video>
    <svg scBarcodeScannerOverlay></svg>
  </div>
  <button scBarcodeScannerToggle>{{ scanner.active() ? 'Stop' : 'Scan' }}</button>
  <label for="picture">A picture of a code</label>
  <input id="picture" type="file" scBarcodeScannerFile />
</div>
```

The frame (`relative`, its size, `overflow-hidden`) is yours; the video fills it, the overlay follows the video. The camera is the one at the back, where there is one.

## Reading

- `(detected)` gives each new code: `{ rawValue, format, cornerPoints }`. The same code, still in view (or back within 1.5 s), is not new.
- To scan once, turn it off there: `scanner.active.set(false)` — or bind `[(active)]`.
- `formats`: the ones to read (`['qr_code']`, `['ean_13', 'upc_a']`…); none, all the browser reads.
- `scan(picture)` reads a `Blob` (a file) or an image; its codes come out of `(detected)` too, and it returns them. `scBarcodeScannerFile` does it for a file input (the style's input look).
- Frames are read as the video gives them (`requestVideoFrameCallback`), one at a time.

## States

`state()`: `idle` (off), `starting` (asking for the camera), `scanning`, `denied` (refused — the camera turns off), `unavailable` (no camera, or it could not start), `unsupported` (nothing to read with: no `BarcodeDetector`, and `barcode-detector` not installed). Say what each means, and offer a picture when there is no camera. `data-state` on the scanner.

## Browsers

The scanner reads with the browser's `BarcodeDetector` — the standard; Chromium on Android and macOS has it. Where there is none (Firefox, Safari, Chromium on Windows and Linux) it loads `barcode-detector/ponyfill` (on zxing-wasm) on the first scan, and only then: nothing is loaded where the browser has its own, and no global is set. Without `barcode-detector` installed, the state there is `unsupported`.

The decoder (`zxing_reader.wasm`, about 1 MB) is served by your app, never by a CDN: copy it into your assets — it's looked for at `/zxing/zxing_reader.wasm` (`SC_BARCODE_WASM_URL`):

```json
{ "glob": "zxing_reader.wasm", "input": "node_modules/zxing-wasm/dist/reader", "output": "zxing" }
```

Elsewhere, say where with `withBarcodeScanner()`:

```ts
provideSemanticComponents({ preset: { style } }, withBarcodeScanner({ wasmUrl: '/assets/zxing_reader.wasm' }));
```

## Accessibility

- A camera view is not for everyone: offer the picture (`scBarcodeScannerFile`, labelled) — and a field to type the code.
- Say each code read in a live region (`aria-live="polite"`); the video and the overlay are hidden from screen readers.
- The toggle's name follows the state (Scan, Stop): it says what a press does, so no `aria-pressed`.

## Not here

The front camera, the torch, zoom: rare for scanning, and the torch works on few devices. Beeps and vibration are yours, in `(detected)`. A viewfinder is your markup over the video.
