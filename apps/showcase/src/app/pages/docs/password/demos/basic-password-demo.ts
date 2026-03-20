import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
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
  selector: 'app-basic-password-demo',
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
    <div class="w-full max-w-sm space-y-4">
      <div scField class="space-y-2">
        <label scLabel>Password</label>
        <div scPassword #passwordField="scPassword">
          <div scInputGroup>
            <input
              scPasswordInput
              placeholder="Enter password"
              (input)="password.set(passwordInput.value)"
              #passwordInput
            />
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

      <p class="text-muted-foreground text-sm">
        Value: {{ password() || '(empty)' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPasswordDemo {
  readonly password = signal<string>('');
}
