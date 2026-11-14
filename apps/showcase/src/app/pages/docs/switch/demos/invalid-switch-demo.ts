import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScSwitch,
} from '@semantic-components/ui';

/** A required switch, touched and off: marked invalid (Signal Forms). */
@Component({
  selector: 'app-invalid-switch-demo',
  imports: [FormField, ScFieldDescription, ScLabel, ScSwitch, ScField],
  template: `
    <div scField orientation="horizontal" class="max-w-sm">
      <label scLabel>Accept terms and conditions</label>
      <p scFieldDescription>
        You must accept the terms and conditions to continue.
      </p>
      <input scSwitch [formField]="termsForm.terms" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidSwitchDemo {
  protected readonly termsForm = form(signal({ terms: false }), (path) => {
    required(path.terms);
  });

  constructor() {
    // Touched already, to show it invalid.
    this.termsForm.terms().markAsTouched();
  }
}
