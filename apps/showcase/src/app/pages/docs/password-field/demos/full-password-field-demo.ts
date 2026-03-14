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
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldRequirements,
  ScPasswordFieldStrength,
  ScPasswordFieldToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-full-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScPasswordFieldStrength,
    ScPasswordFieldRequirements,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div class="w-full max-w-sm">
      <div
        scPasswordField
        #passwordField="scPasswordField"
        [(value)]="password"
        class="space-y-2"
      >
        <label scLabel>Create Password</label>
        <div scInputGroup>
          <input
            scPasswordFieldInput
            placeholder="Enter a strong password"
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
        <div scPasswordFieldStrength></div>
        <ul scPasswordFieldRequirements></ul>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullPasswordFieldDemo {
  readonly password = signal<string>('');
}
