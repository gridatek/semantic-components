import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import { ScQrCode } from '@semantic-components/ui/qr-code';

/** Its colours are classes: the text colour for the dark modules, the background for the rest — dark on light, strong contrast, in both themes. */
@Component({
  selector: 'app-colors-qr-code-demo',
  imports: [ScFrame, ScQrCode],
  template: `
    <div class="flex flex-wrap gap-6">
      @for (item of colors; track item.label) {
        <figure class="flex flex-col items-center gap-1">
          <svg
            scQrCode
            scFrame
            size="xs"
            value="https://angular.dev"
            [class]="'size-36 ' + item.class"
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
export class ColorsQrCodeDemo {
  private readonly colors = [
    { class: 'bg-blue-100 text-blue-800', label: 'Blue' },
    { class: 'bg-green-100 text-green-900', label: 'Green' },
    { class: 'bg-purple-100 text-purple-800', label: 'Purple' },
    { class: 'bg-rose-100 text-rose-800', label: 'Rose' },
  ];
}
