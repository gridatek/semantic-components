import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPasswordField,
  ScPasswordFieldInputGroup,
  ScPasswordFieldInput,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';
import { ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScLabel,
  ],
  template: `
    <div sc-password-field [(value)]="password" class="space-y-2">
      <label sc-label>Password</label>
      <div sc-password-field-input-group>
        <input sc-password-field-input placeholder="Enter password" />
        <button sc-password-field-toggle></button>
      </div>
    </div>

    <p class="mt-4 text-sm text-muted-foreground">
      Value: {{ password() || '(empty)' }}
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPasswordFieldDemo {
  readonly password = signal<string>('');
}
