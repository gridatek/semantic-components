import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui';

@Component({
  selector: 'app-tabs-usage-demo',
  imports: [ScTabs, ScTabPanel, ScTabContent, ScTabList, ScTab],
  template: `
    <div scTabs class="w-[400px]">
      <div scTabList [selectedTab]="'account'" class="grid w-full grid-cols-2">
        <button scTab value="account">Account</button>
        <button scTab value="password">Password</button>
      </div>
      <div scTabPanel value="account">
        <ng-template scTabContent>
          <p class="text-muted-foreground p-4 text-sm">
            Make changes to your account here.
          </p>
        </ng-template>
      </div>
      <div scTabPanel value="password">
        <ng-template scTabContent>
          <p class="text-muted-foreground p-4 text-sm">
            Change your password here.
          </p>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsUsageDemo {}
