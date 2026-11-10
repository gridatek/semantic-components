import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FieldsetRadioGroupDemo } from './fieldset-radio-group-demo';

@Component({
  selector: 'app-fieldset-radio-group-demo-container',
  imports: [DemoContainer, FieldsetRadioGroupDemo],
  template: `
    <app-demo-container
      title="Fieldset"
      demoUrl="/demos/radio-group/fieldset-radio-group-demo"
      [code]="code"
    >
      <app-fieldset-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldsetRadioGroupDemoContainer {
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

/** A group under its legend and description. */
@Component({
  selector: 'app-fieldset-radio-group-demo',
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
      <div scRadioGroup>
        <label scRadioField>
          <input
            type="radio"
            scRadio
            value="monthly"
            [formField]="planForm.plan"
          />
          Monthly ($9.99/month)
        </label>
        <label scRadioField>
          <input
            type="radio"
            scRadio
            value="yearly"
            [formField]="planForm.plan"
          />
          Yearly ($99.99/year)
        </label>
        <label scRadioField>
          <input
            type="radio"
            scRadio
            value="lifetime"
            [formField]="planForm.plan"
          />
          Lifetime ($299.99)
        </label>
      </div>
    </fieldset>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldsetRadioGroupDemo {
  protected readonly planForm = form(signal({ plan: 'monthly' }));
}`;
}
