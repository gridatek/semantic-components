import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScKbd,
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

/** A keyboard hint at the end of each item; the text is yours. */
@Component({
  selector: 'app-shortcuts-menu-demo',
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
    ScKbd,
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
              <div scMenuItem value="Profile">
                Profile
                <kbd scKbd>⇧⌘P</kbd>
              </div>
              <div scMenuItem value="Billing">
                Billing
                <kbd scKbd>⌘B</kbd>
              </div>
              <div scMenuItem value="Settings">
                Settings
                <kbd scKbd>⌘S</kbd>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuItem value="Log out">
              Log out
              <kbd scKbd>⇧⌘Q</kbd>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ShortcutsMenuDemo {}
