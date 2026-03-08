import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputLastSwitchDemo } from './input-last-switch-demo';

@Component({
  selector: 'app-input-last-switch-demo-container',
  imports: [DemoContainer, InputLastSwitchDemo],
  template: `
    <app-demo-container
      title="Input Last"
      demoUrl="/demos/switch/input-last-switch-demo"
      [code]="code"
    >
      <app-input-last-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputLastSwitchDemoContainer {
  readonly code = ``;
}
