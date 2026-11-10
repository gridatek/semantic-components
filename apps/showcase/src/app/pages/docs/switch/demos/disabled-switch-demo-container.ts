import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSwitchDemo } from './disabled-switch-demo';

@Component({
  selector: 'app-disabled-switch-demo-container',
  imports: [DemoContainer, DisabledSwitchDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/switch/disabled-switch-demo"
      [code]="code"
    >
      <app-disabled-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSwitchDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLabel, ScSwitch, ScSwitchField } from '@semantic-components/ui';

/** Disabled: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-switch-demo',
  imports: [ScLabel, ScSwitch, ScSwitchField],
  template: \`
    <div scSwitchField class="w-fit">
      <input scSwitch disabled />
      <label scLabel>Disabled</label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSwitchDemo {}`;
}
