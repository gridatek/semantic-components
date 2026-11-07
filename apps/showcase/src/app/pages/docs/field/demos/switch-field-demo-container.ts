import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SwitchFieldDemo } from './switch-field-demo';

@Component({
  selector: 'app-switch-field-demo-container',
  imports: [DemoContainer, SwitchFieldDemo],
  template: `
    <app-demo-container
      title="Switch"
      demoUrl="/demos/field/switch-field-demo"
      [code]="code"
    >
      <app-switch-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SwitchFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLabelText, ScSwitch, ScSwitchField } from '@semantic-components/ui';

/** A switch after its text: the whole row toggles it. */
@Component({
  selector: 'app-switch-field-demo',
  imports: [ScLabelText, ScSwitch, ScSwitchField],
  template: \`
    <label scSwitchField class="w-fit">
      <p scLabelText>Multi-factor authentication</p>
      <input type="checkbox" scSwitch />
    </label>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SwitchFieldDemo {}`;
}
