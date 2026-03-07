import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLabel } from '@semantic-components/ui';
import {
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldInputGroup,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScLabel,
  ],
  template: `
    <div
      scPasswordField
      [value]="'********'"
      [disabled]="true"
      class="space-y-2"
    >
      <label scLabel>Password (Disabled)</label>
      <div scPasswordFieldInputGroup>
        <input scPasswordFieldInput />
        <button scPasswordFieldToggle></button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledPasswordFieldDemo {}
