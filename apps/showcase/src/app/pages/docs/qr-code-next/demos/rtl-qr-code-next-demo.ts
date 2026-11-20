import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import { ScQrCodeNext } from '@semantic-components/ui/qr-code';

/** In a right-to-left page: the code is never mirrored (scanners read it one way); its caption follows the page. */
@Component({
  selector: 'app-rtl-qr-code-next-demo',
  imports: [Dir, ScLink, ScQrCodeNext],
  template: `
    <figure dir="rtl" lang="ar" class="flex flex-col items-center gap-2">
      <svg
        scQrCodeNext
        value="https://angular.dev"
        aria-label="رمز QR لموقع angular.dev"
      ></svg>
      <figcaption class="text-muted-foreground text-sm">
        أو افتح <a scLink href="https://angular.dev">angular.dev</a>
      </figcaption>
    </figure>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlQrCodeNextDemo {}
