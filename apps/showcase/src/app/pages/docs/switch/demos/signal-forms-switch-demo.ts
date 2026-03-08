import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScInlineLabel,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

interface SwitchFormModel {
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
}

@Component({
  selector: 'app-signal-forms-switch-demo',
  imports: [
    ScSwitch,
    ScSwitchField,
    ScInlineLabel,
    ScFieldDescription,
    JsonPipe,
    FormField,
  ],
  template: `
    <form>
      <div class="space-y-4">
        <label scSwitchField reversed>
          <input
            type="checkbox"
            scSwitch
            [formField]="switchForm.notifications"
          />
          <p scInlineLabel>Enable Notifications</p>
          <p scFieldDescription>
            Receive notifications about your account activity
          </p>
        </label>

        <label scSwitchField reversed>
          <input type="checkbox" scSwitch [formField]="switchForm.darkMode" />
          <p scInlineLabel>Dark Mode</p>
          <p scFieldDescription>Switch to dark theme</p>
        </label>

        <label scSwitchField reversed>
          <input type="checkbox" scSwitch [formField]="switchForm.autoSave" />
          <p scInlineLabel>Auto Save</p>
          <p scFieldDescription>Automatically save your work</p>
        </label>
      </div>

      <div class="bg-muted mt-6 rounded-md p-4">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
      </div>
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsSwitchDemo {
  readonly formModel = signal<SwitchFormModel>({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });

  readonly switchForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.notifications);
    required(schemaPath.autoSave);
  });
}
