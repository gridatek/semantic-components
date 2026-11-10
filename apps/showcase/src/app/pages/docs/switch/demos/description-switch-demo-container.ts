import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DescriptionSwitchDemo } from './description-switch-demo';

@Component({
  selector: 'app-description-switch-demo-container',
  imports: [DemoContainer, DescriptionSwitchDemo],
  template: `
    <app-demo-container
      title="Description"
      demoUrl="/demos/switch/description-switch-demo"
      [code]="code"
    >
      <app-description-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionSwitchDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

/** A description under the label, read with the switch; the switch at the end. */
@Component({
  selector: 'app-description-switch-demo',
  imports: [FormField, ScFieldDescription, ScLabel, ScSwitch, ScSwitchField],
  template: \`
    <div scSwitchField class="max-w-sm">
      <label scLabel>Share across devices</label>
      <p scFieldDescription>
        Focus is shared across devices, and turns off when you leave the app.
      </p>
      <input type="checkbox" scSwitch [formField]="focusForm.share" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionSwitchDemo {
  protected readonly focusForm = form(signal({ share: false }));
}`;
}
