import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScFieldset,
  ScLegend,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

/** A required choice, touched with none picked: each radio marked invalid (Signal Forms). */
@Component({
  selector: 'app-invalid-radio-group-demo',
  imports: [
    FormField,
    ScFieldDescription,
    ScFieldset,
    ScLegend,
    ScRadio,
    ScRadioField,
    ScRadioGroup,
  ],
  template: `
    <fieldset scFieldset class="w-full max-w-xs">
      <legend scLegend variant="label">Notification Preferences</legend>
      <p scFieldDescription>Choose how you want to receive notifications.</p>
      <div scRadioGroup [formField]="notifyForm.notify">
        <label scRadioField>
          <input scRadio value="email" />
          Email only
        </label>
        <label scRadioField>
          <input scRadio value="sms" />
          SMS only
        </label>
        <label scRadioField>
          <input scRadio value="both" />
          Both Email &amp; SMS
        </label>
      </div>
    </fieldset>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidRadioGroupDemo {
  protected readonly notifyForm = form(signal({ notify: '' }), (path) => {
    required(path.notify);
  });

  constructor() {
    // Touched already, to show it invalid.
    this.notifyForm.notify().markAsTouched();
  }
}
