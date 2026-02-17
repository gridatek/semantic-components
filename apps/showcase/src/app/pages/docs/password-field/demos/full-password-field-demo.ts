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
  ScPasswordFieldStrength,
  ScPasswordFieldRequirements,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-full-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScPasswordFieldStrength,
    ScPasswordFieldRequirements,
    ScLabel,
  ],
  template: `
    <div scPasswordField [(value)]="password" class="space-y-2">
      <label scLabel>Create Password</label>
      <div scPasswordFieldInputGroup>
        <input
          scPasswordFieldInput
          placeholder="Enter a strong password"
          autocomplete="new-password"
        />
        <button scPasswordFieldToggle></button>
      </div>
      <div scPasswordFieldStrength></div>
      <ul scPasswordFieldRequirements></ul>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullPasswordFieldDemo {
  readonly password = signal<string>('');
}
