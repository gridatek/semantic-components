import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TypesToastDemo } from './types-toast-demo';

@Component({
  selector: 'app-types-toast-demo-container',
  imports: [DemoContainer, TypesToastDemo],
  template: `
    <app-demo-container
      title="Types"
      [code]="code"
      demoUrl="/demos/toast/types-toast-demo"
    >
      <app-types-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TypesToastDemoContainer {
  readonly code = '';
}
