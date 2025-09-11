import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScInput,
  ScLabel,
  ScTab,
  ScTabList,
  ScTabPanelContent,
  ScTabPanels,
  ScTabs,
} from '@semantic-components/ui';

@Component({
  selector: 'app-tabs-demo',
  imports: [
    ScTabs,
    ScTabList,
    ScTab,
    ScTabPanels,
    ScTabPanelContent,
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
  ],
  template: `
    <div class="w-[400px]" sc-tabs value="account">
      <div class="grid w-full grid-cols-2" sc-tab-list>
        <button value="account" sc-tab>Account</button>
        <button value="password" sc-tab>Password</button>
      </div>

      <div sc-tab-panels>
        <ng-template scTabPanelContent="account">
          <div sc-card>
            <div sc-card-header>
              <h2 sc-card-title>Account</h2>
              <p sc-card-description>
                Make changes to your account here. Click save when you're done.
              </p>
            </div>

            <div class="space-y-2" sc-card-content>
              <div class="space-y-1" sc-field controlId="account-name">
                <label sc-label>Name</label>
                <input sc-input value="Pedro Duarte" data-slot="control" />
              </div>
              <div class="space-y-1" sc-field controlId="account-username">
                <label sc-label>Username</label>
                <input sc-input value="@peduarte" data-slot="control" />
              </div>
            </div>
            <div sc-card-footer>
              <button sc-button type="submit">Save changes</button>
            </div>
          </div>
        </ng-template>

        <ng-template scTabPanelContent="password">
          <div sc-card>
            <div sc-card-header>
              <h2 sc-card-title>Password</h2>
              <p sc-card-description>
                Change your password here. After saving, you'll be logged out.
              </p>
            </div>
            <div class="space-y-2" sc-card-content>
              <div class="space-y-1" sc-field controlId="current-password">
                <label sc-label>Current password</label>
                <input sc-input type="password" data-slot="control" />
              </div>
              <div class="space-y-1" sc-field controlId="new-password">
                <label sc-label>New password</label>
                <input sc-input type="password" data-slot="control" />
              </div>
            </div>
            <div sc-card-footer>
              <button sc-button>Save password</button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemo {}
