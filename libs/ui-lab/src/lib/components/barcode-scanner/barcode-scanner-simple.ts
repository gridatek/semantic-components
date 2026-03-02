import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import {
  BarcodeFormat,
  BarcodeResult,
  ScBarcodeScanner,
} from './barcode-scanner';

@Component({
  selector: 'sc-barcode-scanner-simple',
  imports: [ScBarcodeScanner],
  template: `
    <sc-barcode-scanner
      [formats]="formats()"
      [continuous]="continuous()"
      [showLastResult]="showLastResult()"
      (detected)="detected.emit($event)"
      [class]="class()"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScBarcodeScannerSimple {
  readonly formats = input<BarcodeFormat[]>(['qr_code']);
  readonly continuous = input<boolean>(false);
  readonly showLastResult = input<boolean>(true);
  readonly class = input<string>('');

  readonly detected = output<BarcodeResult>();
}
