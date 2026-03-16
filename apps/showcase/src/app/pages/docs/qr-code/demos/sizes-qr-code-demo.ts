import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="flex flex-wrap items-end gap-6">
      @for (item of sizes; track item.label) {
        <div class="flex flex-col items-center gap-1">
          <svg
            scQrCode
            [value]="'Size demo'"
            [class]="item.class"
            [attr.aria-label]="item.label"
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
export class SizesQrCodeDemo {
  readonly sizes = [
    { class: 'size-20', label: '80px' },
    { class: 'size-32', label: '128px' },
    { class: 'size-52', label: '208px (default)' },
    { class: 'size-72', label: '288px' },
  ];
}
