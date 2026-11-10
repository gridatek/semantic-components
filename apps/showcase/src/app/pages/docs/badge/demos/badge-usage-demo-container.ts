import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { BadgeUsageDemo } from './badge-usage-demo';

@Component({
  selector: 'app-badge-usage-demo-container',
  imports: [UsageCode, BadgeUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-badge-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge } from '@semantic-components/ui';

@Component({
  selector: 'app-badge-usage-demo',
  imports: [ScBadge],
  template: \`
    <div class="flex flex-wrap justify-center gap-2">
      <span scBadge>Badge</span>
      <span scBadge variant="secondary">Secondary</span>
      <span scBadge variant="destructive">Destructive</span>
      <span scBadge variant="outline">Outline</span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeUsageDemo {}`;
}
