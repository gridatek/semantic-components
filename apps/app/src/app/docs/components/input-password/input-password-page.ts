import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { InputPasswordCompositionSection } from './input-password-composition-section';
import { InputPasswordDemoSection } from './input-password-demo-section';

@Component({
  selector: 'app-input-password-page',
  imports: [InputPasswordDemoSection, InputPasswordCompositionSection],
  template: `
    <app-input-password-demo-section />

    <app-input-password-demo-section title="Default" />

    <app-input-password-composition-section title="Custom Composition" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPasswordPage {}
