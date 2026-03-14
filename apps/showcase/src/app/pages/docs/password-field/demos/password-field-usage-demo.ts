import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScLabel,
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldInputGroup,
  ScPasswordFieldToggle,
} from '@semantic-components/ui';

@Component({
  selector: 'app-password-field-usage-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScLabel,
  ],
  template: `
    <div class="space-y-2">
      <label scLabel for="password">Password</label>
      <div scPasswordField [(value)]="password">
        <div scPasswordFieldInputGroup>
          <input
            scPasswordFieldInput
            id="password"
            placeholder="Enter password"
          />
          <button scPasswordFieldToggle></button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldUsageDemo {
  readonly password = signal<string>('');
}
