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
import { BarcodeResult, ScBarcodeScanner } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-barcode-scanner-demo',
  imports: [ScBarcodeScanner],
  template: \`
    <sc-barcode-scanner (detected)="onDetected($event)" class="max-w-md" />
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
