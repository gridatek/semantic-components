import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { BarcodeResult, ScBarcodeScanner } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-qr-code-barcode-scanner-demo',
  imports: [ScBarcodeScanner],
  template: `
    <sc-barcode-scanner
      [formats]="['qr_code']"
      (detected)="onDetected($event)"
      class="max-w-md"
    />
    @if (lastQR()) {
      <div class="bg-muted mt-3 max-w-md rounded-lg p-4">
        <p class="text-muted-foreground mb-1 text-sm">QR Code content:</p>
        <p class="font-mono text-sm break-all">{{ lastQR()?.rawValue }}</p>
      </div>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodeBarcodeScannerDemo {
  readonly lastQR = signal<BarcodeResult | null>(null);

  onDetected(result: BarcodeResult): void {
    this.lastQR.set(result);
  }
}
