import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ZxcvbnPasswordDemo } from './zxcvbn-password-demo';

@Component({
  selector: 'app-zxcvbn-password-demo-container',
  imports: [DemoContainer, ZxcvbnPasswordDemo],
  template: `
    <app-demo-container
      title="With zxcvbn Scoring"
      demoUrl="/demos/password/zxcvbn-password-demo"
      [code]="code"
    >
      <app-zxcvbn-password-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ZxcvbnPasswordDemoContainer {
  readonly code = '';
}
