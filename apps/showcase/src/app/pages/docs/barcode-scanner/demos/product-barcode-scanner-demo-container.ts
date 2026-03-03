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
  host: { class: 'block' },
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
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-product-barcode-scanner-demo',
  imports: [ScBarcodeScanner],
  template: \`
    <sc-barcode-scanner
      [formats]="productFormats"
      (detected)="onDetected($event)"
      class="max-w-md"
    />
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
