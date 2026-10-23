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
import { ScQrCode } from '@semantic-components/ui/qr-code';

@Component({
  selector: 'app-quiet-zone-qr-code-demo',
  imports: [ScQrCode],
  template: \`
    <div class="flex flex-wrap items-end gap-6">
      @for (item of zones; track item.quietZone) {
        <div class="flex flex-col items-center gap-1">
          <svg
            scQrCode
            [value]="'Quiet zone demo'"
            [quietZone]="item.quietZone"
            class="size-36 border"
            [aria-label]="item.label"
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
  readonly zones = [
    { quietZone: 0, label: 'No quiet zone' },
    { quietZone: 1, label: '1 module' },
    { quietZone: 2, label: '2 modules' },
    { quietZone: 4, label: '4 modules (default)' },
  ];
}`;
}
