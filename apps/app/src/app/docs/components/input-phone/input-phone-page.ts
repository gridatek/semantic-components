import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { InputPhoneDemoSection } from './input-phone-demo-section';

@Component({
  selector: 'app-input-phone-page',
  imports: [InputPhoneDemoSection],
  template: `
    <app-input-phone-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPhonePage {}
