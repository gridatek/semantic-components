import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerificationOtpDemo } from './verification-otp-demo';

@Component({
  selector: 'app-verification-otp-demo-container',
  imports: [DemoContainer, VerificationOtpDemo],
  template: `
    <app-demo-container
      title="Verification Code Example"
      demoUrl="/demos/otp/verification-otp-demo"
      [code]="code"
    >
      <app-verification-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationOtpDemoContainer {
  readonly code = '';
}
