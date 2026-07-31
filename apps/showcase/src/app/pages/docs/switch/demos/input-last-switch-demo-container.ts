import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputLastSwitchDemo } from './input-last-switch-demo';

@Component({
  selector: 'app-input-last-switch-demo-container',
  imports: [DemoContainer, InputLastSwitchDemo],
  template: `
    <app-demo-container
      title="Input Last"
      demoUrl="/demos/switch/input-last-switch-demo"
      [code]="code"
    >
      <app-input-last-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputLastSwitchDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFieldDescription,
  ScLabelText,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

@Component({
  selector: 'app-input-last-switch-demo',
  imports: [ScSwitch, ScSwitchField, ScFieldDescription, ScLabelText],
  template: \`
    <div class="w-[400px] rounded-lg border p-4">
      <div class="space-y-4">
        <label scSwitchField>
          <p scLabelText>Marketing emails</p>
          <p scFieldDescription>
            Receive emails about new products and features.
          </p>
          <input type="checkbox" scSwitch [(checked)]="marketing" />
        </label>
        <label scSwitchField>
          <p scLabelText>Security emails</p>
          <p scFieldDescription>Receive emails about your account security.</p>
          <input type="checkbox" scSwitch [(checked)]="security" />
        </label>
        <label scSwitchField>
          <p scLabelText>Product updates</p>
          <p scFieldDescription>
            Receive emails about product updates and tips.
          </p>
          <input type="checkbox" scSwitch [(checked)]="updates" />
        </label>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputLastSwitchDemo {
  readonly marketing = signal(false);
  readonly security = signal(true);
  readonly updates = signal(false);
}`;
}
