import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

/** Its state in its text: two-way, [(checked)]. */
@Component({
  selector: 'app-state-switch-demo',
  imports: [ScSwitch, ScSwitchField],
  template: `
    <label scSwitchField>
      <input type="checkbox" scSwitch [(checked)]="notifications" />
      Notifications: {{ notifications() ? 'On' : 'Off' }}
    </label>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StateSwitchDemo {
  protected readonly notifications = signal(true);
}
