import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicInputButtonDemo } from './basic-input-button-demo';

@Component({
  selector: 'app-basic-input-button-demo-container',
  imports: [DemoContainer, BasicInputButtonDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/input-button/basic-input-button-demo"
      [code]="code"
    >
      <app-basic-input-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputButtonDemoContainer {
  readonly code = ``;
}
