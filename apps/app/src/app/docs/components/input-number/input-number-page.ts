import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { InputNumberDemoSection } from './input-number-demo-section';

@Component({
  selector: 'app-input-number-page',
  imports: [InputNumberDemoSection],
  template: `
    <app-input-number-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputNumberPage {}
