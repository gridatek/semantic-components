import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NewPasswordDemo } from './new-password-demo';

@Component({
  selector: 'app-new-password-demo-container',
  imports: [DemoContainer, NewPasswordDemo],
  template: `
    <app-demo-container
      title="New Password"
      demoUrl="/demos/password/new-password-demo"
      [code]="code"
    >
      <app-new-password-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewPasswordDemoContainer {
  readonly code = '';
}
