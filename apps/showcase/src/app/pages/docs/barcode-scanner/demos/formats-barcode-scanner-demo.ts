import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BarcodeFormat } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-formats-barcode-scanner-demo',
  template: `
    <div class="grid max-w-2xl grid-cols-2 gap-2 md:grid-cols-4">
      @for (format of allFormats; track format) {
        <div class="bg-muted rounded px-3 py-2 font-mono text-sm">
          {{ format }}
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormatsBarcodeScannerDemo {
  readonly allFormats: BarcodeFormat[] = [
    'qr_code',
    'ean_13',
    'ean_8',
    'upc_a',
    'upc_e',
    'code_128',
    'code_39',
    'code_93',
    'codabar',
    'itf',
    'pdf417',
    'aztec',
    'data_matrix',
  ];
}
