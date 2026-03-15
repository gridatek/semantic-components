import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { QrCodeBarcodeScannerDemo } from './qr-code-barcode-scanner-demo';

@Component({
  selector: 'app-qr-code-barcode-scanner-demo-container',
  imports: [DemoContainer, QrCodeBarcodeScannerDemo],
  template: `
    <app-demo-container
      title="QR Code Scanner"
      description="Scanner configured to detect only QR codes."
      demoUrl="/demos/barcode-scanner/qr-code-barcode-scanner-demo"
      [code]="code"
    >
      <app-qr-code-barcode-scanner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodeBarcodeScannerDemoContainer {
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
  SiScanBarcodeIcon,
  SiSquareIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-qr-code-barcode-scanner-demo',
  imports: [
    ScBarcodeScanner,
    ScBarcodeVideo,
    SiCircleAlertIcon,
    SiScanBarcodeIcon,
    SiSquareIcon,
  ],
  template: \`
    <div
      scBarcodeScanner
      #scanner="scBarcodeScanner"
      [formats]="['qr_code']"
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
      } @else {
        <div class="relative">
          <video
            scBarcodeVideo
            class="bg-muted aspect-video w-full object-cover"
          ></video>
        </div>

        <div class="flex items-center gap-2 border-t p-4">
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
        </div>
      }
    </div>

    @if (lastQR()) {
      <div class="bg-muted mt-3 max-w-md rounded-lg p-4">
        <p class="text-muted-foreground mb-1 text-sm">QR Code content:</p>
        <p class="font-mono text-sm break-all">{{ lastQR()?.rawValue }}</p>
      </div>
    }
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodeBarcodeScannerDemo {
  readonly lastQR = signal<BarcodeResult | null>(null);

  onDetected(result: BarcodeResult): void {
    this.lastQR.set(result);
  }
}`;
}
