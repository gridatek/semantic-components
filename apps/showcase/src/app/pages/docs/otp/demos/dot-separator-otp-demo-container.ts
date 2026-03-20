import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DotSeparatorOtpDemo } from './dot-separator-otp-demo';

@Component({
  selector: 'app-dot-separator-otp-demo-container',
  imports: [DemoContainer, DotSeparatorOtpDemo],
  template: `
    <app-demo-container
      title="With Dot Separator"
      demoUrl="/demos/otp/dot-separator-otp-demo"
      [code]="code"
    >
      <app-dot-separator-otp-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotSeparatorOtpDemoContainer {
  readonly code = '';
}
