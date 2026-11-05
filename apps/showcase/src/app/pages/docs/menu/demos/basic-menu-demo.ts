import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
} from '@semantic-components/ui';

/** A labelled group, a line, and a disabled item (reached by the keyboard, not chosen). */
@Component({
  selector: 'app-basic-menu-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
  ],
  template: `
    <div scMenuProvider>
      <button scButton scMenuTrigger variant="outline">Open</button>
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuGroup>
              <div scMenuLabel>My Account</div>
              <div scMenuItem value="Profile">Profile</div>
              <div scMenuItem value="Billing">Billing</div>
              <div scMenuItem value="Settings">Settings</div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuItem value="GitHub">GitHub</div>
            <div scMenuItem value="Support">Support</div>
            <div scMenuItem value="API" [disabled]="true">API</div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicMenuDemo {}
