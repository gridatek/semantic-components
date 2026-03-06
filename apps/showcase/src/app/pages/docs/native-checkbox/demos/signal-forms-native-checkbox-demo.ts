import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';
import { ScNativeCheckbox } from '@semantic-components/ui-lab';

interface CheckboxFormModel {
  newsletter: boolean;
  marketing: boolean;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-signal-forms-native-checkbox-demo',
  imports: [ScNativeCheckbox, JsonPipe, FormField],
  template: `
    <form>
      <div class="space-y-4">
        <div class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            id="newsletter"
            type="checkbox"
            [formField]="checkboxForm.newsletter"
          />
          <label
            for="newsletter"
            class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Subscribe to newsletter
          </label>
        </div>

        <div class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            id="marketing"
            type="checkbox"
            [formField]="checkboxForm.marketing"
          />
          <label
            for="marketing"
            class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Receive marketing emails
          </label>
        </div>

        <div class="flex items-center space-x-2">
          <input
            scNativeCheckbox
            id="terms-signal"
            type="checkbox"
            [formField]="checkboxForm.acceptTerms"
          />
          <label
            for="terms-signal"
            class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>

      <div class="bg-muted mt-4 rounded-md p-4">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
      </div>
    </form>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsNativeCheckboxDemo {
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
