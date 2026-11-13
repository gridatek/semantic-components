import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
} from '@semantic-components/ui';

/** orientation="vertical": the list beside the panels; ArrowUp and ArrowDown move. */
@Component({
  selector: 'app-vertical-tabs-demo',
  imports: [ScTabs, ScTabsList, ScTabsTab, ScTabsPanel, ScTabsPanelContent],
  template: `
    <div scTabs value="account" orientation="vertical">
      <div scTabsList>
        <button scTabsTab value="account">Account</button>
        <button scTabsTab value="password">Password</button>
        <button scTabsTab value="notifications">Notifications</button>
      </div>
      <div scTabsPanel value="account" class="text-muted-foreground p-2">
        <ng-template scTabsPanelContent> Your name and email. </ng-template>
      </div>
      <div scTabsPanel value="password" class="text-muted-foreground p-2">
        <ng-template scTabsPanelContent> Change your password. </ng-template>
      </div>
      <div scTabsPanel value="notifications" class="text-muted-foreground p-2">
        <ng-template scTabsPanelContent>
          What we tell you, and how.
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalTabsDemo {}
