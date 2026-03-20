import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScLabel,
  ScPassword,
  ScPasswordInput,
  ScPasswordInputGroup,
  ScPasswordToggle,
} from '@semantic-components/ui';

@Component({
  selector: 'app-password-usage-demo',
  imports: [
    ScPassword,
    ScPasswordInputGroup,
    ScPasswordInput,
    ScPasswordToggle,
    ScLabel,
  ],
  template: `
    <div class="space-y-2">
      <label scLabel for="password">Password</label>
      <div scPassword [(value)]="password">
        <div scPasswordInputGroup>
          <input scPasswordInput id="password" placeholder="Enter password" />
          <button scPasswordToggle></button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordUsageDemo {
  readonly password = signal<string>('');
}
