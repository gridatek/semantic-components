import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScrubbingNumberDemo } from './scrubbing-number-demo';

@Component({
  selector: 'app-scrubbing-number-demo-container',
  imports: [DemoContainer, ScrubbingNumberDemo],
  template: `
    <app-demo-container
      title="With Scrubbing"
      demoUrl="/demos/number/scrubbing-number-demo"
      [code]="code"
    >
      <app-scrubbing-number-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ScrubbingNumberDemoContainer {
  readonly code = '';
}
