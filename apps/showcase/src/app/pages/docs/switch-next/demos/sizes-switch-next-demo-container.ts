import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesSwitchNextDemo } from './sizes-switch-next-demo';

@Component({
  selector: 'app-sizes-switch-next-demo-container',
  imports: [DemoContainer, SizesSwitchNextDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/switch-next/sizes-switch-next-demo"
      [code]="code"
    >
      <app-sizes-switch-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesSwitchNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFieldGroup,
  ScLabel,
  ScSwitchNext,
  ScSwitchNextField,
} from '@semantic-components/ui';

/** size: default, or sm. */
@Component({
  selector: 'app-sizes-switch-next-demo',
  imports: [ScFieldGroup, ScLabel, ScSwitchNext, ScSwitchNextField],
  template: \`
    <div scFieldGroup class="w-full max-w-40">
      <div scSwitchNextField>
        <input type="checkbox" scSwitchNext size="sm" />
        <label scLabel>Small</label>
      </div>
      <div scSwitchNextField>
        <input type="checkbox" scSwitchNext size="default" />
        <label scLabel>Default</label>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesSwitchNextDemo {}`;
}
