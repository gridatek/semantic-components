import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { QuietZoneQrCodeDemo } from './quiet-zone-qr-code-demo';

@Component({
  selector: 'app-quiet-zone-qr-code-demo-container',
  imports: [DemoContainer, QuietZoneQrCodeDemo],
  template: `
    <app-demo-container
      title="Quiet Zone"
      demoUrl="/demos/qr-code/quiet-zone-qr-code-demo"
      [code]="code"
    >
      <app-quiet-zone-qr-code-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class QuietZoneQrCodeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-quiet-zone-qr-code-demo',
  imports: [ScQrCode],
  template: \`
    <div class="flex flex-wrap items-end gap-6">
      @for (item of borders; track item.border) {
        <div class="flex flex-col items-center gap-1">
          <svg
            scQrCode
            [value]="'Border demo'"
            [border]="item.border"
            [class]="'size-36' + (item.border === 0 ? ' border' : '')"
            [attr.aria-label]="item.label"
          ></svg>
          <p class="text-muted-foreground text-xs">{{ item.label }}</p>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class QuietZoneQrCodeDemo {
  readonly borders = [
    { border: 0, label: 'No quiet zone' },
    { border: 1, label: '1 module' },
    { border: 2, label: '2 modules (default)' },
    { border: 4, label: '4 modules (standard)' },
  ];
}`;
}
