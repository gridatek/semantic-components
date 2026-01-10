import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { AriaTabsDemo } from './aria-tabs-demo';

@Component({
  selector: 'app-aria-tabs-demo-section',
  imports: [AriaTabsDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-aria-tabs-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaTabsDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldset,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-aria-tabs-demo',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabContent,
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
    ScCardContent,
    ScCardFooter,
    ScField,
    ScLabel,
    ScInput,
    ScButton,
    ScFieldset,
  ],
  template: \`
    <div class="w-[400px]" ngTabs>
      <div
        class="grid h-9 w-full grid-cols-2 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
        ngTabList
      >
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow"
          ngTab
          value="account"
        >
          Account
        </button>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow"
          ngTab
          value="password"
        >
          Password
        </button>
      </div>

      <div class="mt-2" ngTabPanel value="account">
        <ng-template ngTabContent>
          <div sc-card>
          <div sc-card-header>
            <h2 sc-card-title>Account</h2>
            <p sc-card-description>
              Make changes to your account here. Click save when you're done.
            </p>
          </div>

          <div sc-card-content>
            <fieldset sc-fieldset>
              <div sc-field controlId="account-name">
                <label sc-label>Name</label>
                <input sc-input value="Pedro Duarte" data-slot="control" />
              </div>
              <div sc-field controlId="account-username">
                <label sc-label>Username</label>
                <input sc-input value="@peduarte" data-slot="control" />
              </div>
            </fieldset>
          </div>
          <div sc-card-footer>
            <button sc-button type="submit">Save changes</button>
          </div>
        </div>
        </ng-template>
      </div>

      <div class="mt-2" ngTabPanel value="password">
        <ng-template ngTabContent>
          <div sc-card>
          <div sc-card-header>
            <h2 sc-card-title>Password</h2>
            <p sc-card-description>
              Change your password here. After saving, you'll be logged out.
            </p>
          </div>
          <div sc-card-content>
            <fieldset sc-fieldset>
              <div sc-field controlId="current-password">
                <label sc-label>Current password</label>
                <input sc-input type="password" data-slot="control" />
              </div>
              <div sc-field controlId="new-password">
                <label sc-label>New password</label>
                <input sc-input type="password" data-slot="control" />
              </div>
            </fieldset>
          </div>
          <div sc-card-footer>
            <button sc-button>Save password</button>
          </div>
        </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaTabsDemo {}`;
}
