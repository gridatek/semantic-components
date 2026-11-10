import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

/** Each choice with its description, read with it. */
@Component({
  selector: 'app-description-radio-group-demo',
  imports: [
    FormField,
    ScFieldDescription,
    ScLabel,
    ScRadio,
    ScRadioField,
    ScRadioGroup,
  ],
  template: `
    <div
      scRadioGroup
      [formField]="spacingForm.spacing"
      aria-label="Spacing"
      class="w-fit"
    >
      <div scRadioField>
        <input scRadio value="default" />
        <label scLabel>Default</label>
        <p scFieldDescription>Standard spacing for most use cases.</p>
      </div>
      <div scRadioField>
        <input scRadio value="comfortable" />
        <label scLabel>Comfortable</label>
        <p scFieldDescription>More space between elements.</p>
      </div>
      <div scRadioField>
        <input scRadio value="compact" />
        <label scLabel>Compact</label>
        <p scFieldDescription>Minimal spacing for dense layouts.</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionRadioGroupDemo {
  protected readonly spacingForm = form(signal({ spacing: 'comfortable' }));
}
