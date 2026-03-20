import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FullPasswordDemo } from './full-password-demo';

@Component({
  selector: 'app-full-password-demo-container',
  imports: [DemoContainer, FullPasswordDemo],
  template: `
    <app-demo-container
      title="With Strength and Requirements"
      demoUrl="/demos/password/full-password-demo"
      [code]="code"
    >
      <app-full-password-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FullPasswordDemoContainer {
  readonly code = '';
}
