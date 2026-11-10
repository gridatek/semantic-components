import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { SelectOnFocusUsageDemo } from './select-on-focus-usage-demo';

@Component({
  selector: 'app-select-on-focus-usage-demo-container',
  imports: [UsageCode, SelectOnFocusUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-select-on-focus-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectOnFocusUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';

@Component({
  selector: 'app-select-on-focus-usage-demo',
  imports: [ScSelectOnFocus, ScInput, ScField, ScLabel],
  template: \`
    <div scField>
      <label scLabel>Text</label>
      <input scInput scSelectOnFocus value="Text to select" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectOnFocusUsageDemo {}`;
}
