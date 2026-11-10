import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScCheckboxNext,
  ScCheckboxNextField,
  ScLabel,
} from '@semantic-components/ui';

/** A required checkbox, touched and not checked: marked invalid (Signal Forms). */
@Component({
  selector: 'app-invalid-checkbox-next-demo',
  imports: [FormField, ScCheckboxNext, ScCheckboxNextField, ScLabel],
  template: `
    <div scCheckboxNextField class="w-56">
      <input type="checkbox" scCheckboxNext [formField]="termsForm.terms" />
      <label scLabel>Accept terms and conditions</label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidCheckboxNextDemo {
  protected readonly termsForm = form(signal({ terms: false }), (path) => {
    required(path.terms);
  });

  constructor() {
    // Touched already, to show it invalid.
    this.termsForm.terms().markAsTouched();
  }
}
