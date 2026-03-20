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
  ScPassword,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';

@Component({
  selector: 'app-password-usage-demo',
  imports: [
    ScPassword,
    ScPasswordInput,
    ScPasswordToggle,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
  ],
  template: `
    <div class="space-y-2">
      <label scLabel for="password">Password</label>
      <div scPassword [(value)]="password">
        <div scInputGroup>
          <input scPasswordInput id="password" placeholder="Enter password" />
          <div scInputGroupAddon align="inline-end">
            <button scPasswordToggle></button>
          </div>
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
