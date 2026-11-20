import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MarginQrCodeDemo } from './margin-qr-code-demo';

@Component({
  selector: 'app-margin-qr-code-demo-container',
  imports: [DemoContainer, MarginQrCodeDemo],
  template: `
    <app-demo-container
      title="Margin"
      [code]="code"
      demoUrl="/demos/qr-code/margin-qr-code-demo"
    >
      <app-margin-qr-code-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MarginQrCodeDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import { ScQrCode } from '@semantic-components/ui/qr-code';

/** The quiet zone round the code, in modules: 4 by default, as the QR spec asks — less, and some scanners miss it. */
@Component({
  selector: 'app-margin-qr-code-demo',
  imports: [ScFrame, ScQrCode],
  template: \`
    <div class="flex flex-wrap items-end gap-6">
      @for (item of margins; track item.margin) {
        <figure class="flex flex-col items-center gap-1">
          <svg
            scQrCode
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
export class MarginQrCodeDemo {
  private readonly margins = [
    { margin: 0, label: 'margin 0' },
    { margin: 2, label: 'margin 2' },
    { margin: 4, label: 'margin 4 (default)' },
  ];
}`;
}
