import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScSwitch } from '@semantic-components/ui';

/** Its state in its text: two-way, [(checked)]. */
@Component({
  selector: 'app-state-switch-demo',
  imports: [ScSwitch, ScField],
  template: `
    <label scField orientation="horizontal">
      <input scSwitch [(checked)]="notifications" />
      Notifications: {{ notifications() ? 'On' : 'Off' }}
    </label>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StateSwitchDemo {
  protected readonly notifications = signal(true);
}
