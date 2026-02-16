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
    <div class="flex gap-4 flex-wrap">
      <sc-qr-code
        [value]="'Blue QR'"
        [size]="150"
        [foregroundColor]="'#1d4ed8'"
        [backgroundColor]="'#dbeafe'"
      />
      <sc-qr-code
        [value]="'Green QR'"
        [size]="150"
        [foregroundColor]="'#166534'"
        [backgroundColor]="'#dcfce7'"
      />
      <sc-qr-code
        [value]="'Purple QR'"
        [size]="150"
        [foregroundColor]="'#7c3aed'"
        [backgroundColor]="'#f3e8ff'"
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsQrCodeDemo {}
