import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { InputPasswordCompositionSection } from './input-password-composition-section';
import { InputPasswordDemoSection } from './input-password-demo-section';
import { InputPasswordModernSection } from './input-password-modern-section';

@Component({
  selector: 'app-input-password-page',
  imports: [InputPasswordDemoSection, InputPasswordCompositionSection, InputPasswordModernSection],
  template: `
    <app-input-password-modern-section title="Modern Implementation" />

    <app-input-password-demo-section title="Basic Usage" />

    <app-input-password-composition-section title="Custom Composition" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPasswordPage {}
