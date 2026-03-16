import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UseCasesQrCodeDemo } from './use-cases-qr-code-demo';

@Component({
  selector: 'app-use-cases-qr-code-demo-container',
  imports: [DemoContainer, UseCasesQrCodeDemo],
  template: `
    <app-demo-container
      title="Use Cases"
      demoUrl="/demos/qr-code/use-cases-qr-code-demo"
      [code]="code"
    >
      <app-use-cases-qr-code-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseCasesQrCodeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-use-cases-qr-code-demo',
  imports: [ScQrCode],
  template: \`
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div class="text-center">
        <div scQrCode [value]="'https://example.com'" class="size-28"></div>
        <p class="text-muted-foreground mt-1 text-xs">Website URL</p>
      </div>
      <div class="text-center">
        <div scQrCode [value]="'tel:+1234567890'" class="size-28"></div>
        <p class="text-muted-foreground mt-1 text-xs">Phone Number</p>
      </div>
      <div class="text-center">
        <div
          scQrCode
          [value]="'mailto:hello@example.com'"
          class="size-28"
        ></div>
        <p class="text-muted-foreground mt-1 text-xs">Email</p>
      </div>
      <div class="text-center">
        <div
          scQrCode
          [value]="'WIFI:T:WPA;S:MyNetwork;P:password123;;'"
          class="size-28"
        ></div>
        <p class="text-muted-foreground mt-1 text-xs">WiFi</p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseCasesQrCodeDemo {}`;
}
