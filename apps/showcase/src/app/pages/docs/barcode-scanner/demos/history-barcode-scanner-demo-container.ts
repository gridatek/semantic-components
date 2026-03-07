import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HistoryBarcodeScannerDemo } from './history-barcode-scanner-demo';

@Component({
  selector: 'app-history-barcode-scanner-demo-container',
  imports: [DemoContainer, HistoryBarcodeScannerDemo],
  template: `
    <app-demo-container
      title="Scan History"
      description="Keep track of all scanned barcodes."
      demoUrl="/demos/barcode-scanner/history-barcode-scanner-demo"
      [code]="code"
    >
      <app-history-barcode-scanner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryBarcodeScannerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { BarcodeResult, ScBarcodeScanner } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-history-barcode-scanner-demo',
  imports: [ScBarcodeScanner],
  template: \`
    <sc-barcode-scanner
      [showLastResult]="false"
      (detected)="addToHistory($event)"
      class="max-w-md"
    />
    @if (scanHistory().length > 0) {
      <div class="mt-3 max-w-md">
        <div class="mb-2 flex items-center justify-between">
          <p class="text-sm font-medium">
            Scanned ({{ scanHistory().length }})
          </p>
          <button
            (click)="clearHistory()"
            class="text-muted-foreground hover:text-foreground text-sm"
          >
            Clear
          </button>
        </div>
        <div class="max-h-48 space-y-2 overflow-y-auto">
          @for (item of scanHistory(); track $index) {
            <div class="bg-muted rounded p-2 text-sm">
              <p class="font-mono break-all">{{ item.rawValue }}</p>
              <p class="text-muted-foreground text-xs">{{ item.format }}</p>
            </div>
          }
        </div>
      </div>
    }
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryBarcodeScannerDemo {
  readonly scanHistory = signal<BarcodeResult[]>([]);

  addToHistory(result: BarcodeResult): void {
    const current = this.scanHistory();
    if (!current.some((item) => item.rawValue === result.rawValue)) {
      this.scanHistory.set([result, ...current].slice(0, 20));
    }
  }

  clearHistory(): void {
    this.scanHistory.set([]);
  }
}`;
}
