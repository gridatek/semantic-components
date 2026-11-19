import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScPasswordCapsLock,
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
  selector: 'app-caps-lock-password-group-demo',
  imports: [
    FormField,
    ScLabel,
    ScPasswordCapsLock,
    ScField,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordToggle,
    SiArrowBigUpIcon,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div scField class="w-full max-w-sm">
      <label scLabel>Password</label>
      <div scPasswordGroup #password="scPasswordGroup">
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
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CapsLockPasswordGroupDemo {
  private readonly login = form(signal({ password: '' }));
}
