import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ErrorCorrectionQrCodeNextDemo } from './error-correction-qr-code-next-demo';

@Component({
  selector: 'app-error-correction-qr-code-next-demo-container',
  imports: [DemoContainer, ErrorCorrectionQrCodeNextDemo],
  template: `
    <app-demo-container
      title="Error correction"
      [code]="code"
      demoUrl="/demos/qr-code-next/error-correction-qr-code-next-demo"
    >
      <app-error-correction-qr-code-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ErrorCorrectionQrCodeNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScQrCodeNext } from '@semantic-components/ui/qr-code';

/** How much can be damaged and still read: L 7 %, M 15 % (the default), Q 25 %, H 30 % — more, and the code grows denser. */
@Component({
  selector: 'app-error-correction-qr-code-next-demo',
  imports: [ScQrCodeNext],
  template: \`
    <div class="flex flex-wrap gap-6">
      @for (item of levels; track item.level) {
        <figure class="flex flex-col items-center gap-1">
          <svg
            scQrCodeNext
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ErrorCorrectionQrCodeNextDemo {
  private readonly levels = [
    { level: 'L', label: 'L — 7 %' },
    { level: 'M', label: 'M — 15 %' },
    { level: 'Q', label: 'Q — 25 %' },
    { level: 'H', label: 'H — 30 %' },
  ] as const;
}`;
}
