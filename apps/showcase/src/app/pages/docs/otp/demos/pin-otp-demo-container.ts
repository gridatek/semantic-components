import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PinOtpDemo } from './pin-otp-demo';

@Component({
  selector: 'app-pin-otp-demo-container',
  imports: [DemoContainer, PinOtpDemo],
  template: `
    <app-demo-container
      title="PIN (4 digits)"
      demoUrl="/demos/otp/pin-otp-demo"
      [code]="code"
    >
      <app-pin-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinOtpDemoContainer {
  readonly code = '';
}
