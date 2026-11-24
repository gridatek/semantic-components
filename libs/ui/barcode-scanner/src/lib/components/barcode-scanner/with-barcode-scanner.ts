import { type ScFeature, makeScFeature } from '@semantic-components/ui';
import {
  SC_BARCODE_SCANNER_CONFIG,
  type ScBarcodeScannerConfig,
} from './barcode';

/**
 * Where the scanner's decoder is served, where the browser has no
 * BarcodeDetector: `provideSemanticComponents({ preset: { style } }, withBarcodeScanner({
 * wasmUrl: '/zxing/zxing_reader.wasm' }))`. Without it, zxing-wasm's CDN.
 */
export function withBarcodeScanner(
  config: ScBarcodeScannerConfig,
): ScFeature<'barcodeScanner'> {
  return makeScFeature('barcodeScanner', [
    { provide: SC_BARCODE_SCANNER_CONFIG, useValue: config },
  ]);
}
