import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { LinkUsageDemo } from './link-usage-demo';

@Component({
  selector: 'app-link-usage-demo-container',
  imports: [UsageCode, LinkUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-link-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-link-usage-demo',
  imports: [ScLink],
  template: \` <a scLink href="/docs/components/button">Go to Button</a> \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkUsageDemo {}`;
}
