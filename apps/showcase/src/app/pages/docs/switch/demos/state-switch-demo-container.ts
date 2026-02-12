import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StateSwitchDemo } from './state-switch-demo';

@Component({
  selector: 'app-state-switch-demo-container',
  imports: [DemoContainer, StateSwitchDemo],
  template: `
    <app-demo-container title="With State" [code]="code">
      <app-state-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateSwitchDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-state-switch-demo',
  imports: [ScSwitch],
  template: \`
    <div class="flex items-center space-x-2">
      <button sc-switch [(checked)]="notifications" id="notifications"></button>
      <label for="notifications" class="text-sm font-medium leading-none">
        Notifications: {{ notifications() ? 'On' : 'Off' }}
      </label>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateSwitchDemo {
  readonly notifications = signal(true);
}`;
}
