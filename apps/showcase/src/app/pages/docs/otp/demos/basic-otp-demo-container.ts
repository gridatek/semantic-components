import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicOtpDemo } from './basic-otp-demo';

@Component({
  selector: 'app-basic-otp-demo-container',
  imports: [DemoContainer, BasicOtpDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/otp/basic-otp-demo"
      [code]="code"
    >
      <app-basic-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOtpDemoContainer {
  readonly code = '';
}
