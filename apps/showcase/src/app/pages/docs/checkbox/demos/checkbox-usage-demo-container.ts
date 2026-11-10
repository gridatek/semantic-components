import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { CheckboxUsageDemo } from './checkbox-usage-demo';

@Component({
  selector: 'app-checkbox-usage-demo-container',
  imports: [UsageCode, CheckboxUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-checkbox-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckbox,
  ScCheckboxField,
  ScField,
  ScFieldBody,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldTitle,
  ScLabel,
} from '@semantic-components/ui';

/** A checkbox beside its label, with a description, disabled, and in a card label. */
@Component({
  selector: 'app-checkbox-usage-demo',
  imports: [
    FormField,
    ScCheckbox,
    ScCheckboxField,
    ScField,
    ScFieldBody,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldTitle,
    ScLabel,
  ],
  template: \`
    <div scFieldGroup class="max-w-sm">
      <div scCheckboxField>
        <input type="checkbox" scCheckbox [formField]="termsForm.terms" />
        <label scLabel>Accept terms and conditions</label>
      </div>
      <div scCheckboxField>
        <input type="checkbox" scCheckbox [formField]="termsForm.agreed" />
        <label scLabel>Accept terms and conditions</label>
        <p scFieldDescription>
          By clicking this checkbox, you agree to the terms.
        </p>
      </div>
      <div scCheckboxField>
        <input type="checkbox" scCheckbox disabled />
        <label scLabel>Enable notifications</label>
      </div>
      <label scLabel>
        <div scField orientation="horizontal">
          <input
            type="checkbox"
            scCheckbox
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxUsageDemo {
  protected readonly termsForm = form(
    signal({ terms: false, agreed: true, notifications: false }),
  );
}`;
}
