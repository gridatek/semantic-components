import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicQueryParamStateDemo } from './basic-query-param-state-demo';

@Component({
  selector: 'app-basic-query-param-state-demo-container',
  imports: [DemoContainer, BasicQueryParamStateDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/query-param-state/basic-query-param-state-demo"
      [code]="code"
    >
      <app-basic-query-param-state-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicQueryParamStateDemoContainer {
  readonly code = '';
}
