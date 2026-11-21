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
  /** Where zxing-wasm's decoder is served; zxing-wasm's CDN when not given. */
  readonly wasmUrl?: string;
}

export const SC_BARCODE_SCANNER_CONFIG =
  new InjectionToken<ScBarcodeScannerConfig>('SC_BARCODE_SCANNER_CONFIG');

let ponyfill: Promise<ScBarcodeDetectorClass | null> | undefined;

/**
 * The browser's BarcodeDetector — or, where it has none, barcode-detector's
 * (its ponyfill: no global), loaded the first time it is needed. Null when
 * barcode-detector is not installed either.
 */
export function loadBarcodeDetector(
  wasmUrl?: string,
): Promise<ScBarcodeDetectorClass | null> {
  const native = (globalThis as { BarcodeDetector?: ScBarcodeDetectorClass })
    .BarcodeDetector;
  if (native) return Promise.resolve(native);
  ponyfill ??= import('barcode-detector/ponyfill')
    .then(({ BarcodeDetector, prepareZXingModule }) => {
      if (wasmUrl) {
        prepareZXingModule({
          overrides: {
            locateFile: (path: string, prefix: string) =>
              path.endsWith('.wasm') ? wasmUrl : prefix + path,
          },
        });
      }
      return BarcodeDetector as unknown as ScBarcodeDetectorClass;
    })
    .catch(() => null);
  return ponyfill;
}
