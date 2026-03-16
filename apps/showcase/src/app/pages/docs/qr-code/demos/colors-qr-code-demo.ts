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
      <div
        scQrCode
        [value]="'Blue QR'"
        class="size-36 rounded-md bg-blue-100 text-blue-700"
      ></div>
      <div
        scQrCode
        [value]="'Green QR'"
        class="size-36 rounded-md bg-green-100 text-green-800"
      ></div>
      <div
        scQrCode
        [value]="'Purple QR'"
        class="size-36 rounded-md bg-purple-100 text-purple-700"
      ></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsQrCodeDemo {}
