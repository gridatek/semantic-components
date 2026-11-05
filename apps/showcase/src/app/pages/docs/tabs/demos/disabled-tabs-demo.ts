import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabs,
  ScTabsContent,
  ScTabsList,
  ScTabsPanel,
  ScTabsTab,
} from '@semantic-components/ui';

/** A disabled tab: reached by the arrows, not selected. */
@Component({
  selector: 'app-disabled-tabs-demo',
  imports: [ScTabs, ScTabsList, ScTabsTab, ScTabsPanel, ScTabsContent],
  template: `
    <div scTabs value="home">
      <div scTabsList>
        <button scTabsTab value="home">Home</button>
        <button scTabsTab value="settings" disabled>Disabled</button>
      </div>
      <div scTabsPanel value="home" class="text-muted-foreground p-2">
        <ng-template scTabsContent> The home tab. </ng-template>
      </div>
      <div scTabsPanel value="settings" class="text-muted-foreground p-2">
        <ng-template scTabsContent> Not reachable. </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTabsDemo {}
