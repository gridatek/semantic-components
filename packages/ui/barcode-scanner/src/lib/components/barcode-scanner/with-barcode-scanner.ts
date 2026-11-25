import { type ScFeature, makeScFeature } from '@semantic-components/ui';
import {
  SC_BARCODE_SCANNER_CONFIG,
  type ScBarcodeScannerConfig,
} from './barcode';

/**
 * Where your app serves the scanner's decoder, where the browser has no
 * BarcodeDetector, when not at `SC_BARCODE_WASM_URL`
 * (`/zxing/zxing_reader.wasm`): `provideSemanticComponents({ preset: { style }
 * }, withBarcodeScanner({ wasmUrl: '/assets/zxing_reader.wasm' }))`.
 */
export function withBarcodeScanner(
  config: ScBarcodeScannerConfig,
): ScFeature<'barcodeScanner'> {
  return makeScFeature('barcodeScanner', [
    { provide: SC_BARCODE_SCANNER_CONFIG, useValue: config },
  ]);
}
