import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScLabel } from '@semantic-components/ui';
import {
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldInputGroup,
  ScPasswordFieldRequirements,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-requirements-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScPasswordFieldRequirements,
    ScLabel,
  ],
  template: `
    <div scPasswordField [(value)]="password" class="space-y-2">
      <label scLabel>Password</label>
      <div scPasswordFieldInputGroup>
        <input
          scPasswordFieldInput
          placeholder="Enter password"
          autocomplete="new-password"
        />
        <button scPasswordFieldToggle></button>
      </div>
      <ul scPasswordFieldRequirements></ul>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequirementsPasswordFieldDemo {
  readonly password = signal<string>('');
}
