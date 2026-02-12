import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTabsDemo } from './disabled-tabs-demo';

@Component({
  selector: 'app-disabled-tabs-demo-container',
  imports: [DemoContainer, DisabledTabsDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-tabs-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTabsDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTabs, ScTabPanel, ScTabList, ScTab } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-tabs-demo',
  imports: [ScTabs, ScTabPanel, ScTabList, ScTab],
  template: \`
    <div sc-tabs class="w-[500px]">
      <div sc-tab-list [selectedTab]="'overview'">
        <button sc-tab value="overview">Overview</button>
        <button sc-tab value="analytics">Analytics</button>
        <button sc-tab value="reports">Reports</button>
        <button sc-tab value="notifications" [disabled]="true">
          Notifications
        </button>
      </div>
      <div sc-tab-panel value="overview">
        <p class="text-sm text-muted-foreground">
          Overview content. View your dashboard summary and key metrics.
        </p>
      </div>
      <div sc-tab-panel value="analytics">
        <p class="text-sm text-muted-foreground">
          Analytics content. Dive deep into your data and discover insights.
        </p>
      </div>
      <div sc-tab-panel value="reports">
        <p class="text-sm text-muted-foreground">
          Reports content. Generate and download detailed reports.
        </p>
      </div>
      <div sc-tab-panel value="notifications">
        <p class="text-sm text-muted-foreground">
          Notifications content. Manage your notification preferences.
        </p>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTabsDemo {}`;
}
