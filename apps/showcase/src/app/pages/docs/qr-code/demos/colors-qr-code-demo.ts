import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-colors-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="flex flex-wrap gap-4">
      <svg
        scQrCode
        [value]="'Blue QR'"
        [size]="150"
        [foregroundColor]="'#1d4ed8'"
        [backgroundColor]="'#dbeafe'"
      ></svg>
      <svg
        scQrCode
        [value]="'Green QR'"
        [size]="150"
        [foregroundColor]="'#166534'"
        [backgroundColor]="'#dcfce7'"
      ></svg>
      <svg
        scQrCode
        [value]="'Purple QR'"
        [size]="150"
        [foregroundColor]="'#7c3aed'"
        [backgroundColor]="'#f3e8ff'"
      ></svg>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsQrCodeDemo {}
