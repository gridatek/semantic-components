import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MarginQrCodeNextDemo } from './margin-qr-code-next-demo';

@Component({
  selector: 'app-margin-qr-code-next-demo-container',
  imports: [DemoContainer, MarginQrCodeNextDemo],
  template: `
    <app-demo-container
      title="Margin"
      [code]="code"
      demoUrl="/demos/qr-code-next/margin-qr-code-next-demo"
    >
      <app-margin-qr-code-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MarginQrCodeNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import { ScQrCodeNext } from '@semantic-components/ui/qr-code';

/** The quiet zone round the code, in modules: 4 by default, as the QR spec asks — less, and some scanners miss it. */
@Component({
  selector: 'app-margin-qr-code-next-demo',
  imports: [ScFrame, ScQrCodeNext],
  template: \`
    <div class="flex flex-wrap items-end gap-6">
      @for (item of margins; track item.margin) {
        <figure class="flex flex-col items-center gap-1">
          <svg
            scQrCodeNext
            scFrame
            size="sm"
            value="https://angular.dev"
            class="size-36"
            [margin]="item.margin"
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
export class MarginQrCodeNextDemo {
  private readonly margins = [
    { margin: 0, label: 'margin 0' },
    { margin: 2, label: 'margin 2' },
    { margin: 4, label: 'margin 4 (default)' },
  ];
}`;
}
