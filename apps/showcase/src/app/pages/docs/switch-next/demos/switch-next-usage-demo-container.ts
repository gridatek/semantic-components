import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { SwitchNextUsageDemo } from './switch-next-usage-demo';

@Component({
  selector: 'app-switch-next-usage-demo-container',
  imports: [UsageCode, SwitchNextUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-switch-next-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SwitchNextUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScSwitchNext,
  ScSwitchNextField,
} from '@semantic-components/ui';

/** A switch beside its label. */
@Component({
  selector: 'app-switch-next-usage-demo',
  imports: [FormField, ScLabel, ScSwitchNext, ScSwitchNextField],
  template: \`
    <div scSwitchNextField>
      <input type="checkbox" scSwitchNext [formField]="modeForm.airplane" />
      <label scLabel>Airplane Mode</label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SwitchNextUsageDemo {
  protected readonly modeForm = form(signal({ airplane: false }));
}`;
}
