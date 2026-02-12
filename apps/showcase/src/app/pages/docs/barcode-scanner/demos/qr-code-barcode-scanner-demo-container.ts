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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodeBarcodeScannerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScBarcodeScanner, BarcodeResult } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-qr-code-barcode-scanner-demo',
  imports: [ScBarcodeScanner],
  template: \`
    <sc-barcode-scanner
      [formats]="['qr_code']"
      (detected)="onDetected($event)"
      class="max-w-md"
    />
    @if (lastQR()) {
      <div class="p-4 bg-muted rounded-lg max-w-md mt-3">
        <p class="text-sm text-muted-foreground mb-1">QR Code content:</p>
        <p class="font-mono text-sm break-all">{{ lastQR()?.rawValue }}</p>
      </div>
    }
  \`,
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
