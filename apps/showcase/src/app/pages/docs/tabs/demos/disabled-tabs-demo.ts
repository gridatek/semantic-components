import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTabs,
  ScTabPanel,
  ScTabList,
  ScTab,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-tabs-demo',
  imports: [ScTabs, ScTabPanel, ScTabList, ScTab],
  template: `
    <div scTabs class="w-[500px]">
      <div scTabList [selectedTab]="'overview'">
        <button scTab value="overview">Overview</button>
        <button scTab value="analytics">Analytics</button>
        <button scTab value="reports">Reports</button>
        <button scTab value="notifications" [disabled]="true">
          Notifications
        </button>
      </div>
      <div scTabPanel value="overview">
        <p class="text-sm text-muted-foreground">
          Overview content. View your dashboard summary and key metrics.
        </p>
      </div>
      <div scTabPanel value="analytics">
        <p class="text-sm text-muted-foreground">
          Analytics content. Dive deep into your data and discover insights.
        </p>
      </div>
      <div scTabPanel value="reports">
        <p class="text-sm text-muted-foreground">
          Reports content. Generate and download detailed reports.
        </p>
      </div>
      <div scTabPanel value="notifications">
        <p class="text-sm text-muted-foreground">
          Notifications content. Manage your notification preferences.
        </p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTabsDemo {}
