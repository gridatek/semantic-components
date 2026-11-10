import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckboxNext,
  ScCheckboxNextField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** A description under the label, read with the checkbox. */
@Component({
  selector: 'app-description-checkbox-next-demo',
  imports: [
    FormField,
    ScCheckboxNext,
    ScCheckboxNextField,
    ScFieldDescription,
    ScLabel,
  ],
  template: `
    <div scCheckboxNextField class="w-72">
      <input type="checkbox" scCheckboxNext [formField]="termsForm.terms" />
      <label scLabel>Accept terms and conditions</label>
      <p scFieldDescription>
        By clicking this checkbox, you agree to the terms and conditions.
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionCheckboxNextDemo {
  protected readonly termsForm = form(signal({ terms: true }));
}
