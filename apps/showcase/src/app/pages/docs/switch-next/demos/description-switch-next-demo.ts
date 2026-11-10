import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScSwitchNext,
  ScSwitchNextField,
} from '@semantic-components/ui';

/** A description under the label, read with the switch; the switch at the end. */
@Component({
  selector: 'app-description-switch-next-demo',
  imports: [
    FormField,
    ScFieldDescription,
    ScLabel,
    ScSwitchNext,
    ScSwitchNextField,
  ],
  template: `
    <div scSwitchNextField class="max-w-sm">
      <label scLabel>Share across devices</label>
      <p scFieldDescription>
        Focus is shared across devices, and turns off when you leave the app.
      </p>
      <input type="checkbox" scSwitchNext [formField]="focusForm.share" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionSwitchNextDemo {
  protected readonly focusForm = form(signal({ share: false }));
}
