import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { PasswordFieldUsageDemo } from './password-field-usage-demo';

@Component({
  selector: 'app-password-field-usage-demo-container',
  imports: [UsageCode, PasswordFieldUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-password-field-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PasswordFieldUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScPasswordField,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-password-field-usage-demo',
  imports: [
    FormField,
    ScFieldDescription,
    ScLabel,
    ScPasswordField,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordToggle,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: \`
    <div scPasswordField #password="scPasswordField" class="w-full max-w-sm">
      <label scLabel>Password</label>
      <div scPasswordGroup>
        <input scPasswordInput [formField]="login.password" />
        <button scPasswordToggle>
          @if (password.visible()) {
            <svg siEyeOffIcon></svg>
            <span class="sr-only">Hide password</span>
          } @else {
            <svg siEyeIcon></svg>
            <span class="sr-only">Show password</span>
          }
        </button>
      </div>
      <p scFieldDescription>The one you signed up with.</p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class PasswordFieldUsageDemo {
  readonly login = form(signal({ password: '' }));
}`;
}
