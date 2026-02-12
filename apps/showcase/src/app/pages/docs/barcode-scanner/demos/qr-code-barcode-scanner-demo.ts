import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScBarcodeScanner, BarcodeResult } from '@semantic-components/ui-lab';

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
      <div class="p-4 bg-muted rounded-lg max-w-md mt-3">
        <p class="text-sm text-muted-foreground mb-1">QR Code content:</p>
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
