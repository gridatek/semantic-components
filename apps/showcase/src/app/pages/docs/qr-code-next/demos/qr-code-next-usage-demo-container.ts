import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { QrCodeNextUsageDemo } from './qr-code-next-usage-demo';

@Component({
  selector: 'app-qr-code-next-usage-demo-container',
  imports: [DemoContainer, QrCodeNextUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/qr-code-next/qr-code-next-usage-demo"
    >
      <app-qr-code-next-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class QrCodeNextUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import { ScQrCodeNext } from '@semantic-components/ui/qr-code';

/** A code, named for where it leads — and the same link beside it, for whoever can’t scan. */
@Component({
  selector: 'app-qr-code-next-usage-demo',
  imports: [ScLink, ScQrCodeNext],
  template: \`
    <figure class="flex flex-col items-center gap-2">
      <svg
        scQrCodeNext
        value="https://angular.dev"
        aria-label="QR code for angular.dev"
      ></svg>
      <figcaption class="text-muted-foreground text-sm">
        Or open <a scLink href="https://angular.dev">angular.dev</a>
      </figcaption>
    </figure>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class QrCodeNextUsageDemo {
}`;
}
