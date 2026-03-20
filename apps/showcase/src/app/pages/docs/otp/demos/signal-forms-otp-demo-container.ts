import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsOtpDemo } from './signal-forms-otp-demo';

@Component({
  selector: 'app-signal-forms-otp-demo-container',
  imports: [DemoContainer, SignalFormsOtpDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/otp/signal-forms-otp-demo"
      [code]="code"
    >
      <app-signal-forms-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsOtpDemoContainer {
  readonly code = '';
}
