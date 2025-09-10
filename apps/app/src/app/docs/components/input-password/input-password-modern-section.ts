import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { InputPasswordAdvancedSection } from './input-password-advanced-section';
import { InputPasswordBasicSection } from './input-password-basic-section';
import { InputPasswordCompactSection } from './input-password-compact-section';
import { InputPasswordConfirmationSection } from './input-password-confirmation-section';

@Component({
  selector: 'app-input-password-modern-section',
  imports: [
    InputPasswordBasicSection,
    InputPasswordAdvancedSection,
    InputPasswordCompactSection,
    InputPasswordConfirmationSection,
  ],
  template: `
    <div class="space-y-8">
      <app-input-password-basic-section [title]="'Basic Password Input'" />
      <app-input-password-advanced-section [title]="'Custom Validation Rules'" />
      <app-input-password-compact-section [title]="'Compact Layout'" />
      <app-input-password-confirmation-section [title]="'Password with Confirmation'" />
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordModernSection {
  readonly title = input<string>('');
  readonly level = input<'2' | '3'>('2');
}
