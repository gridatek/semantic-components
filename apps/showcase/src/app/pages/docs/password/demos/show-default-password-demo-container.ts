import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ShowDefaultPasswordDemo } from './show-default-password-demo';

@Component({
  selector: 'app-show-default-password-demo-container',
  imports: [DemoContainer, ShowDefaultPasswordDemo],
  template: `
    <app-demo-container
      title="Show by Default"
      demoUrl="/demos/password/show-default-password-demo"
      [code]="code"
    >
      <app-show-default-password-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShowDefaultPasswordDemoContainer {
  readonly code = '';
}
