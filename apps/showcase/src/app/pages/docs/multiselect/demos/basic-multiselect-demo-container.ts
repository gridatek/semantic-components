import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicMultiselectDemo } from './basic-multiselect-demo';

@Component({
  selector: 'app-basic-multiselect-demo-container',
  imports: [DemoContainer, BasicMultiselectDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/multiselect/basic-multiselect-demo"
      [code]="code"
    >
      <app-basic-multiselect-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMultiselectDemoContainer {
  readonly code = ``;
}
