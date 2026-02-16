import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScBarcodeScanner, BarcodeResult } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-single-scan-barcode-scanner-demo',
  imports: [ScBarcodeScanner],
  template: `
    <sc-barcode-scanner
      [continuous]="false"
      (detected)="onDetected($event)"
      class="max-w-md"
    />
    @if (singleResult()) {
      <div
        class="p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mt-3"
      >
        <p class="text-sm text-green-800 mb-1">Scan complete!</p>
        <p class="font-mono text-sm break-all text-green-900">
          {{ singleResult()?.rawValue }}
        </p>
      </div>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleScanBarcodeScannerDemo {
  readonly singleResult = signal<BarcodeResult | null>(null);

  onDetected(result: BarcodeResult): void {
    this.singleResult.set(result);
  }
}
