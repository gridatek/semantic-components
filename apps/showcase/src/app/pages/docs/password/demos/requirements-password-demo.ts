import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPasswordInput,
  ScPasswordProvider,
  ScPasswordRequirements,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-requirements-password-demo',
  imports: [
    FormField,
    ScField,
    ScPasswordProvider,
    ScPasswordInput,
    ScPasswordToggle,
    ScPasswordRequirements,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div class="w-full max-w-sm">
      <div scField class="space-y-2">
        <label scLabel>Password</label>
        <div scPasswordProvider #passwordField="scPasswordProvider">
          <div scInputGroup>
            <input
              scPasswordInput
              [formField]="passwordForm.password"
              placeholder="Enter password"
              autocomplete="new-password"
            />
            <div scInputGroupAddon align="inline-end">
              <button scPasswordToggle>
                @if (passwordField.visible()) {
                  <svg siEyeOffIcon></svg>
                } @else {
                  <svg siEyeIcon></svg>
                }
                <span class="sr-only">Toggle password visibility</span>
              </button>
            </div>
          </div>
        </div>
        <div scPasswordRequirements [value]="formModel().password"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequirementsPasswordDemo {
  readonly formModel = signal({ password: '' });
  readonly passwordForm = form(this.formModel);
}
