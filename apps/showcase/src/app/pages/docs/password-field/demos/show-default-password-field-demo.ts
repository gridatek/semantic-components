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
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-show-default-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
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
      [(value)]="apiKey"
      [showByDefault]="true"
      class="space-y-2"
    >
      <label scLabel>API Key</label>
      <div scInputGroup class="w-full max-w-sm">
        <input scPasswordFieldInput placeholder="sk-..." />
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
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowDefaultPasswordFieldDemo {
  readonly apiKey = signal<string>('sk-1234567890abcdef');
}
