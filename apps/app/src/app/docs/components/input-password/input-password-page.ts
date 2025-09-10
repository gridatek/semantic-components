import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { InputPasswordModernSection } from './input-password-modern-section';

@Component({
  selector: 'app-input-password-page',
  imports: [InputPasswordModernSection],
  template: `
    <app-input-password-modern-section title="Password Input Components" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPasswordPage {}
