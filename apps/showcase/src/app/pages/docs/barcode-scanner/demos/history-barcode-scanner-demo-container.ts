import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HistoryBarcodeScannerDemo } from './history-barcode-scanner-demo';

@Component({
  selector: 'app-history-barcode-scanner-demo-container',
  imports: [DemoContainer, HistoryBarcodeScannerDemo],
  template: `
    <app-demo-container
      title="Scan History"
      description="Keep track of all scanned barcodes."
      demoUrl="/demos/barcode-scanner/history-barcode-scanner-demo"
      [code]="code"
    >
      <app-history-barcode-scanner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryBarcodeScannerDemoContainer {
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
  selector: 'app-history-barcode-scanner-demo',
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
      (detected)="addToHistory($event)"
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

    @if (scanHistory().length > 0) {
      <div class="mt-3 max-w-md">
        <div class="mb-2 flex items-center justify-between">
          <p class="text-sm font-medium">
            Scanned ({{ scanHistory().length }})
          </p>
          <button
            (click)="clearHistory()"
            class="text-muted-foreground hover:text-foreground text-sm"
          >
            Clear
          </button>
        </div>
        <div class="max-h-48 space-y-2 overflow-y-auto">
          @for (item of scanHistory(); track $index) {
            <div class="bg-muted rounded p-2 text-sm">
              <p class="font-mono break-all">{{ item.rawValue }}</p>
              <p class="text-muted-foreground text-xs">{{ item.format }}</p>
            </div>
          }
        </div>
      </div>
    }
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryBarcodeScannerDemo {
  readonly scanHistory = signal<BarcodeResult[]>([]);

  addToHistory(result: BarcodeResult): void {
    const current = this.scanHistory();
    if (!current.some((item) => item.rawValue === result.rawValue)) {
      this.scanHistory.set([result, ...current].slice(0, 20));
    }
  }

  clearHistory(): void {
    this.scanHistory.set([]);
  }
}`;
}
