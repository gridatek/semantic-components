import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScFieldset,
  ScLegend,
  ScRadio,
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
    ScRadioGroup,
    ScField,
  ],
  template: `
    <fieldset scFieldset class="w-full max-w-xs">
      <legend scLegend variant="label">Subscription Plan</legend>
      <p scFieldDescription>
        Yearly and lifetime plans offer significant savings.
      </p>
      <div scRadioGroup [formField]="planForm.plan">
        <label scField orientation="horizontal">
          <input scRadio value="monthly" />
          Monthly ($9.99/month)
        </label>
        <label scField orientation="horizontal">
          <input scRadio value="yearly" />
          Yearly ($99.99/year)
        </label>
        <label scField orientation="horizontal">
          <input scRadio value="lifetime" />
          Lifetime ($299.99)
        </label>
      </div>
    </fieldset>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldsetRadioGroupDemo {
  protected readonly planForm = form(signal({ plan: 'monthly' }));
}
