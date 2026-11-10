import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { LabelUsageDemo } from './label-usage-demo';

@Component({
  selector: 'app-label-usage-demo-container',
  imports: [UsageCode, LabelUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-label-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-label-usage-demo',
  imports: [ScCheckbox, ScCheckboxField, ScLabel],
  template: \`
    <div scCheckboxField>
      <input type="checkbox" scCheckbox />
      <label scLabel>Accept terms and conditions</label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelUsageDemo {}`;
}
