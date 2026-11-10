import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckboxNext,
  ScCheckboxNextField,
  ScField,
  ScFieldBody,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldTitle,
  ScLabel,
} from '@semantic-components/ui';

/** A checkbox beside its label, with a description, disabled, and in a card label. */
@Component({
  selector: 'app-checkbox-next-usage-demo',
  imports: [
    FormField,
    ScCheckboxNext,
    ScCheckboxNextField,
    ScField,
    ScFieldBody,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldTitle,
    ScLabel,
  ],
  template: `
    <div scFieldGroup class="max-w-sm">
      <div scCheckboxNextField>
        <input type="checkbox" scCheckboxNext [formField]="termsForm.terms" />
        <label scLabel>Accept terms and conditions</label>
      </div>
      <div scCheckboxNextField>
        <input type="checkbox" scCheckboxNext [formField]="termsForm.agreed" />
        <label scLabel>Accept terms and conditions</label>
        <p scFieldDescription>
          By clicking this checkbox, you agree to the terms.
        </p>
      </div>
      <div scCheckboxNextField>
        <input type="checkbox" scCheckboxNext disabled />
        <label scLabel>Enable notifications</label>
      </div>
      <label scLabel>
        <div scField orientation="horizontal">
          <input
            type="checkbox"
            scCheckboxNext
            [formField]="termsForm.notifications"
          />
          <div scFieldBody>
            <div scFieldTitle>Enable notifications</div>
            <p scFieldDescription>
              You can enable or disable notifications at any time.
            </p>
          </div>
        </div>
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxNextUsageDemo {
  protected readonly termsForm = form(
    signal({ terms: false, agreed: true, notifications: false }),
  );
}
