import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledRadioGroupDemo } from './disabled-radio-group-demo';

@Component({
  selector: 'app-disabled-radio-group-demo-container',
  imports: [DemoContainer, DisabledRadioGroupDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/radio-group/disabled-radio-group-demo"
      [code]="code"
    >
      <app-disabled-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRadioGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScRadio, ScRadioField, ScRadioGroup } from '@semantic-components/ui';

/** One choice disabled: dimmed, skipped by the arrows. (A whole field: disabled in its form.) */
@Component({
  selector: 'app-disabled-radio-group-demo',
  imports: [FormField, ScRadio, ScRadioField, ScRadioGroup],
  template: \`
    <div
      scRadioGroup
      [formField]="optionForm.option"
      aria-label="Options"
      class="w-fit"
    >
      <label scRadioField>
        <input scRadio value="option1" disabled />
        Disabled
      </label>
      <label scRadioField>
        <input scRadio value="option2" />
        Option 2
      </label>
      <label scRadioField>
        <input scRadio value="option3" />
        Option 3
      </label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRadioGroupDemo {
  protected readonly optionForm = form(signal({ option: 'option2' }));
}`;
}
