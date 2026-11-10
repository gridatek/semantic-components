import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSwitchNext, ScSwitchNextField } from '@semantic-components/ui';

/** Its state in its text: two-way, [(checked)]. */
@Component({
  selector: 'app-state-switch-next-demo',
  imports: [ScSwitchNext, ScSwitchNextField],
  template: `
    <label scSwitchNextField>
      <input type="checkbox" scSwitchNext [(checked)]="notifications" />
      Notifications: {{ notifications() ? 'On' : 'Off' }}
    </label>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StateSwitchNextDemo {
  protected readonly notifications = signal(true);
}
