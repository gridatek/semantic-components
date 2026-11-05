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
  ScMenuShortcut,
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
    ScMenuShortcut,
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
                <span scMenuShortcut>⇧⌘P</span>
              </div>
              <div scMenuItem value="Billing">
                Billing
                <span scMenuShortcut>⌘B</span>
              </div>
              <div scMenuItem value="Settings">
                Settings
                <span scMenuShortcut>⌘S</span>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuItem value="Log out">
              Log out
              <span scMenuShortcut>⇧⌘Q</span>
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
