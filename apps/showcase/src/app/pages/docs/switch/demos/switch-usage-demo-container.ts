import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { SwitchUsageDemo } from './switch-usage-demo';

@Component({
  selector: 'app-switch-usage-demo-container',
  imports: [UsageCode, SwitchUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-switch-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SwitchUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScField, ScLabel, ScSwitch } from '@semantic-components/ui';

/** A switch beside its label. */
@Component({
  selector: 'app-switch-usage-demo',
  imports: [FormField, ScLabel, ScSwitch, ScField],
  template: \`
    <div scField orientation="horizontal">
      <input scSwitch [formField]="modeForm.airplane" />
      <label scLabel>Airplane Mode</label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SwitchUsageDemo {
  protected readonly modeForm = form(signal({ airplane: false }));
}`;
}
