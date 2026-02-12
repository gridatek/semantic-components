import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicQrCodeDemo } from './basic-qr-code-demo';

@Component({
  selector: 'app-basic-qr-code-demo-container',
  imports: [DemoContainer, BasicQrCodeDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/qr-code/basic-qr-code-demo"
      [code]="code"
    >
      <app-basic-qr-code-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicQrCodeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-qr-code-demo',
  imports: [ScQrCode],
  template: \`
    <sc-qr-code [value]="'https://angular.io'" [size]="200" />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicQrCodeDemo {}`;
}
