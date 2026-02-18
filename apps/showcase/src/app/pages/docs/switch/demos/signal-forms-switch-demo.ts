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
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <p class="text-sm font-medium leading-none">Enable Notifications</p>
            <p class="text-sm text-muted-foreground">
              Receive notifications about your account activity
            </p>
          </div>
          <label scSwitchField aria-label="Enable Notifications">
            <input
              type="checkbox"
              scSwitch
              [formField]="switchForm.notifications"
            />
          </label>
        </div>

        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <p class="text-sm font-medium leading-none">Dark Mode</p>
            <p class="text-sm text-muted-foreground">Switch to dark theme</p>
          </div>
          <label scSwitchField aria-label="Dark Mode">
            <input type="checkbox" scSwitch [formField]="switchForm.darkMode" />
          </label>
        </div>

        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <p class="text-sm font-medium leading-none">Auto Save</p>
            <p class="text-sm text-muted-foreground">
              Automatically save your work
            </p>
          </div>
          <label scSwitchField aria-label="Auto Save">
            <input type="checkbox" scSwitch [formField]="switchForm.autoSave" />
          </label>
        </div>
      </div>

      <div class="mt-6 rounded-md bg-muted p-4">
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
