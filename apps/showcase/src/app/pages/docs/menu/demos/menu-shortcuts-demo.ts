import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiCirclePlusIcon,
  SiCreditCardIcon,
  SiGithubIcon,
  SiKeyboardIcon,
  SiLifeBuoyIcon,
  SiLogOutIcon,
  SiMailIcon,
  SiMessageSquareIcon,
  SiSettingsIcon,
  SiUserIcon,
  SiUserPlusIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-menu-shortcuts-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
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
          <ng-template scMenuContent>
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
              <span
                class="text-muted-foreground ml-auto text-xs tracking-widest"
              >
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
              <span
                class="text-muted-foreground ml-auto text-xs tracking-widest"
              >
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
              <span
                class="text-muted-foreground ml-auto text-xs tracking-widest"
              >
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
              <span
                class="text-muted-foreground ml-auto text-xs tracking-widest"
              >
                ⌘K
              </span>
            </div>
            <div scMenuSeparator></div>
            <div scMenuItem value="Invite users">
              <svg
                siUserPlusIcon
                class="text-muted-foreground size-4"
                aria-hidden="true"
              ></svg>
              <span class="flex-1">Invite users</span>
              <svg
                siChevronRightIcon
                class="ml-auto size-4"
                aria-hidden="true"
              ></svg>
              <ng-template scMenuPortal>
                <div scMenu>
                  <ng-template scMenuContent>
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
                  </ng-template>
                </div>
              </ng-template>
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
              <span
                class="text-muted-foreground ml-auto text-xs tracking-widest"
              >
                ⇧⌘Q
              </span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuShortcutsDemo {}
