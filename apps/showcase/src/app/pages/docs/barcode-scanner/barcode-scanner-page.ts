import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicBarcodeScannerDemoContainer } from './demos/basic-barcode-scanner-demo-container';
import { BrowserSupportBarcodeScannerDemoContainer } from './demos/browser-support-barcode-scanner-demo-container';
import { FormatsBarcodeScannerDemoContainer } from './demos/formats-barcode-scanner-demo-container';
import { HistoryBarcodeScannerDemoContainer } from './demos/history-barcode-scanner-demo-container';
import { ProductBarcodeScannerDemoContainer } from './demos/product-barcode-scanner-demo-container';
import { QrCodeBarcodeScannerDemoContainer } from './demos/qr-code-barcode-scanner-demo-container';
import { SingleScanBarcodeScannerDemoContainer } from './demos/single-scan-barcode-scanner-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-barcode-scanner-page',
  imports: [
    BasicBarcodeScannerDemoContainer,
    QrCodeBarcodeScannerDemoContainer,
    ProductBarcodeScannerDemoContainer,
    SingleScanBarcodeScannerDemoContainer,
    HistoryBarcodeScannerDemoContainer,
    FormatsBarcodeScannerDemoContainer,
    BrowserSupportBarcodeScannerDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">BarcodeScanner</h1>
        <p class="text-muted-foreground">
          Scan barcodes and QR codes using your device's camera with the Barcode
          Detection API.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-barcode-scanner-demo-container />
        <app-qr-code-barcode-scanner-demo-container />
        <app-product-barcode-scanner-demo-container />
        <app-single-scan-barcode-scanner-demo-container />
        <app-history-barcode-scanner-demo-container />
        <app-formats-barcode-scanner-demo-container />
        <app-browser-support-barcode-scanner-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BarcodeScannerPage {
  readonly componentStatus = COMPONENTS.find(
    (c) => c.path === 'barcode-scanner',
  )!.status;
}
