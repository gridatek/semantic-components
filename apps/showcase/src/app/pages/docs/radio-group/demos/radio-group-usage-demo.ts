import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScField, ScRadio, ScRadioGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-radio-group-usage-demo',
  imports: [FormField, ScRadio, ScRadioGroup, ScField],
  template: `
    <div
      scRadioGroup
      [formField]="spacingForm.spacing"
      aria-label="Spacing"
      class="w-fit"
    >
      <label scField orientation="horizontal">
        <input scRadio value="default" />
        Default
      </label>
      <label scField orientation="horizontal">
        <input scRadio value="comfortable" />
        Comfortable
      </label>
      <label scField orientation="horizontal">
        <input scRadio value="compact" />
        Compact
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RadioGroupUsageDemo {
  protected readonly spacingForm = form(signal({ spacing: 'comfortable' }));
}
