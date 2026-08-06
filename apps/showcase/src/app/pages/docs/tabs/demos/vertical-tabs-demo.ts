import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui';

@Component({
  selector: 'app-vertical-tabs-demo',
  imports: [ScTabs, ScTabPanel, ScTabContent, ScTabList, ScTab],
  template: `
    <div scTabs orientation="vertical" class="w-[500px]">
      <div scTabList [selectedTab]="'account'">
        <button scTab value="account">Account</button>
        <button scTab value="password">Password</button>
        <button scTab value="settings">Settings</button>
      </div>
      <div scTabPanel value="account" class="w-full">
        <ng-template scTabContent>
          <div class="space-y-2 rounded-lg border p-4">
            <h3 class="text-lg font-medium">Account</h3>
            <p class="text-muted-foreground text-sm">
              Manage your account settings and preferences.
            </p>
          </div>
        </ng-template>
      </div>
      <div scTabPanel value="password" class="w-full">
        <ng-template scTabContent>
          <div class="space-y-2 rounded-lg border p-4">
            <h3 class="text-lg font-medium">Password</h3>
            <p class="text-muted-foreground text-sm">
              Change your password and security settings.
            </p>
          </div>
        </ng-template>
      </div>
      <div scTabPanel value="settings" class="w-full">
        <ng-template scTabContent>
          <div class="space-y-2 rounded-lg border p-4">
            <h3 class="text-lg font-medium">Settings</h3>
            <p class="text-muted-foreground text-sm">
              Configure your application preferences.
            </p>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalTabsDemo {}
