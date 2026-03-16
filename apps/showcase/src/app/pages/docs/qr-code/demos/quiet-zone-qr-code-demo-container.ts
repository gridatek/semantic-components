import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuietZoneQrCodeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-quiet-zone-qr-code-demo',
  imports: [ScQrCode],
  template: \`
    <div class="flex flex-wrap items-end gap-4">
      <div class="text-center">
        <div
          scQrCode
          [value]="'No border'"
          [border]="0"
          class="size-36 border"
        ></div>
        <p class="text-muted-foreground mt-1 text-xs">No quiet zone</p>
      </div>
      <div class="text-center">
        <div
          scQrCode
          [value]="'Small border'"
          [border]="1"
          class="size-36"
        ></div>
        <p class="text-muted-foreground mt-1 text-xs">1 module</p>
      </div>
      <div class="text-center">
        <div
          scQrCode
          [value]="'Standard border'"
          [border]="4"
          class="size-36"
        ></div>
        <p class="text-muted-foreground mt-1 text-xs">4 modules (standard)</p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuietZoneQrCodeDemo {}`;
}
