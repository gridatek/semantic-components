import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
} from '@semantic-components/ui';

/** A disabled tab: reached by the arrows, not selected. */
@Component({
  selector: 'app-disabled-tabs-demo',
  imports: [ScTabs, ScTabsList, ScTabsTab, ScTabsPanel, ScTabsPanelContent],
  template: `
    <div scTabs value="home">
      <div scTabsList>
        <button scTabsTab value="home">Home</button>
        <button scTabsTab value="settings" disabled>Disabled</button>
      </div>
      <div scTabsPanel value="home" class="text-muted-foreground p-2">
        <ng-template scTabsPanelContent> The home tab. </ng-template>
      </div>
      <div scTabsPanel value="settings" class="text-muted-foreground p-2">
        <ng-template scTabsPanelContent> Not reachable. </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTabsDemo {}
