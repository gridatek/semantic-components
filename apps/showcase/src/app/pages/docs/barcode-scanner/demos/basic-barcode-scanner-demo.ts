import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScBarcodeScanner, BarcodeResult } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-barcode-scanner-demo',
  imports: [ScBarcodeScanner],
  template: `
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicBarcodeScannerDemo {
  readonly lastScanned = signal<BarcodeResult | null>(null);

  onDetected(result: BarcodeResult): void {
    this.lastScanned.set(result);
  }
}
