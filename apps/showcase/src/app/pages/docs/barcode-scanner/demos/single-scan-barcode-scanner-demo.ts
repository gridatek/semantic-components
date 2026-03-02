import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { BarcodeResult, ScBarcodeScanner } from '@semantic-components/ui-lab';

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
        class="mt-3 max-w-md rounded-lg border border-green-200 bg-green-50 p-4"
      >
        <p class="mb-1 text-sm text-green-800">Scan complete!</p>
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
