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
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';

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
    <div scPasswordField [(value)]="password" class="space-y-2">
      <label scLabel>Password</label>
      <div scPasswordFieldInputGroup>
        <input scPasswordFieldInput placeholder="Enter password" />
        <button scPasswordFieldToggle></button>
      </div>
    </div>

    <p class="text-muted-foreground mt-4 text-sm">
      Value: {{ password() || '(empty)' }}
    </p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPasswordFieldDemo {
  readonly password = signal<string>('');
}
