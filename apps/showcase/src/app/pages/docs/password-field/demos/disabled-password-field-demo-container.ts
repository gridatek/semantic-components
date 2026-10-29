import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledPasswordFieldDemo } from './disabled-password-field-demo';

@Component({
  selector: 'app-disabled-password-field-demo-container',
  imports: [DemoContainer, DisabledPasswordFieldDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/password-field/disabled-password-field-demo"
      [code]="code"
    >
      <app-disabled-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledPasswordFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, disabled, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScPasswordField,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-password-field-demo',
  imports: [
    FormField,
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
        <input scPasswordInput [formField]="account.password" />
        <button scPasswordToggle>
          @if (password.visible()) {
            <svg siEyeOffIcon></svg>
          } @else {
            <svg siEyeIcon></svg>
          }
          <span class="sr-only">Show password</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledPasswordFieldDemo {
  readonly account = form(signal({ password: 'locked-by-admin' }), (s) =>
    disabled(s.password),
  );
}`;
}
