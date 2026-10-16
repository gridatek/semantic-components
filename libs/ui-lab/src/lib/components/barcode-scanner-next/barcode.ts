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
  /** The browser cannot read codes (no BarcodeDetector). */
  | 'unsupported';

/** The standard BarcodeDetector, as far as the scanner uses it. */
export interface ScBarcodeDetector {
  detect(source: ImageBitmapSource): Promise<ScBarcode[]>;
}

interface ScBarcodeDetectorClass {
  new (options?: { formats?: readonly string[] }): ScBarcodeDetector;
}

/** The browser's BarcodeDetector (or one an app put there), if any. */
export const barcodeDetector = () =>
  (globalThis as { BarcodeDetector?: ScBarcodeDetectorClass }).BarcodeDetector;
