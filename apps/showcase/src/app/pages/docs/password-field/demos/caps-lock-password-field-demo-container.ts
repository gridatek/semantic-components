import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CapsLockPasswordFieldDemo } from './caps-lock-password-field-demo';

@Component({
  selector: 'app-caps-lock-password-field-demo-container',
  imports: [DemoContainer, CapsLockPasswordFieldDemo],
  template: `
    <app-demo-container
      title="Caps Lock"
      demoUrl="/demos/password-field/caps-lock-password-field-demo"
      [code]="code"
    >
      <app-caps-lock-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CapsLockPasswordFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScPasswordCapsLock,
  ScPasswordField,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import {
  SiArrowBigUpIcon,
  SiEyeIcon,
  SiEyeOffIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-caps-lock-password-field-demo',
  imports: [
    FormField,
    ScLabel,
    ScPasswordCapsLock,
    ScPasswordField,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordToggle,
    SiArrowBigUpIcon,
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
      <p scPasswordCapsLock>
        <svg siArrowBigUpIcon></svg>
        Caps Lock is on
      </p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CapsLockPasswordFieldDemo {
  readonly login = form(signal({ password: '' }));
}`;
}
