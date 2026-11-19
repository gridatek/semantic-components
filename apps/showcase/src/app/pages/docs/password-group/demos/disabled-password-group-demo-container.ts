import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledPasswordGroupDemo } from './disabled-password-group-demo';

@Component({
  selector: 'app-disabled-password-group-demo-container',
  imports: [DemoContainer, DisabledPasswordGroupDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/password-group/disabled-password-group-demo"
      [code]="code"
    >
      <app-disabled-password-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledPasswordGroupDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, disabled, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-password-group-demo',
  imports: [
    FormField,
    ScLabel,
    ScField,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordToggle,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>Password</label>
      <div scPasswordGroup #password="scPasswordGroup">
        <input scPasswordInput [formField]="account.password" />
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
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledPasswordGroupDemo {
  private readonly account = form(
    signal({ password: 'locked-by-admin' }),
    (s) => disabled(s.password),
  );
}`;
}
