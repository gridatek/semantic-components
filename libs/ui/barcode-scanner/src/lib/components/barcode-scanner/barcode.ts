import { InjectionToken } from '@angular/core';

/** The formats of the BarcodeDetector API. */
export type ScBarcodeFormat =
  | 'aztec'
  | 'code_128'
  | 'code_39'
  | 'code_93'
  | 'codabar'
  | 'data_matrix'
  | 'ean_13'
  | 'ean_8'
  | 'itf'
  | 'pdf417'
  | 'qr_code'
  | 'upc_a'
  | 'upc_e';

/** A code read: its text, its format, and where it is (its corners). */
export interface ScBarcode {
  readonly rawValue: string;
  readonly format: ScBarcodeFormat;
  readonly cornerPoints: readonly { readonly x: number; readonly y: number }[];
}

/** Where the scanner is: off, asking for the camera, scanning — or why not. */
export type ScBarcodeScannerState =
  /** Off. */
  | 'idle'
  /** Asking for the camera. */
  | 'starting'
  | 'scanning'
  /** The camera was refused. */
  | 'denied'
  /** No camera, or it could not start. */
  | 'unavailable'
  /** Nothing to read codes with: no BarcodeDetector, and barcode-detector not installed. */
  | 'unsupported';

/** The standard BarcodeDetector, as far as the scanner uses it. */
export interface ScBarcodeDetector {
  detect(source: ImageBitmapSource): Promise<ScBarcode[]>;
}

interface ScBarcodeDetectorClass {
  new (options?: { formats?: readonly string[] }): ScBarcodeDetector;
}

/** The app's settings for the scanner: `withBarcodeScanner()`. */
export interface ScBarcodeScannerConfig {
  /**
   * Where your app serves zxing-wasm's decoder (`zxing_reader.wasm`):
   * `SC_BARCODE_WASM_URL` when not given. Never a CDN.
   */
  readonly wasmUrl?: string;
}

/**
 * Where the decoder is by default: served by your app, copied into its
 * assets from `node_modules/zxing-wasm/dist/reader` (output `zxing`).
 */
export const SC_BARCODE_WASM_URL = '/zxing/zxing_reader.wasm';

export const SC_BARCODE_SCANNER_CONFIG =
  new InjectionToken<ScBarcodeScannerConfig>('SC_BARCODE_SCANNER_CONFIG');

let ponyfill: Promise<ScBarcodeDetectorClass | null> | undefined;

/**
 * The browser's BarcodeDetector — or, where it has none, barcode-detector's
 * (its ponyfill: no global), loaded the first time it is needed. Null when
 * barcode-detector is not installed either.
 */
export function loadBarcodeDetector(
  wasmUrl = SC_BARCODE_WASM_URL,
): Promise<ScBarcodeDetectorClass | null> {
  const native = (globalThis as { BarcodeDetector?: ScBarcodeDetectorClass })
    .BarcodeDetector;
  if (native) return Promise.resolve(native);
  ponyfill ??= import('barcode-detector/ponyfill')
    .then(({ BarcodeDetector, prepareZXingModule }) => {
      // The app's copy, not zxing-wasm's CDN.
      prepareZXingModule({
        overrides: {
          locateFile: (path: string, prefix: string) =>
            path.endsWith('.wasm') ? wasmUrl : prefix + path,
        },
      });
      return BarcodeDetector as unknown as ScBarcodeDetectorClass;
    })
    .catch(() => null);
  return ponyfill;
}
