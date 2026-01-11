import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { AriaMenuDemo } from './aria-menu-demo';

@Component({
  selector: 'app-aria-menu-demo-section',
  imports: [AriaMenuDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-aria-menu-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaMenuDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
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
  template: \`
    <button ngMenuTrigger [menu]="myMenu" sc-button variant="outline">Open</button>

    <div
      class="z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
      ngMenu
      #myMenu="ngMenu"
    >
      <ng-template ngMenuContent>
        <div class="px-2 py-1.5 text-sm font-semibold">My Account</div>
        <div class="-mx-1 my-1 h-px bg-muted"></div>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'profile'"
        >
          <svg si-user-icon></svg>
          <span>Profile</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⇧⌘P</span>
        </button>
        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'billing'"
        >
          <svg si-credit-card-icon></svg>
          <span>Billing</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘B</span>
        </button>
        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'settings'"
        >
          <svg si-settings-icon></svg>
          <span>Settings</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘S</span>
        </button>
        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'keyboard'"
        >
          <svg si-keyboard-icon></svg>
          <span>Keyboard shortcuts</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘K</span>
        </button>

        <div class="-mx-1 my-1 h-px bg-muted"></div>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'team'"
        >
          <svg si-users-icon></svg>
          <span>Team</span>
        </button>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'invite'"
          [submenu]="subMenu"
        >
          <svg si-user-plus-icon></svg>
          <span>Invite users</span>
          <svg class="ml-auto" si-chevron-right-icon></svg>
        </button>

        <div
          class="z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          ngMenu
          #subMenu="ngMenu"
        >
          <ng-template ngMenuContent>
            <button
              class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              ngMenuItem
              [value]="'email'"
            >
              <svg si-mail-icon></svg>
              <span>Email</span>
            </button>
            <button
              class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              ngMenuItem
              [value]="'message'"
            >
              <svg si-message-square-icon></svg>
              <span>Message</span>
            </button>
            <div class="-mx-1 my-1 h-px bg-muted"></div>
            <button
              class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              ngMenuItem
              [value]="'more'"
            >
              <svg si-circle-plus-icon></svg>
              <span>More...</span>
            </button>
          </ng-template>
        </div>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'newteam'"
        >
          <svg si-plus-icon></svg>
          <span>New Team</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘+T</span>
        </button>

        <div class="-mx-1 my-1 h-px bg-muted"></div>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'github'"
        >
          <svg si-github-icon></svg>
          <span>GitHub</span>
        </button>
        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'support'"
        >
          <svg si-life-buoy-icon></svg>
          <span>Support</span>
        </button>
        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'api'"
          [disabled]="true"
        >
          <svg si-cloud-icon></svg>
          <span>API</span>
        </button>

        <div class="-mx-1 my-1 h-px bg-muted"></div>

        <button
          class="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          ngMenuItem
          [value]="'logout'"
        >
          <svg si-log-out-icon></svg>
          <span>Log out</span>
          <span class="ml-auto text-xs tracking-widest text-muted-foreground">⇧⌘Q</span>
        </button>
      </ng-template>
    </div>
  \`,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaMenuDemo {}`;
}
