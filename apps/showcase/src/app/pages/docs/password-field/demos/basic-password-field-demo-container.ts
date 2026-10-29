import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicPasswordFieldDemo } from './basic-password-field-demo';

@Component({
  selector: 'app-basic-password-field-demo-container',
  imports: [DemoContainer, BasicPasswordFieldDemo],
  template: `
    <app-demo-container
      title="Password Field"
      demoUrl="/demos/password-field/basic-password-field-demo"
      [code]="code"
    >
      <app-basic-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicPasswordFieldDemoContainer {
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
  selector: 'app-basic-password-field-demo',
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
export class BasicPasswordFieldDemo {
  readonly login = form(signal({ password: '' }));
}`;
}
