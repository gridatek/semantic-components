import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicTabsDemo } from './basic-tabs-demo';

@Component({
  selector: 'app-basic-tabs-demo-container',
  imports: [DemoContainer, BasicTabsDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/tabs/basic-tabs-demo"
      [code]="code"
    >
      <app-basic-tabs-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTabsDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScField,
  ScInput,
  ScLabel,
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-tabs-demo',
  imports: [
    ScTabs,
    ScTabPanel,
    ScTabContent,
    ScTabList,
    ScTab,
    ScField,
    ScLabel,
    ScInput,
    ScButton,
  ],
  template: \`
    <div scTabs class="w-[400px]">
      <div scTabList [selectedTab]="'account'" class="grid w-full grid-cols-2">
        <button scTab value="account">Account</button>
        <button scTab value="password">Password</button>
      </div>
      <div scTabPanel value="account">
        <ng-template scTabContent>
          <div class="space-y-4 rounded-lg border p-4">
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Account</h3>
              <p class="text-muted-foreground text-sm">
                Make changes to your account here. Click save when you're done.
              </p>
            </div>
            <div scField>
              <label scLabel>Name</label>
              <input scInput value="Pedro Duarte" />
            </div>
            <div scField>
              <label scLabel>Username</label>
              <input scInput value="@peduarte" />
            </div>
            <button scButton>Save changes</button>
          </div>
        </ng-template>
      </div>
      <div scTabPanel value="password">
        <ng-template scTabContent>
          <div class="space-y-4 rounded-lg border p-4">
            <div class="space-y-2">
              <h3 class="text-lg font-medium">Password</h3>
              <p class="text-muted-foreground text-sm">
                Change your password here. After saving, you'll be logged out.
              </p>
            </div>
            <div scField>
              <label scLabel>Current password</label>
              <input scInput type="password" />
            </div>
            <div scField>
              <label scLabel>New password</label>
              <input scInput type="password" />
            </div>
            <button scButton>Save password</button>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTabsDemo {}`;
}
