import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormPasswordFieldDemo } from './form-password-field-demo';

@Component({
  selector: 'app-form-password-field-demo-container',
  imports: [DemoContainer, FormPasswordFieldDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/password-field/form-password-field-demo"
      [code]="code"
    >
      <app-form-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormPasswordFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  form,
  minLength,
  required,
} from '@angular/forms/signals';
import {
  ScButton,
  ScFieldErrors,
  ScLabel,
  ScPasswordField,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-form-password-field-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScFieldErrors,
    ScLabel,
    ScPasswordField,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordToggle,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: \`
    <form [formRoot]="login" class="flex w-full max-w-sm flex-col gap-4">
      <div scPasswordField #password="scPasswordField">
        <label scLabel>Password</label>
        <div scPasswordGroup>
          <input scPasswordInput [formField]="login.password" />
          <button scPasswordToggle>
            @if (password.visible()) {
              <svg siEyeOffIcon></svg>
            } @else {
              <svg siEyeIcon></svg>
            }
            <span class="sr-only">Show password</span>
          </button>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit">Sign in</button>
      @if (signedIn()) {
        <p class="text-muted-foreground text-sm" role="status">Signed in.</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormPasswordFieldDemo {
  readonly signedIn = signal(false);

  readonly login = form(
    signal({ password: '' }),
    (s) => {
      required(s.password, { message: 'Enter your password.' });
      minLength(s.password, 8, { message: 'Use 8 characters or more.' });
    },
    // Submitting marks the fields touched: their errors show.
    { submission: { action: async () => this.signedIn.set(true) } },
  );
}`;
}
