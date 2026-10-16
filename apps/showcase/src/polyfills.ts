// The web platform the libraries are written against, where the browser
// does not have it yet.
import { prepareZXingModule } from 'barcode-detector/polyfill';
import 'temporal-polyfill/global';

// BarcodeDetector's decoder: served by the app (assets), not a CDN; loaded
// on the first scan.
prepareZXingModule({
  overrides: {
    locateFile: (path: string, prefix: string) =>
      path.endsWith('.wasm') ? `/zxing/${path}` : prefix + path,
  },
});
