import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenuNext,
  ScMenuNextContent,
  ScMenuNextGroup,
  ScMenuNextItem,
  ScMenuNextLabel,
  ScMenuNextPortal,
  ScMenuNextProvider,
  ScMenuNextSeparator,
  ScMenuNextTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-menu-next-usage-demo',
  imports: [
    ScButton,
    ScMenuNext,
    ScMenuNextContent,
    ScMenuNextGroup,
    ScMenuNextItem,
    ScMenuNextLabel,
    ScMenuNextPortal,
    ScMenuNextProvider,
    ScMenuNextSeparator,
    ScMenuNextTrigger,
  ],
  template: `
    <div scMenuNextProvider>
      <button scButton scMenuNextTrigger variant="outline">Open</button>
      <ng-template scMenuNextPortal>
        <div scMenuNext>
          <ng-template scMenuNextContent>
            <div scMenuNextGroup>
              <div scMenuNextLabel>My Account</div>
              <div scMenuNextItem value="Profile">Profile</div>
              <div scMenuNextItem value="Billing">Billing</div>
              <div scMenuNextItem value="Settings">Settings</div>
            </div>
            <div scMenuNextSeparator></div>
            <div scMenuNextItem value="Log out" variant="destructive">
              Log out
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuNextUsageDemo {}
