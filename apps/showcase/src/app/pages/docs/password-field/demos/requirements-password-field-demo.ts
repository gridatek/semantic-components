import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
} from '@semantic-components/ui';
import {
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldRequirements,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-requirements-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScPasswordFieldRequirements,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div
      scPasswordField
      #passwordField="scPasswordField"
      [(value)]="password"
      class="space-y-2"
    >
      <label scLabel>Password</label>
      <div scInputGroup class="w-full max-w-sm">
        <input
          scPasswordFieldInput
          placeholder="Enter password"
          autocomplete="new-password"
        />
        <div scInputGroupAddon align="inline-end">
          <button scPasswordFieldToggle>
            @if (passwordField.visible()) {
              <svg siEyeOffIcon></svg>
            } @else {
              <svg siEyeIcon></svg>
            }
            <span class="sr-only">Toggle password visibility</span>
          </button>
        </div>
      </div>
      <ul scPasswordFieldRequirements></ul>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequirementsPasswordFieldDemo {
  readonly password = signal<string>('');
}
