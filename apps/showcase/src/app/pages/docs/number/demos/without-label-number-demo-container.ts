import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithoutLabelNumberDemo } from './without-label-number-demo';

@Component({
  selector: 'app-without-label-number-demo-container',
  imports: [DemoContainer, WithoutLabelNumberDemo],
  template: `
    <app-demo-container
      title="Without Scrub Area"
      demoUrl="/demos/number/without-label-number-demo"
      [code]="code"
    >
      <app-without-label-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WithoutLabelNumberDemoContainer {
  readonly code = '';
}
