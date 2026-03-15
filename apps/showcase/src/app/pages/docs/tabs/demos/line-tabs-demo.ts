import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTab, ScTabList, ScTabPanel, ScTabs } from '@semantic-components/ui';

@Component({
  selector: 'app-line-tabs-demo',
  imports: [ScTabs, ScTabPanel, ScTabList, ScTab],
  template: `
    <div scTabs class="w-[500px]">
      <div scTabList variant="line" [selectedTab]="'overview'">
        <button scTab value="overview">Overview</button>
        <button scTab value="analytics">Analytics</button>
        <button scTab value="reports">Reports</button>
      </div>
      <div scTabPanel value="overview">
        <p class="text-muted-foreground text-sm">
          Overview content. View your dashboard summary and key metrics.
        </p>
      </div>
      <div scTabPanel value="analytics">
        <p class="text-muted-foreground text-sm">
          Analytics content. Dive deep into your data and discover insights.
        </p>
      </div>
      <div scTabPanel value="reports">
        <p class="text-muted-foreground text-sm">
          Reports content. Generate and download detailed reports.
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineTabsDemo {}
