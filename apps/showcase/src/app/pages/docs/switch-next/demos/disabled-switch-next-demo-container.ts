import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSwitchNextDemo } from './disabled-switch-next-demo';

@Component({
  selector: 'app-disabled-switch-next-demo-container',
  imports: [DemoContainer, DisabledSwitchNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/switch-next/disabled-switch-next-demo"
      [code]="code"
    >
      <app-disabled-switch-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSwitchNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLabel,
  ScSwitchNext,
  ScSwitchNextField,
} from '@semantic-components/ui';

/** Disabled: dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-switch-next-demo',
  imports: [ScLabel, ScSwitchNext, ScSwitchNextField],
  template: \`
    <div scSwitchNextField class="w-fit">
      <input type="checkbox" scSwitchNext disabled />
      <label scLabel>Disabled</label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSwitchNextDemo {}`;
}
