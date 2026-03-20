import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsPasswordDemo } from './signal-forms-password-demo';

@Component({
  selector: 'app-signal-forms-password-demo-container',
  imports: [DemoContainer, SignalFormsPasswordDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/password/signal-forms-password-demo"
      [code]="code"
    >
      <app-signal-forms-password-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignalFormsPasswordDemoContainer {
  readonly code = '';
}
