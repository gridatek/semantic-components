import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StrengthPasswordDemo } from './strength-password-demo';

@Component({
  selector: 'app-strength-password-demo-container',
  imports: [DemoContainer, StrengthPasswordDemo],
  template: `
    <app-demo-container
      title="With Strength Indicator"
      demoUrl="/demos/password/strength-password-demo"
      [code]="code"
    >
      <app-strength-password-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StrengthPasswordDemoContainer {
  readonly code = '';
}
