import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RequirementsPasswordDemo } from './requirements-password-demo';

@Component({
  selector: 'app-requirements-password-demo-container',
  imports: [DemoContainer, RequirementsPasswordDemo],
  template: `
    <app-demo-container
      title="With Requirements Checklist"
      demoUrl="/demos/password/requirements-password-demo"
      [code]="code"
    >
      <app-requirements-password-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RequirementsPasswordDemoContainer {
  readonly code = '';
}
