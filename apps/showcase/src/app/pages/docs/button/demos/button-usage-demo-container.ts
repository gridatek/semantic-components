import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ButtonUsageDemo } from './button-usage-demo';

@Component({
  selector: 'app-button-usage-demo-container',
  imports: [UsageCode, ButtonUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-button-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-button-usage-demo',
  imports: [ScButton],
  template: \` <button scButton>Click me</button> \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonUsageDemo {}`;
}
