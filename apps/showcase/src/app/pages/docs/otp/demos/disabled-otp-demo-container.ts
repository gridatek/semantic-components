import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledOtpDemo } from './disabled-otp-demo';

@Component({
  selector: 'app-disabled-otp-demo-container',
  imports: [DemoContainer, DisabledOtpDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/otp/disabled-otp-demo"
      [code]="code"
    >
      <app-disabled-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledOtpDemoContainer {
  readonly code = '';
}
