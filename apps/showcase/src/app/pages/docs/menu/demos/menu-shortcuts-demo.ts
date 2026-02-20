import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScMenu,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuSubProvider,
  ScMenuSub,
  ScMenuSubIcon,
  ScMenuSubPortal,
  ScMenuSubTrigger,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui-lab';
import {
  SiChevronRightIcon,
  SiCreditCardIcon,
  SiGithubIcon,
  SiKeyboardIcon,
  SiLifeBuoyIcon,
  SiLogOutIcon,
  SiMailIcon,
  SiMessageSquareIcon,
  SiCirclePlusIcon,
  SiSettingsIcon,
  SiUserIcon,
  SiUserPlusIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-menu-shortcuts-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuSubProvider,
    ScMenuSub,
    ScMenuSubIcon,
    ScMenuSubPortal,
    ScMenuSubTrigger,
    ScMenuProvider,
    ScMenuTrigger,
    SiChevronRightIcon,
    SiCreditCardIcon,
    SiGithubIcon,
    SiKeyboardIcon,
    SiLifeBuoyIcon,
    SiLogOutIcon,
    SiMailIcon,
    SiMessageSquareIcon,
    SiCirclePlusIcon,
    SiSettingsIcon,
    SiUserIcon,
    SiUserPlusIcon,
  ],
  template: `
    <div scMenuProvider>
      <button scButton scMenuTrigger variant="outline">Open</button>
      <ng-template scMenuPortal>
        <div scMenu class="w-56">
          <div class="px-2 py-1.5 text-sm font-semibold" role="presentation">
            My Account
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Profile">
            <svg
              siUserIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Profile</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⇧⌘P
            </span>
          </div>
          <div scMenuItem value="Billing">
            <svg
              siCreditCardIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Billing</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘B
            </span>
          </div>
          <div scMenuItem value="Settings">
            <svg
              siSettingsIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Settings</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘S
            </span>
          </div>
          <div scMenuItem value="Keyboard shortcuts">
            <svg
              siKeyboardIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Keyboard shortcuts</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘K
            </span>
          </div>
          <div scMenuSeparator></div>
          <div scMenuSubProvider>
            <div scMenuSubTrigger value="Invite users">
              <svg
                siUserPlusIcon
                class="text-muted-foreground size-4"
                aria-hidden="true"
              ></svg>
              <span class="flex-1">Invite users</span>
              <svg scMenuSubIcon siChevronRightIcon></svg>
            </div>
            <div scMenuSubPortal>
              <div scMenuSub>
                <div scMenuItem value="Email">
                  <svg
                    siMailIcon
                    class="text-muted-foreground size-4"
                    aria-hidden="true"
                  ></svg>
                  <span class="flex-1">Email</span>
                </div>
                <div scMenuItem value="Message">
                  <svg
                    siMessageSquareIcon
                    class="text-muted-foreground size-4"
                    aria-hidden="true"
                  ></svg>
                  <span class="flex-1">Message</span>
                </div>
                <div scMenuSeparator></div>
                <div scMenuItem value="More...">
                  <svg
                    siCirclePlusIcon
                    class="text-muted-foreground size-4"
                    aria-hidden="true"
                  ></svg>
                  <span class="flex-1">More...</span>
                </div>
              </div>
            </div>
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="GitHub">
            <svg
              siGithubIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">GitHub</span>
          </div>
          <div scMenuItem value="Support">
            <svg
              siLifeBuoyIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Support</span>
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Log out">
            <svg
              siLogOutIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Log out</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⇧⌘Q
            </span>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuShortcutsDemo {}
