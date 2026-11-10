import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScLabel, ScSwitch, ScSwitchField } from '@semantic-components/ui';

/** A switch beside its label. */
@Component({
  selector: 'app-switch-usage-demo',
  imports: [FormField, ScLabel, ScSwitch, ScSwitchField],
  template: `
    <div scSwitchField>
      <input scSwitch [formField]="modeForm.airplane" />
      <label scLabel>Airplane Mode</label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SwitchUsageDemo {
  protected readonly modeForm = form(signal({ airplane: false }));
}
