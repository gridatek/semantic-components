import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { InputUsageDemo } from './input-usage-demo';

@Component({
  selector: 'app-input-usage-demo-container',
  imports: [UsageCode, InputUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-input-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScField, ScInput, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-input-usage-demo',
  imports: [ScField, ScInput, ScLabel],
  template: \`
    <div scField class="w-full max-w-xs">
      <label scLabel>Name</label>
      <input scInput placeholder="Jordan Lee" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputUsageDemo {}`;
}
