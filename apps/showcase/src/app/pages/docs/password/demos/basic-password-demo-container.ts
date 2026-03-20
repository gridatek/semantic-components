import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicPasswordDemo } from './basic-password-demo';

@Component({
  selector: 'app-basic-password-demo-container',
  imports: [DemoContainer, BasicPasswordDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/password/basic-password-demo"
      [code]="code"
    >
      <app-basic-password-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPasswordDemoContainer {
  readonly code = '';
}
