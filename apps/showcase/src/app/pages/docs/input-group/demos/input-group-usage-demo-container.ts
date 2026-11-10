import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { InputGroupUsageDemo } from './input-group-usage-demo';

@Component({
  selector: 'app-input-group-usage-demo-container',
  imports: [UsageCode, InputGroupUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-input-group-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-group-usage-demo',
  imports: [ScInput, ScInputGroup, ScInputGroupAddon, SiSearchIcon],
  template: \`
    <div scInputGroup class="max-w-sm">
      <input scInput placeholder="Search..." aria-label="Search" />
      <div scInputGroupAddon>
        <svg siSearchIcon></svg>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupUsageDemo {}`;
}
