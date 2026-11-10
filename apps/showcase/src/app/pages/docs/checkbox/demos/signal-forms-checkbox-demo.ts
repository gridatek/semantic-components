import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckbox,
  ScCheckboxField,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

/** Bound with [formField]: the form's values follow. */
@Component({
  selector: 'app-signal-forms-checkbox-demo',
  imports: [
    FormField,
    JsonPipe,
    ScCheckbox,
    ScCheckboxField,
    ScFieldGroup,
    ScLabel,
  ],
  template: `
    <div class="flex w-64 flex-col gap-4">
      <div scFieldGroup class="gap-3">
        <div scCheckboxField>
          <input
            type="checkbox"
            scCheckbox
            [formField]="emailForm.newsletter"
          />
          <label scLabel>Subscribe to newsletter</label>
        </div>
        <div scCheckboxField>
          <input type="checkbox" scCheckbox [formField]="emailForm.marketing" />
          <label scLabel>Receive marketing emails</label>
        </div>
      </div>
      <pre class="bg-muted rounded-md p-4 text-xs">{{ model() | json }}</pre>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsCheckboxDemo {
  protected readonly model = signal({ newsletter: true, marketing: false });
  protected readonly emailForm = form(this.model);
}
