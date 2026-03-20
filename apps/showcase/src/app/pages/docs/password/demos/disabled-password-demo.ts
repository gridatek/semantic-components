import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScField,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPassword,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-password-demo',
  imports: [
    ScField,
    ScPassword,
    ScPasswordInput,
    ScPasswordToggle,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div class="w-full max-w-sm">
      <div scField class="space-y-2">
        <label scLabel>Password (Disabled)</label>
        <div scPassword #passwordField="scPassword">
          <div scInputGroup>
            <input scPasswordInput value="********" disabled />
            <div scInputGroupAddon align="inline-end">
              <button scPasswordToggle>
                @if (passwordField.visible()) {
                  <svg siEyeOffIcon></svg>
                } @else {
                  <svg siEyeIcon></svg>
                }
                <span class="sr-only">Toggle password visibility</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledPasswordDemo {}
