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
  ScPasswordToggle,
} from '@semantic-components/ui';

@Component({
  selector: 'app-password-usage-demo',
  imports: [
    FormField,
    ScField,
    ScPasswordProvider,
    ScPasswordInput,
    ScPasswordToggle,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
  ],
  template: `
    <div scField class="space-y-2">
      <label scLabel>Password</label>
      <div scPasswordProvider>
        <div scInputGroup>
          <input
            scPasswordInput
            [formField]="passwordForm.password"
            placeholder="Enter password"
          />
          <div scInputGroupAddon align="inline-end">
            <button scPasswordToggle>
              <span class="sr-only">Toggle password visibility</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordUsageDemo {
  readonly formModel = signal({ password: '' });
  readonly passwordForm = form(this.formModel);
}
