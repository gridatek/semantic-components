import { Component, ViewEncapsulation } from '@angular/core';
import { ScQrCode } from '@semantic-components/ui/qr-code';

/** What a phone opens from a code: a link, a call, an email, a Wi-Fi network — each by its URI scheme. */
@Component({
  selector: 'app-use-cases-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
      @for (item of useCases; track item.label) {
        <figure class="flex flex-col items-center gap-1">
          <svg
            scQrCode
            class="size-28"
            [value]="item.value"
            [attr.aria-label]="'QR code: ' + item.label"
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
export class UseCasesQrCodeDemo {
  private readonly useCases = [
    { value: 'https://angular.dev', label: 'Website' },
    { value: 'tel:+1234567890', label: 'Phone' },
    { value: 'mailto:hello@example.com', label: 'Email' },
    { value: 'WIFI:T:WPA;S:MyNetwork;P:password123;;', label: 'Wi-Fi' },
  ];
}
