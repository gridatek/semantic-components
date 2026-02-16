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
  host: { class: 'block' },
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
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center">
        <sc-qr-code [value]="'https://example.com'" [size]="120" />
        <p class="text-xs text-muted-foreground mt-1">Website URL</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'tel:+1234567890'" [size]="120" />
        <p class="text-xs text-muted-foreground mt-1">Phone Number</p>
      </div>
      <div class="text-center">
        <sc-qr-code [value]="'mailto:hello@example.com'" [size]="120" />
        <p class="text-xs text-muted-foreground mt-1">Email</p>
      </div>
      <div class="text-center">
        <sc-qr-code
          [value]="'WIFI:T:WPA;S:MyNetwork;P:password123;;'"
          [size]="120"
        />
        <p class="text-xs text-muted-foreground mt-1">WiFi</p>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseCasesQrCodeDemo {}`;
}
