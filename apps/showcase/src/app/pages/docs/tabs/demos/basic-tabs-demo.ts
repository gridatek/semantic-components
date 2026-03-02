import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTab, ScTabList, ScTabPanel, ScTabs } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-tabs-demo',
  imports: [ScTabs, ScTabPanel, ScTabList, ScTab],
  template: `
    <div scTabs class="w-[400px]">
      <div scTabList [selectedTab]="'account'" class="grid w-full grid-cols-2">
        <button scTab value="account">Account</button>
        <button scTab value="password">Password</button>
      </div>
      <div scTabPanel value="account">
        <div class="space-y-4 rounded-lg border p-4">
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Account</h3>
            <p class="text-muted-foreground text-sm">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="name">Name</label>
            <input
              id="name"
              class="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-none"
              value="Pedro Duarte"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="username">Username</label>
            <input
              id="username"
              class="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-none"
              value="@peduarte"
            />
          </div>
          <button
            class="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            Save changes
          </button>
        </div>
      </div>
      <div scTabPanel value="password">
        <div class="space-y-4 rounded-lg border p-4">
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Password</h3>
            <p class="text-muted-foreground text-sm">
              Change your password here. After saving, you'll be logged out.
            </p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="current">
              Current password
            </label>
            <input
              id="current"
              type="password"
              class="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-none"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="new">New password</label>
            <input
              id="new"
              type="password"
              class="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-none"
            />
          </div>
          <button
            class="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            Save password
          </button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTabsDemo {}
