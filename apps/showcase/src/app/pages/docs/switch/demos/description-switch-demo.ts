import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

/** A description under the label, read with the switch; the switch at the end. */
@Component({
  selector: 'app-description-switch-demo',
  imports: [FormField, ScFieldDescription, ScLabel, ScSwitch, ScSwitchField],
  template: `
    <div scSwitchField class="max-w-sm">
      <label scLabel>Share across devices</label>
      <p scFieldDescription>
        Focus is shared across devices, and turns off when you leave the app.
      </p>
      <input scSwitch [formField]="focusForm.share" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionSwitchDemo {
  protected readonly focusForm = form(signal({ share: false }));
}
