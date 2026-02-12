import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SingleScanBarcodeScannerDemo } from './single-scan-barcode-scanner-demo';

@Component({
  selector: 'app-single-scan-barcode-scanner-demo-container',
  imports: [DemoContainer, SingleScanBarcodeScannerDemo],
  template: `
    <app-demo-container
      title="Single Scan Mode"
      description="Stops scanning after detecting one barcode."
      demoUrl="/demos/barcode-scanner/single-scan-barcode-scanner-demo"
      [code]="code"
    >
      <app-single-scan-barcode-scanner-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleScanBarcodeScannerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScBarcodeScanner, BarcodeResult } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-single-scan-barcode-scanner-demo',
  imports: [ScBarcodeScanner],
  template: \`
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleScanBarcodeScannerDemo {
  readonly singleResult = signal<BarcodeResult | null>(null);

  onDetected(result: BarcodeResult): void {
    this.singleResult.set(result);
  }
}`;
}
