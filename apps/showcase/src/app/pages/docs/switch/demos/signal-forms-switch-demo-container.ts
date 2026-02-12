import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsSwitchDemo } from './signal-forms-switch-demo';

@Component({
  selector: 'app-signal-forms-switch-demo-container',
  imports: [DemoContainer, SignalFormsSwitchDemo],
  template: `
    <app-demo-container
      title="Signal Forms Integration"
      demoUrl="/demos/switch/signal-forms-switch-demo"
      [code]="code"
    >
      <app-signal-forms-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsSwitchDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';
import { ScSwitch } from '@semantic-components/ui-lab';
import { JsonPipe } from '@angular/common';

interface SwitchFormModel {
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
}

@Component({
  selector: 'app-signal-forms-switch-demo',
  imports: [ScSwitch, JsonPipe, FormField],
  template: \`
    <form>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <label class="text-sm font-medium leading-none">
              Enable Notifications
            </label>
            <p class="text-sm text-muted-foreground">
              Receive notifications about your account activity
            </p>
          </div>
          <button
            sc-switch
            [formField]="switchForm.notifications"
            id="notifications-switch"
          ></button>
        </div>

        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <label class="text-sm font-medium leading-none">Dark Mode</label>
            <p class="text-sm text-muted-foreground">Switch to dark theme</p>
          </div>
          <button
            sc-switch
            [formField]="switchForm.darkMode"
            id="darkmode-switch"
          ></button>
        </div>

        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <label class="text-sm font-medium leading-none">Auto Save</label>
            <p class="text-sm text-muted-foreground">
              Automatically save your work
            </p>
          </div>
          <button
            sc-switch
            [formField]="switchForm.autoSave"
            id="autosave-switch"
          ></button>
        </div>
      </div>

      <div class="mt-6 p-4 bg-muted rounded-md">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="text-xs mt-2">{{ formModel() | json }}</pre>
      </div>
    </form>
  \`,
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
}`;
}
