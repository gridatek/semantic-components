import { Component, ViewEncapsulation } from '@angular/core';
import { ScQrCode } from '@semantic-components/ui/qr-code';

/** How much can be damaged and still read: L 7 %, M 15 % (the default), Q 25 %, H 30 % — more, and the code grows denser. */
@Component({
  selector: 'app-error-correction-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="flex flex-wrap gap-6">
      @for (item of levels; track item.level) {
        <figure class="flex flex-col items-center gap-1">
          <svg
            scQrCode
            value="https://angular.dev"
            class="size-36"
            [errorCorrection]="item.level"
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
export class ErrorCorrectionQrCodeDemo {
  private readonly levels = [
    { level: 'L', label: 'L — 7 %' },
    { level: 'M', label: 'M — 15 %' },
    { level: 'Q', label: 'Q — 25 %' },
    { level: 'H', label: 'H — 30 %' },
  ] as const;
}
