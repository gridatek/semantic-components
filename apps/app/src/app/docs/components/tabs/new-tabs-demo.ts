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
  ScFieldset,
  ScInput,
  ScLabel,
  ScNewTab,
  ScNewTabContent,
  ScNewTabList,
  ScNewTabPanel,
  ScNewTabs,
} from '@semantic-components/ui';

@Component({
  selector: 'app-new-tabs-demo',
  imports: [
    ScNewTabs,
    ScNewTabList,
    ScNewTab,
    ScNewTabPanel,
    ScNewTabContent,
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
  template: `
    <div class="w-[400px]" scNewTabs>
      <div class="grid w-full grid-cols-2" [selectedTab]="'account'" scNewTabList>
        <button scNewTab value="account">Account</button>
        <button scNewTab value="password">Password</button>
      </div>

      <div scNewTabPanel value="account">
        <ng-template scNewTabContent>
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

      <div scNewTabPanel value="password">
        <ng-template scNewTabContent>
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
  `,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTabsDemo {}
