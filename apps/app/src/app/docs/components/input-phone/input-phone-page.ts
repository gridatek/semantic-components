import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { InputPhoneDemoSection } from './input-phone-demo-section';
import { InputPhoneReactiveFormsSection } from './input-phone-reactive-forms-section';

@Component({
  selector: 'app-input-phone-page',
  imports: [InputPhoneDemoSection, InputPhoneReactiveFormsSection],
  template: `
    <app-input-phone-demo-section />

    <app-input-phone-reactive-forms-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPhonePage {}
