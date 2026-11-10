import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StateSwitchNextDemo } from './state-switch-next-demo';

@Component({
  selector: 'app-state-switch-next-demo-container',
  imports: [DemoContainer, StateSwitchNextDemo],
  template: `
    <app-demo-container
      title="State"
      demoUrl="/demos/switch-next/state-switch-next-demo"
      [code]="code"
    >
      <app-state-switch-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StateSwitchNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSwitchNext, ScSwitchNextField } from '@semantic-components/ui';

/** Its state in its text: two-way, [(checked)]. */
@Component({
  selector: 'app-state-switch-next-demo',
  imports: [ScSwitchNext, ScSwitchNextField],
  template: \`
    <label scSwitchNextField>
      <input type="checkbox" scSwitchNext [(checked)]="notifications" />
      Notifications: {{ notifications() ? 'On' : 'Off' }}
    </label>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StateSwitchNextDemo {
  protected readonly notifications = signal(true);
}`;
}
