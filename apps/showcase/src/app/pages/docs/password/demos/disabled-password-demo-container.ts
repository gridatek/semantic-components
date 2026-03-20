import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledPasswordDemo } from './disabled-password-demo';

@Component({
  selector: 'app-disabled-password-demo-container',
  imports: [DemoContainer, DisabledPasswordDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/password/disabled-password-demo"
      [code]="code"
    >
      <app-disabled-password-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DisabledPasswordDemoContainer {
  readonly code = '';
}
