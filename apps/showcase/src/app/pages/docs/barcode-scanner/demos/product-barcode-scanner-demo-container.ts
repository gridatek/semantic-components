import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ProductBarcodeScannerDemo } from './product-barcode-scanner-demo';

@Component({
  selector: 'app-product-barcode-scanner-demo-container',
  imports: [DemoContainer, ProductBarcodeScannerDemo],
  template: `
    <app-demo-container
      title="Product Barcode Scanner"
      description="Optimized for scanning product barcodes (EAN-13, EAN-8, UPC-A, UPC-E)."
      demoUrl="/demos/barcode-scanner/product-barcode-scanner-demo"
      [code]="code"
    >
      <app-product-barcode-scanner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBarcodeScannerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  BarcodeFormat,
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
  selector: 'app-product-barcode-scanner-demo',
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
      [formats]="productFormats"
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

    @if (lastProduct()) {
      <div class="bg-muted mt-3 max-w-md rounded-lg p-4">
        <p class="text-muted-foreground mb-1 text-sm">Product code:</p>
        <p class="font-mono text-lg">{{ lastProduct()?.rawValue }}</p>
        <p class="text-muted-foreground mt-1 text-xs">
          Format: {{ lastProduct()?.format }}
        </p>
      </div>
    }
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBarcodeScannerDemo {
  readonly lastProduct = signal<BarcodeResult | null>(null);

  readonly productFormats: BarcodeFormat[] = [
    'ean_13',
    'ean_8',
    'upc_a',
    'upc_e',
  ];

  onDetected(result: BarcodeResult): void {
    this.lastProduct.set(result);
  }
}`;
}
