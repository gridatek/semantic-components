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
  host: { class: 'block' },
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
    <div class="flex gap-4 flex-wrap items-end">
      <div class="text-center">
        <sc-qr-code
          [value]="'No border'"
          [size]="150"
          [quietZone]="0"
          class="border"
        />
        <p class="text-xs text-muted-foreground mt-1">No quiet zone</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'Small border'" [size]="150" [quietZone]="1" />
        <p class="text-xs text-muted-foreground mt-1">1 module</p>
      </div>
      <div class="text-center">
        <sc-qr-code
          [value]="'Standard border'"
          [size]="150"
          [quietZone]="4"
        />
        <p class="text-xs text-muted-foreground mt-1">
          4 modules (standard)
        </p>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuietZoneQrCodeDemo {}`;
}
