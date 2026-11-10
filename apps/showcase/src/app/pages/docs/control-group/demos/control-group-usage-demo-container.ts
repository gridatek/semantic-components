import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ControlGroupUsageDemo } from './control-group-usage-demo';

@Component({
  selector: 'app-control-group-usage-demo-container',
  imports: [UsageCode, ControlGroupUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-control-group-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlGroupUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScControlGroup, ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-control-group-usage-demo',
  imports: [ScButton, ScControlGroup, ScInput],
  template: \`
    <div scControlGroup aria-label="Newsletter">
      <input
        scInput
        type="email"
        placeholder="Email"
        aria-label="Email"
        autocomplete="email"
      />
      <button scButton variant="outline">Subscribe</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlGroupUsageDemo {}`;
}
