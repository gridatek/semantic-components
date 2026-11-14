import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScRadio,
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
    ScRadioGroup,
    ScField,
  ],
  template: `
    <div
      scRadioGroup
      [formField]="spacingForm.spacing"
      aria-label="Spacing"
      class="w-fit"
    >
      <div scField orientation="horizontal">
        <input scRadio value="default" />
        <label scLabel>Default</label>
        <p scFieldDescription>Standard spacing for most use cases.</p>
      </div>
      <div scField orientation="horizontal">
        <input scRadio value="comfortable" />
        <label scLabel>Comfortable</label>
        <p scFieldDescription>More space between elements.</p>
      </div>
      <div scField orientation="horizontal">
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
