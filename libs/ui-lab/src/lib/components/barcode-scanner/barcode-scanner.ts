import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiCircleAlertIcon,
  SiCircleXIcon,
  SiFlashlightIcon,
  SiScanBarcodeIcon,
  SiSquareIcon,
  SiSwitchCameraIcon,
} from '@semantic-icons/lucide-icons';

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
  imports: [
    SiCircleAlertIcon,
    SiCircleXIcon,
    SiScanBarcodeIcon,
    SiSquareIcon,
    SiSwitchCameraIcon,
    SiFlashlightIcon,
  ],
  template: `
    <div [class]="containerClass()">
      @if (!isSupported()) {
        <div class="flex flex-col items-center justify-center p-8 text-center">
          <svg
            siCircleAlertIcon
            class="text-muted-foreground mb-4 size-12"
          ></svg>
          <p class="mb-2 text-lg font-medium">Barcode Scanner Not Supported</p>
          <p class="text-muted-foreground text-sm">
            Your browser doesn't support the Barcode Detection API. Try using
            Chrome, Edge, or Opera on desktop/Android.
          </p>
        </div>
      } @else if (error()) {
        <div class="flex flex-col items-center justify-center p-8 text-center">
          <svg siCircleXIcon class="text-destructive mb-4 size-12"></svg>
          <p class="mb-2 text-lg font-medium">Camera Error</p>
          <p class="text-muted-foreground mb-4 text-sm">{{ error() }}</p>
          <button
            type="button"
            (click)="startScanning()"
            class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
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
            <div class="pointer-events-none absolute inset-0">
              <!-- Corner markers -->
              <div
                class="border-primary/50 absolute inset-8 rounded-lg border-2"
              >
                <div
                  class="border-primary absolute -top-0.5 -left-0.5 h-8 w-8 rounded-tl-lg border-t-4 border-l-4"
                ></div>
                <div
                  class="border-primary absolute -top-0.5 -right-0.5 h-8 w-8 rounded-tr-lg border-t-4 border-r-4"
                ></div>
                <div
                  class="border-primary absolute -bottom-0.5 -left-0.5 h-8 w-8 rounded-bl-lg border-b-4 border-l-4"
                ></div>
                <div
                  class="border-primary absolute -right-0.5 -bottom-0.5 h-8 w-8 rounded-br-lg border-r-4 border-b-4"
                ></div>
              </div>

              <!-- Scanning line animation -->
              <div class="absolute inset-x-8 top-8 bottom-8 overflow-hidden">
                <div class="bg-primary/80 animate-scan h-0.5"></div>
              </div>
            </div>
          }

          <!-- Last detected barcode overlay -->
          @if (lastResult() && showLastResult()) {
            <div
              class="absolute right-4 bottom-4 left-4 rounded-lg bg-black/80 p-3 text-white"
            >
              <p class="mb-1 text-xs text-white/70">
                {{ lastResult()?.format }}
              </p>
              <p class="font-mono text-sm break-all">
                {{ lastResult()?.rawValue }}
              </p>
            </div>
          }
        </div>

        <!-- Controls -->
        <div class="flex items-center justify-between border-t p-4">
          <div class="flex items-center gap-2">
            @if (!isScanning()) {
              <button
                type="button"
                (click)="startScanning()"
                class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2"
              >
                <svg siScanBarcodeIcon class="size-4"></svg>
                Start Scanning
              </button>
            } @else {
              <button
                type="button"
                (click)="stopScanning()"
                class="hover:bg-accent inline-flex items-center gap-2 rounded-md border px-4 py-2"
              >
                <svg siSquareIcon class="size-4"></svg>
                Stop
              </button>
            }

            <!-- Camera switch -->
            @if (hasMultipleCameras() && isScanning()) {
              <button
                type="button"
                (click)="switchCamera()"
                class="hover:bg-accent rounded-md border p-2"
                aria-label="Switch camera"
              >
                <svg siSwitchCameraIcon class="size-5"></svg>
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
                  ? 'rounded-md bg-yellow-500 p-2 text-white'
                  : 'hover:bg-accent rounded-md border p-2'
              "
              aria-label="Toggle flashlight"
            >
              <svg siFlashlightIcon class="size-5"></svg>
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
