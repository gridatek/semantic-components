import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-state-switch-demo',
  imports: [ScSwitch, ScSwitchField],
  template: `
    <label scSwitchField>
      <input type="checkbox" scSwitch [(checked)]="notifications" />
      <span class="text-sm font-medium leading-none">
        Notifications: {{ notifications() ? 'On' : 'Off' }}
      </span>
    </label>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateSwitchDemo {
  readonly notifications = signal(true);
}
