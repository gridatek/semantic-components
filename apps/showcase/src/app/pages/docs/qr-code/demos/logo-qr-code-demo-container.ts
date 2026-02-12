import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LogoQrCodeDemo } from './logo-qr-code-demo';

@Component({
  selector: 'app-logo-qr-code-demo-container',
  imports: [DemoContainer, LogoQrCodeDemo],
  template: `
    <app-demo-container
      title="With Logo"
      demoUrl="/demos/qr-code/logo-qr-code-demo"
      [code]="code"
    >
      <app-logo-qr-code-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoQrCodeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-logo-qr-code-demo',
  imports: [ScQrCode],
  template: \`
    <sc-qr-code
      [value]="'https://angular.io'"
      [size]="200"
      [errorCorrectionLevel]="'H'"
      [logo]="'https://angular.io/assets/images/logos/angular/angular.svg'"
      [logoSize]="0.25"
    />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoQrCodeDemo {}`;
}
