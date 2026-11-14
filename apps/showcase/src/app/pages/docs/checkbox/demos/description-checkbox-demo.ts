import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckbox,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** A description under the label, read with the checkbox. */
@Component({
  selector: 'app-description-checkbox-demo',
  imports: [FormField, ScCheckbox, ScFieldDescription, ScLabel, ScField],
  template: `
    <div scField orientation="horizontal" class="w-72">
      <input scCheckbox [formField]="termsForm.terms" />
      <label scLabel>Accept terms and conditions</label>
      <p scFieldDescription>
        By clicking this checkbox, you agree to the terms and conditions.
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionCheckboxDemo {
  protected readonly termsForm = form(signal({ terms: true }));
}
