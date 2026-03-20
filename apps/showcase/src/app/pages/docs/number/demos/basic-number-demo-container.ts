import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicNumberDemo } from './basic-number-demo';

@Component({
  selector: 'app-basic-number-demo-container',
  imports: [DemoContainer, BasicNumberDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/number/basic-number-demo"
      [code]="code"
    >
      <app-basic-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicNumberDemoContainer {
  readonly code = '';
}
