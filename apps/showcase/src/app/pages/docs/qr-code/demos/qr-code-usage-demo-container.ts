import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { QrCodeUsageDemo } from './qr-code-usage-demo';

@Component({
  selector: 'app-qr-code-usage-demo-container',
  imports: [DemoContainer, QrCodeUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/qr-code/qr-code-usage-demo"
    >
      <app-qr-code-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class QrCodeUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import { ScQrCode } from '@semantic-components/ui/qr-code';

/** A code, named for where it leads — and the same link beside it, for whoever can’t scan. */
@Component({
  selector: 'app-qr-code-usage-demo',
  imports: [ScLink, ScQrCode],
  template: \`
    <figure class="flex flex-col items-center gap-2">
      <svg
        scQrCode
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
export class QrCodeUsageDemo {}`;
}
