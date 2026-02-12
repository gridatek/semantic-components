import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';
import {
  ScCheckboxField,
  ScCheckbox,
  ScLabel,
} from '@semantic-components/ui-lab';
import { JsonPipe } from '@angular/common';

interface CheckboxFormModel {
  newsletter: boolean;
  marketing: boolean;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-signal-forms-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel, JsonPipe, FormField],
  template: `
    <form>
      <div class="space-y-4">
        <div sc-checkbox-field>
          <input
            type="checkbox"
            sc-checkbox
            id="newsletter-custom"
            [formField]="checkboxForm.newsletter"
          />
          <label sc-label for="newsletter-custom">
            Subscribe to newsletter
          </label>
        </div>

        <div sc-checkbox-field>
          <input
            type="checkbox"
            sc-checkbox
            id="marketing-custom"
            [formField]="checkboxForm.marketing"
          />
          <label sc-label for="marketing-custom">
            Receive marketing emails
          </label>
        </div>

        <div sc-checkbox-field>
          <input
            type="checkbox"
            sc-checkbox
            id="terms-custom"
            [formField]="checkboxForm.acceptTerms"
          />
          <label sc-label for="terms-custom">Accept terms and conditions</label>
        </div>
      </div>

      <div class="mt-4 p-4 bg-muted rounded-md">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="text-xs mt-2">{{ formModel() | json }}</pre>
      </div>
    </form>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsCheckboxDemo {
  readonly formModel = signal<CheckboxFormModel>({
    newsletter: false,
    marketing: false,
    acceptTerms: false,
  });

  readonly checkboxForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.newsletter);
    required(schemaPath.acceptTerms);
  });
}
