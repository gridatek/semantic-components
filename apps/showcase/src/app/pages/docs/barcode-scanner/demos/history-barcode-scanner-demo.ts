import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScBarcodeScanner, BarcodeResult } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-history-barcode-scanner-demo',
  imports: [ScBarcodeScanner],
  template: `
    <sc-barcode-scanner
      [showLastResult]="false"
      (detected)="addToHistory($event)"
      class="max-w-md"
    />
    @if (scanHistory().length > 0) {
      <div class="max-w-md mt-3">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm font-medium">
            Scanned ({{ scanHistory().length }})
          </p>
          <button
            (click)="clearHistory()"
            class="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        </div>
        <div class="space-y-2 max-h-48 overflow-y-auto">
          @for (item of scanHistory(); track $index) {
            <div class="p-2 bg-muted rounded text-sm">
              <p class="font-mono break-all">{{ item.rawValue }}</p>
              <p class="text-xs text-muted-foreground">{{ item.format }}</p>
            </div>
          }
        </div>
      </div>
    }
  `,
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
}
