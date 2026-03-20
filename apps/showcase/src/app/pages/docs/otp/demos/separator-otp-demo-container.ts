import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeparatorOtpDemo } from './separator-otp-demo';

@Component({
  selector: 'app-separator-otp-demo-container',
  imports: [DemoContainer, SeparatorOtpDemo],
  template: `
    <app-demo-container
      title="With Separator"
      demoUrl="/demos/otp/separator-otp-demo"
      [code]="code"
    >
      <app-separator-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorOtpDemoContainer {
  readonly code = '';
}
