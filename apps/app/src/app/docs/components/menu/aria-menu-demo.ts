import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScButton } from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiCirclePlusIcon,
  SiCloudIcon,
  SiCreditCardIcon,
  SiGithubIcon,
  SiKeyboardIcon,
  SiLifeBuoyIcon,
  SiLogOutIcon,
  SiMailIcon,
  SiMessageSquareIcon,
  SiPlusIcon,
  SiSettingsIcon,
  SiUserIcon,
  SiUserPlusIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-aria-menu-demo',
  imports: [
    Menu,
    MenuItem,
    MenuTrigger,
    MenuContent,
    ScButton,
    SiUserIcon,
    SiCreditCardIcon,
    SiSettingsIcon,
    SiKeyboardIcon,
    SiUsersIcon,
    SiUserPlusIcon,
    SiMailIcon,
    SiMessageSquareIcon,
    SiCirclePlusIcon,
    SiPlusIcon,
    SiGithubIcon,
    SiLifeBuoyIcon,
    SiCloudIcon,
    SiLogOutIcon,
    SiChevronRightIcon,
  ],
  template: `
    <button [menu]="myMenu" ngMenuTrigger sc-button variant="outline">Open</button>

    <div
      class="z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
      #myMenu="ngMenu"
      ngMenu
    >
      <ng-template ngMenuContent>
        <div class="px-2 py-1.5 text-sm font-semibold">My Account</div>
        <div class="-mx-1 my-1 h-px bg-muted"></div>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'profile'"
          ngMenuItem
        >
          <svg si-user-icon></svg>
          <span>Profile</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⇧⌘P</span>
        </button>
        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'billing'"
          ngMenuItem
        >
          <svg si-credit-card-icon></svg>
          <span>Billing</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘B</span>
        </button>
        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'settings'"
          ngMenuItem
        >
          <svg si-settings-icon></svg>
          <span>Settings</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘S</span>
        </button>
        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'keyboard'"
          ngMenuItem
        >
          <svg si-keyboard-icon></svg>
          <span>Keyboard shortcuts</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘K</span>
        </button>

        <div class="-mx-1 my-1 h-px bg-muted"></div>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'team'"
          ngMenuItem
        >
          <svg si-users-icon></svg>
          <span>Team</span>
        </button>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'invite'"
          [submenu]="subMenu"
          ngMenuItem
        >
          <svg si-user-plus-icon></svg>
          <span>Invite users</span>
          <svg class="ml-auto" si-chevron-right-icon></svg>
        </button>

        <div
          class="z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          #subMenu="ngMenu"
          ngMenu
        >
          <ng-template ngMenuContent>
            <button
              class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              [value]="'email'"
              ngMenuItem
            >
              <svg si-mail-icon></svg>
              <span>Email</span>
            </button>
            <button
              class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              [value]="'message'"
              ngMenuItem
            >
              <svg si-message-square-icon></svg>
              <span>Message</span>
            </button>
            <div class="-mx-1 my-1 h-px bg-muted"></div>
            <button
              class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              [value]="'more'"
              ngMenuItem
            >
              <svg si-circle-plus-icon></svg>
              <span>More...</span>
            </button>
          </ng-template>
        </div>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'newteam'"
          ngMenuItem
        >
          <svg si-plus-icon></svg>
          <span>New Team</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘+T</span>
        </button>

        <div class="-mx-1 my-1 h-px bg-muted"></div>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'github'"
          ngMenuItem
        >
          <svg si-github-icon></svg>
          <span>GitHub</span>
        </button>
        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'support'"
          ngMenuItem
        >
          <svg si-life-buoy-icon></svg>
          <span>Support</span>
        </button>
        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'api'"
          [disabled]="true"
          ngMenuItem
        >
          <svg si-cloud-icon></svg>
          <span>API</span>
        </button>

        <div class="-mx-1 my-1 h-px bg-muted"></div>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          [value]="'logout'"
          ngMenuItem
        >
          <svg si-log-out-icon></svg>
          <span>Log out</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⇧⌘Q</span>
        </button>
      </ng-template>
    </div>
  `,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaMenuDemo {}
