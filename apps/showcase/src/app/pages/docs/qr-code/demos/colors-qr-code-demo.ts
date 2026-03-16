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
    <div class="flex flex-wrap gap-6">
      @for (item of colors; track item.label) {
        <div class="flex flex-col items-center gap-1">
          <svg
            scQrCode
            [value]="item.label"
            [class]="'size-36 rounded-md ' + item.class"
            [attr.aria-label]="item.label + ' QR Code'"
          ></svg>
          <p class="text-muted-foreground text-xs">{{ item.label }}</p>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsQrCodeDemo {
  readonly colors = [
    { class: 'bg-blue-100 text-blue-700', label: 'Blue' },
    { class: 'bg-green-100 text-green-800', label: 'Green' },
    { class: 'bg-purple-100 text-purple-700', label: 'Purple' },
    { class: 'bg-rose-100 text-rose-700', label: 'Rose' },
  ];
}
