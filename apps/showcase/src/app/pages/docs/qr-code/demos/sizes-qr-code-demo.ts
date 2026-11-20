import { Component, ViewEncapsulation } from '@angular/core';
import { ScQrCode } from '@semantic-components/ui/qr-code';

/** Sized with size-* (size-52 by default): one path, sharp at any size. */
@Component({
  selector: 'app-sizes-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="flex flex-wrap items-end gap-6">
      @for (item of sizes; track item.label) {
        <figure class="flex flex-col items-center gap-1">
          <svg
            scQrCode
            value="https://angular.dev"
            [class]="item.class"
            [attr.aria-label]="'QR code for angular.dev, ' + item.label"
          ></svg>
          <figcaption class="text-muted-foreground text-xs">
            {{ item.label }}
          </figcaption>
        </figure>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesQrCodeDemo {
  private readonly sizes = [
    { class: 'size-24', label: 'size-24' },
    { class: 'size-36', label: 'size-36' },
    { class: 'size-52', label: 'size-52 (default)' },
  ];
}
