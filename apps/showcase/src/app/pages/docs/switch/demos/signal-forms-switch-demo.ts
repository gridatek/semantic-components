import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldGroup,
  ScFrame,
  ScLabel,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

/** Bound with [formField]: the form's values follow. */
@Component({
  selector: 'app-signal-forms-switch-demo',
  imports: [
    FormField,
    JsonPipe,
    ScFieldGroup,
    ScFrame,
    ScLabel,
    ScSwitch,
    ScSwitchField,
  ],
  template: `
    <div class="flex w-64 flex-col gap-4">
      <div scFieldGroup class="gap-3">
        <div scSwitchField>
          <label scLabel>Notifications</label>
          <input
            type="checkbox"
            scSwitch
            [formField]="settingsForm.notifications"
          />
        </div>
        <div scSwitchField>
          <label scLabel>Dark mode</label>
          <input type="checkbox" scSwitch [formField]="settingsForm.darkMode" />
        </div>
      </div>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsSwitchDemo {
  protected readonly model = signal({ notifications: true, darkMode: false });
  protected readonly settingsForm = form(this.model);
}
