import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

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

@Component({
  selector: 'sc-barcode-scanner',
  template: `
    <div [class]="containerClass()">
      @if (!isSupported()) {
        <div class="flex flex-col items-center justify-center p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-12 text-muted-foreground mb-4"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <p class="text-lg font-medium mb-2">Barcode Scanner Not Supported</p>
          <p class="text-sm text-muted-foreground">
            Your browser doesn't support the Barcode Detection API. Try using
            Chrome, Edge, or Opera on desktop/Android.
          </p>
        </div>
      } @else if (error()) {
        <div class="flex flex-col items-center justify-center p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-12 text-destructive mb-4"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" x2="9" y1="9" y2="15" />
            <line x1="9" x2="15" y1="9" y2="15" />
          </svg>
          <p class="text-lg font-medium mb-2">Camera Error</p>
          <p class="text-sm text-muted-foreground mb-4">{{ error() }}</p>
          <button
            type="button"
            (click)="startScanning()"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      } @else {
        <!-- Video Preview -->
        <div class="relative">
          <video
            #videoElement
            [class]="videoClass()"
            autoplay
            playsinline
            muted
          ></video>

          <!-- Scanning Overlay -->
          @if (isScanning()) {
            <div class="absolute inset-0 pointer-events-none">
              <!-- Corner markers -->
              <div
                class="absolute inset-8 border-2 border-primary/50 rounded-lg"
              >
                <div
                  class="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"
                ></div>
                <div
                  class="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"
                ></div>
                <div
                  class="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"
                ></div>
                <div
                  class="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"
                ></div>
              </div>

              <!-- Scanning line animation -->
              <div class="absolute inset-x-8 top-8 bottom-8 overflow-hidden">
                <div class="h-0.5 bg-primary/80 animate-scan"></div>
              </div>
            </div>
          }

          <!-- Last detected barcode overlay -->
          @if (lastResult() && showLastResult()) {
            <div
              class="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-3 rounded-lg"
            >
              <p class="text-xs text-white/70 mb-1">
                {{ lastResult()?.format }}
              </p>
              <p class="font-mono text-sm break-all">
                {{ lastResult()?.rawValue }}
              </p>
            </div>
          }
        </div>

        <!-- Controls -->
        <div class="flex items-center justify-between p-4 border-t">
          <div class="flex items-center gap-2">
            @if (!isScanning()) {
              <button
                type="button"
                (click)="startScanning()"
                class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="size-4"
                >
                  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                  <rect width="10" height="8" x="7" y="8" rx="1" />
                </svg>
                Start Scanning
              </button>
            } @else {
              <button
                type="button"
                (click)="stopScanning()"
                class="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="size-4"
                >
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
                Stop
              </button>
            }

            <!-- Camera switch -->
            @if (hasMultipleCameras() && isScanning()) {
              <button
                type="button"
                (click)="switchCamera()"
                class="p-2 border rounded-md hover:bg-accent"
                aria-label="Switch camera"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="size-5"
                >
                  <path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
                  <path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="m18 22-3-3 3-3" />
                  <path d="m6 2 3 3-3 3" />
                </svg>
              </button>
            }
          </div>

          <!-- Torch toggle -->
          @if (hasTorch() && isScanning()) {
            <button
              type="button"
              (click)="toggleTorch()"
              [class]="
                torchOn()
                  ? 'p-2 bg-yellow-500 text-white rounded-md'
                  : 'p-2 border rounded-md hover:bg-accent'
              "
              aria-label="Toggle flashlight"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="size-5"
              >
                <path
                  d="M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z"
                />
                <line x1="6" x2="18" y1="6" y2="6" />
                <line x1="12" x2="12" y1="12" y2="12" />
              </svg>
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: `
    @keyframes scan {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(calc(100% - 2px));
      }
    }
    .animate-scan {
      animation: scan 2s ease-in-out infinite;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScBarcodeScanner {
  private readonly destroyRef = inject(DestroyRef);
  private readonly videoRef =
    viewChild<ElementRef<HTMLVideoElement>>('videoElement');

  // Inputs
  readonly formats = input<BarcodeFormat[]>([
    'qr_code',
    'ean_13',
    'ean_8',
    'code_128',
    'code_39',
    'upc_a',
    'upc_e',
  ]);
  readonly showLastResult = input<boolean>(true);
  readonly continuous = input<boolean>(true);
  readonly scanInterval = input<number>(100);
  readonly class = input<string>('');

  // Outputs
  readonly detected = output<BarcodeResult>();
  readonly error$ = output<string>();

  // Internal state
  readonly isSupported = signal(false);
  readonly isScanning = signal(false);
  readonly error = signal<string | null>(null);
  readonly lastResult = signal<BarcodeResult | null>(null);
  readonly hasMultipleCameras = signal(false);
  readonly hasTorch = signal(false);
  readonly torchOn = signal(false);

  private stream: MediaStream | null = null;
  private detector: BarcodeDetector | null = null;
  private scanIntervalId: ReturnType<typeof setInterval> | null = null;
  private currentFacingMode: 'user' | 'environment' = 'environment';
  private videoTrack: MediaStreamTrack | null = null;

  protected readonly containerClass = computed(() =>
    cn('bg-card border rounded-lg overflow-hidden', this.class()),
  );

  protected readonly videoClass = computed(() =>
    cn('w-full aspect-video object-cover bg-muted'),
  );

  constructor() {
    // Check for BarcodeDetector support
    this.isSupported.set('BarcodeDetector' in window);

    this.destroyRef.onDestroy(() => {
      this.stopScanning();
    });
  }

  async startScanning(): Promise<void> {
    if (!this.isSupported()) return;

    this.error.set(null);

    try {
      // Initialize detector
      this.detector = new BarcodeDetector({
        formats: this.formats() as string[],
      });

      // Check for multiple cameras
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((d) => d.kind === 'videoinput');
      this.hasMultipleCameras.set(cameras.length > 1);

      // Request camera access
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: this.currentFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      const video = this.videoRef()?.nativeElement;
      if (video) {
        video.srcObject = this.stream;
        await video.play();
      }

      // Check for torch support
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
      this.error$.emit(message);
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

    const video = this.videoRef()?.nativeElement;
    if (video) {
      video.srcObject = null;
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
    const video = this.videoRef()?.nativeElement;
    if (!video || !this.detector || video.readyState !== video.HAVE_ENOUGH_DATA)
      return;

    try {
      const barcodes = await this.detector.detect(video);

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
