import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-state-switch-demo',
  imports: [ScSwitch, ScSwitchField],
  template: `
    <label scSwitchField>
      <input type="checkbox" scSwitch [(checked)]="notifications" />
      <span class="text-sm leading-none font-medium">
        Notifications: {{ notifications() ? 'On' : 'Off' }}
      </span>
    </label>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateSwitchDemo {
  readonly notifications = signal(true);
}
