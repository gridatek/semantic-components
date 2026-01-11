import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, viewChild } from '@angular/core';

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
    OverlayModule,
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
    <button #trigger="ngMenuTrigger" #triggerBtn [menu]="formatMenuRef" ngMenuTrigger>
      Open Menu
    </button>

    <ng-template
      [cdkConnectedOverlayOrigin]="triggerBtn"
      [cdkConnectedOverlayOpen]="trigger.expanded()"
      cdkConnectedOverlay
    >
      <div class="menu-container" #formatMenuRef="ngMenu" ngMenu>
        <ng-template ngMenuContent>
          <button [value]="'profile'" ngMenuItem>
            <svg si-user-icon></svg>
            <span>Profile</span>
            <span>⇧⌘P</span>
          </button>
          <button [value]="'billing'" ngMenuItem>
            <svg si-credit-card-icon></svg>
            <span>Billing</span>
            <span>⌘B</span>
          </button>
          <button [value]="'settings'" ngMenuItem>
            <svg si-settings-icon></svg>
            <span>Settings</span>
            <span>⌘S</span>
          </button>
          <button [value]="'keyboard'" ngMenuItem>
            <svg si-keyboard-icon></svg>
            <span>Keyboard shortcuts</span>
            <span>⌘K</span>
          </button>

          <hr />

          <button [value]="'team'" ngMenuItem>
            <svg si-users-icon></svg>
            <span>Team</span>
          </button>

          <button #inviteItem="ngMenuItem" [value]="'invite'" [submenu]="inviteMenuRef" ngMenuItem>
            <svg si-user-plus-icon></svg>
            <span>Invite users</span>
            <svg si-chevron-right-icon></svg>
          </button>

          <div class="menu-container" #inviteMenuRef="ngMenu" ngMenu style="position: absolute;">
            <ng-template ngMenuContent>
              <button [value]="'email'" ngMenuItem>
                <svg si-mail-icon></svg>
                <span>Email</span>
              </button>
              <button [value]="'message'" ngMenuItem>
                <svg si-message-square-icon></svg>
                <span>Message</span>
              </button>
              <hr />
              <button [value]="'more'" ngMenuItem>
                <svg si-circle-plus-icon></svg>
                <span>More...</span>
              </button>
            </ng-template>
          </div>

          <button [value]="'newteam'" ngMenuItem>
            <svg si-plus-icon></svg>
            <span>New Team</span>
            <span>⌘+T</span>
          </button>

          <hr />

          <button [value]="'github'" ngMenuItem>
            <svg si-github-icon></svg>
            <span>GitHub</span>
          </button>
          <button [value]="'support'" ngMenuItem>
            <svg si-life-buoy-icon></svg>
            <span>Support</span>
          </button>
          <button [value]="'api'" [disabled]="true" ngMenuItem>
            <svg si-cloud-icon></svg>
            <span>API</span>
          </button>

          <hr />

          <button [value]="'logout'" ngMenuItem>
            <svg si-log-out-icon></svg>
            <span>Log out</span>
            <span>⇧⌘Q</span>
          </button>
        </ng-template>
      </div>
    </ng-template>
  `,
  styles: `
    .menu-container {
      min-width: 12rem;
      overflow: hidden;
      border-radius: 0.375rem;
      border: 1px solid hsl(var(--border));
      background-color: hsl(var(--popover));
      padding: 0.25rem;
      color: hsl(var(--popover-foreground));
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
      z-index: 50;
    }

    .menu-container button {
      position: relative;
      display: flex;
      width: 100%;
      cursor: pointer;
      user-select: none;
      align-items: center;
      gap: 0.5rem;
      border-radius: 0.125rem;
      padding: 0.375rem 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      outline: none;
      transition-property: color, background-color;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      background: transparent;
      border: none;
      text-align: left;
    }

    .menu-container button:hover {
      background-color: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
    }

    .menu-container button:focus {
      background-color: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
    }

    .menu-container button[disabled] {
      pointer-events: none;
      opacity: 0.5;
    }

    .menu-container button svg {
      pointer-events: none;
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }

    .menu-container button span:last-child {
      margin-left: auto;
      font-size: 0.75rem;
      line-height: 1rem;
      letter-spacing: 0.05em;
      color: hsl(var(--muted-foreground));
    }

    .menu-container hr {
      margin: 0.25rem -0.25rem;
      height: 1px;
      border: none;
      background-color: hsl(var(--muted));
    }
  `,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaMenuDemo {}
