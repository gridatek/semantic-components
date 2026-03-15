import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicBarcodeScannerDemo } from './basic-barcode-scanner-demo';

@Component({
  selector: 'app-basic-barcode-scanner-demo-container',
  imports: [DemoContainer, BasicBarcodeScannerDemo],
  template: `
    <app-demo-container
      title="Basic Barcode Scanner"
      description="Scan barcodes using your device's camera. Supports QR codes, EAN, UPC, and more."
      demoUrl="/demos/barcode-scanner/basic-barcode-scanner-demo"
      [code]="code"
    >
      <app-basic-barcode-scanner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicBarcodeScannerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  BarcodeResult,
  ScBarcodeScanner,
  ScBarcodeVideo,
} from '@semantic-components/ui-lab';
import {
  SiCircleAlertIcon,
  SiCircleXIcon,
  SiFlashlightIcon,
  SiScanBarcodeIcon,
  SiSquareIcon,
  SiSwitchCameraIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-barcode-scanner-demo',
  imports: [
    ScBarcodeScanner,
    ScBarcodeVideo,
    SiCircleAlertIcon,
    SiCircleXIcon,
    SiScanBarcodeIcon,
    SiSquareIcon,
    SiSwitchCameraIcon,
    SiFlashlightIcon,
  ],
  template: \`
    <div
      scBarcodeScanner
      #scanner="scBarcodeScanner"
      (detected)="onDetected($event)"
      class="max-w-md"
    >
      @if (!scanner.isSupported()) {
        <div class="flex flex-col items-center justify-center p-8 text-center">
          <svg
            siCircleAlertIcon
            class="text-muted-foreground mb-4 size-12"
          ></svg>
          <p class="mb-2 text-lg font-medium">Barcode Scanner Not Supported</p>
          <p class="text-muted-foreground text-sm">
            Your browser doesn't support the Barcode Detection API.
          </p>
        </div>
      } @else if (scanner.error()) {
        <div class="flex flex-col items-center justify-center p-8 text-center">
          <svg siCircleXIcon class="text-destructive mb-4 size-12"></svg>
          <p class="mb-2 text-lg font-medium">Camera Error</p>
          <p class="text-muted-foreground mb-4 text-sm">
            {{ scanner.error() }}
          </p>
          <button
            type="button"
            (click)="scanner.startScanning()"
            class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
          >
            Try Again
          </button>
        </div>
      } @else {
        <div class="relative">
          <video
            scBarcodeVideo
            class="bg-muted aspect-video w-full object-cover"
          ></video>

          @if (scanner.isScanning()) {
            <div class="pointer-events-none absolute inset-0">
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
              <div class="absolute inset-x-8 top-8 bottom-8 overflow-hidden">
                <div class="bg-primary/80 animate-scan h-0.5"></div>
              </div>
            </div>
          }

          @if (scanner.lastResult()) {
            <div
              class="absolute right-4 bottom-4 left-4 rounded-lg bg-black/80 p-3 text-white"
            >
              <p class="mb-1 text-xs text-white/70">
                {{ scanner.lastResult()?.format }}
              </p>
              <p class="font-mono text-sm break-all">
                {{ scanner.lastResult()?.rawValue }}
              </p>
            </div>
          }
        </div>

        <div class="flex items-center justify-between border-t p-4">
          <div class="flex items-center gap-2">
            @if (!scanner.isScanning()) {
              <button
                type="button"
                (click)="scanner.startScanning()"
                class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2"
              >
                <svg siScanBarcodeIcon class="size-4"></svg>
                Start Scanning
              </button>
            } @else {
              <button
                type="button"
                (click)="scanner.stopScanning()"
                class="hover:bg-accent inline-flex items-center gap-2 rounded-md border px-4 py-2"
              >
                <svg siSquareIcon class="size-4"></svg>
                Stop
              </button>
            }

            @if (scanner.hasMultipleCameras() && scanner.isScanning()) {
              <button
                type="button"
                (click)="scanner.switchCamera()"
                class="hover:bg-accent rounded-md border p-2"
                aria-label="Switch camera"
              >
                <svg siSwitchCameraIcon class="size-5"></svg>
              </button>
            }
          </div>

          @if (scanner.hasTorch() && scanner.isScanning()) {
            <button
              type="button"
              (click)="scanner.toggleTorch()"
              [class]="
                scanner.torchOn()
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

    @if (lastScanned()) {
      <div class="bg-muted mt-3 max-w-md rounded-lg p-4">
        <p class="text-muted-foreground mb-1 text-sm">Last scanned:</p>
        <p class="font-mono text-sm break-all">
          {{ lastScanned()?.rawValue }}
        </p>
        <p class="text-muted-foreground mt-1 text-xs">
          Format: {{ lastScanned()?.format }}
        </p>
      </div>
    }
  \`,
  styles: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicBarcodeScannerDemo {
  readonly lastScanned = signal<BarcodeResult | null>(null);

  onDetected(result: BarcodeResult): void {
    this.lastScanned.set(result);
  }
}`;
}
