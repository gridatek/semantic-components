import {
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

export type BarcodeFormat =
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

export interface BarcodeResult {
  rawValue: string;
  format: BarcodeFormat;
  boundingBox?: DOMRectReadOnly;
  cornerPoints?: { x: number; y: number }[];
}

// BarcodeDetector type declaration for browsers that support it
declare class BarcodeDetector {
  constructor(options?: { formats: string[] });
  detect(image: ImageBitmapSource): Promise<DetectedBarcode[]>;
  static getSupportedFormats(): Promise<string[]>;
}

interface DetectedBarcode {
  rawValue: string;
  format: string;
  boundingBox: DOMRectReadOnly;
  cornerPoints: { x: number; y: number }[];
}

export const SC_BARCODE_SCANNER = new InjectionToken<ScBarcodeScanner>(
  'SC_BARCODE_SCANNER',
);

@Directive({
  selector: '[scBarcodeScanner]',
  exportAs: 'scBarcodeScanner',
  providers: [{ provide: SC_BARCODE_SCANNER, useExisting: ScBarcodeScanner }],
  host: {
    'data-slot': 'barcode-scanner',
    '[class]': 'class()',
  },
})
export class ScBarcodeScanner {
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('bg-card border rounded-lg overflow-hidden block', this.classInput()),
  );

  readonly formats = input<BarcodeFormat[]>([
    'qr_code',
    'ean_13',
    'ean_8',
    'code_128',
    'code_39',
    'upc_a',
    'upc_e',
  ]);
  readonly continuous = input<boolean>(true);
  readonly scanInterval = input<number>(100);

  readonly detected = output<BarcodeResult>();
  readonly scanError = output<string>();

  readonly isSupported = signal(false);
  readonly isScanning = signal(false);
  readonly error = signal<string | null>(null);
  readonly lastResult = signal<BarcodeResult | null>(null);
  readonly hasMultipleCameras = signal(false);
  readonly hasTorch = signal(false);
  readonly torchOn = signal(false);

  private videoElement: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;
  private detector: BarcodeDetector | null = null;
  private scanIntervalId: ReturnType<typeof setInterval> | null = null;
  private currentFacingMode: 'user' | 'environment' = 'environment';
  private videoTrack: MediaStreamTrack | null = null;

  constructor() {
    this.isSupported.set('BarcodeDetector' in window);

    this.destroyRef.onDestroy(() => {
      this.stopScanning();
    });
  }

  setVideoElement(el: HTMLVideoElement): void {
    this.videoElement = el;
  }

  async startScanning(): Promise<void> {
    if (!this.isSupported()) return;

    this.error.set(null);

    try {
      this.detector = new BarcodeDetector({
        formats: this.formats() as string[],
      });

      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((d) => d.kind === 'videoinput');
      this.hasMultipleCameras.set(cameras.length > 1);

      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: this.currentFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (this.videoElement) {
        this.videoElement.srcObject = this.stream;
        await this.videoElement.play();
      }

      this.videoTrack = this.stream.getVideoTracks()[0];
      const capabilities =
        this.videoTrack?.getCapabilities?.() as MediaTrackCapabilities & {
          torch?: boolean;
        };
      this.hasTorch.set(!!capabilities?.torch);

      this.isScanning.set(true);
      this.startDetection();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to access camera';
      this.error.set(message);
      this.scanError.emit(message);
    }
  }

  stopScanning(): void {
    this.isScanning.set(false);

    if (this.scanIntervalId) {
      clearInterval(this.scanIntervalId);
      this.scanIntervalId = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }

    this.torchOn.set(false);
    this.videoTrack = null;
  }

  async switchCamera(): Promise<void> {
    this.currentFacingMode =
      this.currentFacingMode === 'environment' ? 'user' : 'environment';
    this.stopScanning();
    await this.startScanning();
  }

  async toggleTorch(): Promise<void> {
    if (!this.videoTrack) return;

    try {
      const newState = !this.torchOn();
      await this.videoTrack.applyConstraints({
        advanced: [{ torch: newState } as MediaTrackConstraintSet],
      });
      this.torchOn.set(newState);
    } catch {
      // Torch not supported or failed
    }
  }

  private startDetection(): void {
    if (this.scanIntervalId) {
      clearInterval(this.scanIntervalId);
    }

    this.scanIntervalId = setInterval(async () => {
      await this.detectBarcode();
    }, this.scanInterval());
  }

  private async detectBarcode(): Promise<void> {
    if (
      !this.videoElement ||
      !this.detector ||
      this.videoElement.readyState !== this.videoElement.HAVE_ENOUGH_DATA
    )
      return;

    try {
      const barcodes = await this.detector.detect(this.videoElement);

      if (barcodes.length > 0) {
        const barcode = barcodes[0];
        const result: BarcodeResult = {
          rawValue: barcode.rawValue,
          format: barcode.format as BarcodeFormat,
          boundingBox: barcode.boundingBox,
          cornerPoints: barcode.cornerPoints,
        };

        this.lastResult.set(result);
        this.detected.emit(result);

        if (!this.continuous()) {
          this.stopScanning();
        }
      }
    } catch {
      // Detection failed, continue scanning
    }
  }
}
