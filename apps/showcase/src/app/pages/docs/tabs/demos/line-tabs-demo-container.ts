import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LineTabsDemo } from './line-tabs-demo';

@Component({
  selector: 'app-line-tabs-demo-container',
  imports: [DemoContainer, LineTabsDemo],
  template: `
    <app-demo-container
      title="Line"
      demoUrl="/demos/tabs/line-tabs-demo"
      [code]="code"
    >
      <app-line-tabs-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LineTabsDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui';

@Component({
  selector: 'app-line-tabs-demo',
  imports: [ScTabs, ScTabPanel, ScTabContent, ScTabList, ScTab],
  template: \`
    <div scTabs class="w-[500px]">
      <div scTabList variant="line" [selectedTab]="'overview'">
        <button scTab value="overview">Overview</button>
        <button scTab value="analytics">Analytics</button>
        <button scTab value="reports">Reports</button>
      </div>
      <div scTabPanel value="overview">
        <ng-template scTabContent>
          <p class="text-muted-foreground text-sm">
            Overview content. View your dashboard summary and key metrics.
          </p>
        </ng-template>
      </div>
      <div scTabPanel value="analytics">
        <ng-template scTabContent>
          <p class="text-muted-foreground text-sm">
            Analytics content. Dive deep into your data and discover insights.
          </p>
        </ng-template>
      </div>
      <div scTabPanel value="reports">
        <ng-template scTabContent>
          <p class="text-muted-foreground text-sm">
            Reports content. Generate and download detailed reports.
          </p>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LineTabsDemo {}`;
}
