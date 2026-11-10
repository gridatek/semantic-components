import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsSwitchNextDemo } from './signal-forms-switch-next-demo';

@Component({
  selector: 'app-signal-forms-switch-next-demo-container',
  imports: [DemoContainer, SignalFormsSwitchNextDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/switch-next/signal-forms-switch-next-demo"
      [code]="code"
    >
      <app-signal-forms-switch-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsSwitchNextDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldGroup,
  ScFrame,
  ScLabel,
  ScSwitchNext,
  ScSwitchNextField,
} from '@semantic-components/ui';

/** Bound with [formField]: the form's values follow. */
@Component({
  selector: 'app-signal-forms-switch-next-demo',
  imports: [
    FormField,
    JsonPipe,
    ScFieldGroup,
    ScFrame,
    ScLabel,
    ScSwitchNext,
    ScSwitchNextField,
  ],
  template: \`
    <div class="flex w-64 flex-col gap-4">
      <div scFieldGroup class="gap-3">
        <div scSwitchNextField>
          <label scLabel>Notifications</label>
          <input
            type="checkbox"
            scSwitchNext
            [formField]="settingsForm.notifications"
          />
        </div>
        <div scSwitchNextField>
          <label scLabel>Dark mode</label>
          <input
            type="checkbox"
            scSwitchNext
            [formField]="settingsForm.darkMode"
          />
        </div>
      </div>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsSwitchNextDemo {
  protected readonly model = signal({ notifications: true, darkMode: false });
  protected readonly settingsForm = form(this.model);
}`;
}
