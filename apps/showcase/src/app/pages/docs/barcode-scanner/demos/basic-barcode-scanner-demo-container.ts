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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicBarcodeScannerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScBarcodeScanner, BarcodeResult } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-barcode-scanner-demo',
  imports: [ScBarcodeScanner],
  template: \`
    <sc-barcode-scanner (detected)="onDetected($event)" class="max-w-md" />
    @if (lastScanned()) {
      <div class="p-4 bg-muted rounded-lg max-w-md mt-3">
        <p class="text-sm text-muted-foreground mb-1">Last scanned:</p>
        <p class="font-mono text-sm break-all">
          {{ lastScanned()?.rawValue }}
        </p>
        <p class="text-xs text-muted-foreground mt-1">
          Format: {{ lastScanned()?.format }}
        </p>
      </div>
    }
  \`,
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
