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
  selector: 'app-show-default-password-field-demo',
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
      [(value)]="apiKey"
      [showByDefault]="true"
      class="space-y-2"
    >
      <label scLabel>API Key</label>
      <div scPasswordFieldInputGroup>
        <input scPasswordFieldInput placeholder="sk-..." />
        <button scPasswordFieldToggle></button>
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
