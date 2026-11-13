import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
} from '@semantic-components/ui';

/** variant="line": the selected tab underlined, no box. */
@Component({
  selector: 'app-line-tabs-demo',
  imports: [ScTabs, ScTabsList, ScTabsTab, ScTabsPanel, ScTabsPanelContent],
  template: `
    <div scTabs value="overview">
      <div scTabsList variant="line">
        <button scTabsTab value="overview">Overview</button>
        <button scTabsTab value="analytics">Analytics</button>
        <button scTabsTab value="reports">Reports</button>
      </div>
      <div scTabsPanel value="overview" class="text-muted-foreground p-2">
        <ng-template scTabsPanelContent>
          Your key metrics at a glance.
        </ng-template>
      </div>
      <div scTabsPanel value="analytics" class="text-muted-foreground p-2">
        <ng-template scTabsPanelContent> Trends and engagement. </ng-template>
      </div>
      <div scTabsPanel value="reports" class="text-muted-foreground p-2">
        <ng-template scTabsPanelContent> Reports ready to export. </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LineTabsDemo {}
