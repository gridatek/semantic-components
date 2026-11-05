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
  ScTabs,
  ScTabsContent,
  ScTabsList,
  ScTabsPanel,
  ScTabsTab,
} from '@semantic-components/ui';

/** variant="line": the selected tab underlined, no box. */
@Component({
  selector: 'app-line-tabs-demo',
  imports: [ScTabs, ScTabsList, ScTabsTab, ScTabsPanel, ScTabsContent],
  template: \`
    <div scTabs value="overview">
      <div scTabsList variant="line">
        <button scTabsTab value="overview">Overview</button>
        <button scTabsTab value="analytics">Analytics</button>
        <button scTabsTab value="reports">Reports</button>
      </div>
      <div scTabsPanel value="overview" class="text-muted-foreground p-2">
        <ng-template scTabsContent> Your key metrics at a glance. </ng-template>
      </div>
      <div scTabsPanel value="analytics" class="text-muted-foreground p-2">
        <ng-template scTabsContent> Trends and engagement. </ng-template>
      </div>
      <div scTabsPanel value="reports" class="text-muted-foreground p-2">
        <ng-template scTabsContent> Reports ready to export. </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LineTabsDemo {}`;
}
