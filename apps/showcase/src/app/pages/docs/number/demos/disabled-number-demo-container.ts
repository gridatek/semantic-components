import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledNumberDemo } from './disabled-number-demo';

@Component({
  selector: 'app-disabled-number-demo-container',
  imports: [DemoContainer, DisabledNumberDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/number/disabled-number-demo"
      [code]="code"
    >
      <app-disabled-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DisabledNumberDemoContainer {
  readonly code = '';
}
