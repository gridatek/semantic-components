import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicTabsDemo } from './basic-tabs-demo';

@Component({
  selector: 'app-basic-tabs-demo-container',
  imports: [DemoContainer, BasicTabsDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-tabs-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTabsDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTabs, ScTabPanel, ScTabList, ScTab } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-tabs-demo',
  imports: [ScTabs, ScTabPanel, ScTabList, ScTab],
  template: \`
    <div sc-tabs class="w-[400px]">
      <div
        sc-tab-list
        [selectedTab]="'account'"
        class="grid w-full grid-cols-2"
      >
        <button sc-tab value="account">Account</button>
        <button sc-tab value="password">Password</button>
      </div>
      <div sc-tab-panel value="account">
        <div class="space-y-4 rounded-lg border p-4">
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Account</h3>
            <p class="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="name">Name</label>
            <input
              id="name"
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value="Pedro Duarte"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="username">Username</label>
            <input
              id="username"
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value="@peduarte"
            />
          </div>
          <button
            class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Save changes
          </button>
        </div>
      </div>
      <div sc-tabs-panel value="password">
        <div class="space-y-4 rounded-lg border p-4">
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Password</h3>
            <p class="text-sm text-muted-foreground">
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
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="new">New password</label>
            <input
              id="new"
              type="password"
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <button
            class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Save password
          </button>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTabsDemo {}`;
}
