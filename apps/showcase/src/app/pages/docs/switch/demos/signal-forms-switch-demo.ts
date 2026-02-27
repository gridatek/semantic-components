import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

interface SwitchFormModel {
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
}

@Component({
  selector: 'app-signal-forms-switch-demo',
  imports: [ScSwitch, ScSwitchField, JsonPipe, FormField],
  template: `
    <form>
      <div class="space-y-4">
        <label scSwitchField class="w-full flex-row-reverse justify-between">
          <input
            type="checkbox"
            scSwitch
            [formField]="switchForm.notifications"
          />
          <div class="space-y-0.5">
            <p class="text-sm leading-none font-medium">Enable Notifications</p>
            <p class="text-muted-foreground text-sm">
              Receive notifications about your account activity
            </p>
          </div>
        </label>

        <label scSwitchField class="w-full flex-row-reverse justify-between">
          <input type="checkbox" scSwitch [formField]="switchForm.darkMode" />
          <div class="space-y-0.5">
            <p class="text-sm leading-none font-medium">Dark Mode</p>
            <p class="text-muted-foreground text-sm">Switch to dark theme</p>
          </div>
        </label>

        <label scSwitchField class="w-full flex-row-reverse justify-between">
          <input type="checkbox" scSwitch [formField]="switchForm.autoSave" />
          <div class="space-y-0.5">
            <p class="text-sm leading-none font-medium">Auto Save</p>
            <p class="text-muted-foreground text-sm">
              Automatically save your work
            </p>
          </div>
        </label>
      </div>

      <div class="bg-muted mt-6 rounded-md p-4">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
      </div>
    </form>
  `,
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
