import {
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
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-single-scan-barcode-scanner-demo',
  imports: [
    ScBarcodeScanner,
    ScBarcodeVideo,
    SiCircleAlertIcon,
    SiScanBarcodeIcon,
  ],
  template: `
    <div
      scBarcodeScanner
      #scanner="scBarcodeScanner"
      [continuous]="false"
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
          }
        </div>
      }
    </div>

    @if (singleResult()) {
      <div
        class="mt-3 max-w-md rounded-lg border border-green-200 bg-green-50 p-4"
      >
        <p class="mb-1 text-sm text-green-800">Scan complete!</p>
        <p class="font-mono text-sm break-all text-green-900">
          {{ singleResult()?.rawValue }}
        </p>
      </div>
    }
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleScanBarcodeScannerDemo {
  readonly singleResult = signal<BarcodeResult | null>(null);

  onDetected(result: BarcodeResult): void {
    this.singleResult.set(result);
  }
}
