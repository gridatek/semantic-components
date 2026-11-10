import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesSwitchDemo } from './sizes-switch-demo';

@Component({
  selector: 'app-sizes-switch-demo-container',
  imports: [DemoContainer, SizesSwitchDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/switch/sizes-switch-demo"
      [code]="code"
    >
      <app-sizes-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesSwitchDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFieldGroup,
  ScLabel,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

/** size: default, or sm. */
@Component({
  selector: 'app-sizes-switch-demo',
  imports: [ScFieldGroup, ScLabel, ScSwitch, ScSwitchField],
  template: \`
    <div scFieldGroup class="w-full max-w-40">
      <div scSwitchField>
        <input type="checkbox" scSwitch size="sm" />
        <label scLabel>Small</label>
      </div>
      <div scSwitchField>
        <input type="checkbox" scSwitch size="default" />
        <label scLabel>Default</label>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesSwitchDemo {}`;
}
