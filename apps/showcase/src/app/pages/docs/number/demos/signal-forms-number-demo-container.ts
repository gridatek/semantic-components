import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsNumberDemo } from './signal-forms-number-demo';

@Component({
  selector: 'app-signal-forms-number-demo-container',
  imports: [DemoContainer, SignalFormsNumberDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/number/signal-forms-number-demo"
      [code]="code"
    >
      <app-signal-forms-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignalFormsNumberDemoContainer {
  readonly code = '';
}
