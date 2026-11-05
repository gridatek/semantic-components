import { Component, ViewEncapsulation } from '@angular/core';
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
  template: `
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LineTabsDemo {}
