import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputFirstSwitchDemo } from './input-first-switch-demo';

@Component({
  selector: 'app-input-first-switch-demo-container',
  imports: [DemoContainer, InputFirstSwitchDemo],
  template: `
    <app-demo-container
      title="Input First"
      demoUrl="/demos/switch/input-first-switch-demo"
      [code]="code"
    >
      <app-input-first-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFirstSwitchDemoContainer {
  readonly code = ``;
}
