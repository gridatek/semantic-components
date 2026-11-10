import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ItemUsageDemo } from './item-usage-demo';

@Component({
  selector: 'app-item-usage-demo-container',
  imports: [UsageCode, ItemUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-item-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ItemUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';
import {
  SiBadgeCheckIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-item-usage-demo',
  imports: [
    ScButton,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    SiBadgeCheckIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div class="flex w-full max-w-md flex-col gap-6">
      <div scItem variant="outline">
        <div scItemBody>
          <div scItemTitle>Basic Item</div>
          <p scItemDescription>A simple item with title and description.</p>
        </div>
        <div scItemActions>
          <button scButton variant="outline" size="sm">Action</button>
        </div>
      </div>
      <a scItem variant="outline" size="sm" href="#usage">
        <div scItemMedia><svg siBadgeCheckIcon class="size-5"></svg></div>
        <div scItemBody>
          <div scItemTitle>Your profile has been verified.</div>
        </div>
        <div scItemActions>
          <svg siChevronRightIcon class="size-4"></svg>
        </div>
      </a>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ItemUsageDemo {}`;
}
