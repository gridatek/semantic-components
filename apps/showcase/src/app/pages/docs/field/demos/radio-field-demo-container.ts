import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RadioFieldDemo } from './radio-field-demo';

@Component({
  selector: 'app-radio-field-demo-container',
  imports: [DemoContainer, RadioFieldDemo],
  template: `
    <app-demo-container
      title="Radio"
      demoUrl="/demos/field/radio-field-demo"
      [code]="code"
    >
      <app-radio-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RadioFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScFieldset,
  ScLegend,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

/** A radio group under a legend. */
@Component({
  selector: 'app-radio-field-demo',
  imports: [
    FormField,
    ScFieldDescription,
    ScFieldset,
    ScLegend,
    ScRadio,
    ScRadioField,
    ScRadioGroup,
  ],
  template: \`
    <fieldset scFieldset class="w-full max-w-xs">
      <legend scLegend variant="label">Subscription Plan</legend>
      <p scFieldDescription>
        Yearly and lifetime plans offer significant savings.
      </p>
      <div scRadioGroup [formField]="planForm.plan">
        <label scRadioField>
          <input scRadio value="monthly" />
          Monthly ($9.99/month)
        </label>
        <label scRadioField>
          <input scRadio value="yearly" />
          Yearly ($99.99/year)
        </label>
        <label scRadioField>
          <input scRadio value="lifetime" />
          Lifetime ($299.99)
        </label>
      </div>
    </fieldset>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RadioFieldDemo {
  protected readonly planForm = form(signal({ plan: 'monthly' }));
}`;
}
