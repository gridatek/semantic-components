import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScLabel } from '@semantic-components/ui';
import {
  ScPasswordField,
  ScPasswordFieldInputGroup,
  ScPasswordFieldInput,
  ScPasswordFieldToggle,
  ScPasswordFieldRequirements,
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
