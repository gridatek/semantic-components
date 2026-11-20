import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesQrCodeNextDemo } from './sizes-qr-code-next-demo';

@Component({
  selector: 'app-sizes-qr-code-next-demo-container',
  imports: [DemoContainer, SizesQrCodeNextDemo],
  template: `
    <app-demo-container
      title="Sizes"
      [code]="code"
      demoUrl="/demos/qr-code-next/sizes-qr-code-next-demo"
    >
      <app-sizes-qr-code-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesQrCodeNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScQrCodeNext } from '@semantic-components/ui/qr-code';

/** Sized with size-* (size-52 by default): one path, sharp at any size. */
@Component({
  selector: 'app-sizes-qr-code-next-demo',
  imports: [ScQrCodeNext],
  template: \`
    <div class="flex flex-wrap items-end gap-6">
      @for (item of sizes; track item.label) {
        <figure class="flex flex-col items-center gap-1">
          <svg
            scQrCodeNext
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesQrCodeNextDemo {
  private readonly sizes = [
    { class: 'size-24', label: 'size-24' },
    { class: 'size-36', label: 'size-36' },
    { class: 'size-52', label: 'size-52 (default)' },
  ];
}`;
}
