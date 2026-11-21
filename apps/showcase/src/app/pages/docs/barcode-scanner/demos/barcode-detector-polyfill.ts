// BarcodeDetector where the browser has none (Firefox, Safari, Chromium on
// Windows and Linux): barcode-detector, on zxing-wasm. Imported by the
// scanner's demos only, so the other pages don't load it. Its decoder is
// served by the app (assets), not a CDN, and loaded on the first scan.
import { prepareZXingModule } from 'barcode-detector/polyfill';

prepareZXingModule({
  overrides: {
    locateFile: (path: string, prefix: string) =>
      path.endsWith('.wasm') ? `/zxing/${path}` : prefix + path,
  },
});
