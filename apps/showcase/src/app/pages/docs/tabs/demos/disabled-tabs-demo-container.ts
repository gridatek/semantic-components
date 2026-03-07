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
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/tabs/disabled-tabs-demo"
      [code]="code"
    >
      <app-disabled-tabs-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTabsDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTab, ScTabList, ScTabPanel, ScTabs } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-tabs-demo',
  imports: [ScTabs, ScTabPanel, ScTabList, ScTab],
  template: \`
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
      <div scTabPanel value="notifications">
        <p class="text-muted-foreground text-sm">
          Notifications content. Manage your notification preferences.
        </p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTabsDemo {}`;
}
