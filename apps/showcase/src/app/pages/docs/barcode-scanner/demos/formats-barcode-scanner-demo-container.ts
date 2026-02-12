import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormatsBarcodeScannerDemo } from './formats-barcode-scanner-demo';

@Component({
  selector: 'app-formats-barcode-scanner-demo-container',
  imports: [DemoContainer, FormatsBarcodeScannerDemo],
  template: `
    <app-demo-container
      title="Supported Formats"
      description="The scanner supports the following barcode formats."
      demoUrl="/demos/barcode-scanner/formats-barcode-scanner-demo"
      [code]="code"
    >
      <app-formats-barcode-scanner-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormatsBarcodeScannerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BarcodeFormat } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-formats-barcode-scanner-demo',
  template: \`
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl">
      @for (format of allFormats; track format) {
        <div class="px-3 py-2 bg-muted rounded text-sm font-mono">
          {{ format }}
        </div>
      }
    </div>
  \`,
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
}`;
}
