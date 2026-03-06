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
  SiCirclePlusIcon,
  SiCreditCardIcon,
  SiLogOutIcon,
  SiSettingsIcon,
  SiUserIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-menu-avatar-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuProvider,
    ScMenuTrigger,
    SiCreditCardIcon,
    SiLogOutIcon,
    SiCirclePlusIcon,
    SiSettingsIcon,
    SiUserIcon,
    SiUsersIcon,
  ],
  template: `
    <div scMenuProvider>
      <button
        scButton
        scMenuTrigger
        variant="ghost"
        class="size-10 rounded-full p-0"
      >
        <img
          src="https://github.com/shadcn.png"
          alt="User avatar"
          class="size-10 rounded-full"
        />
      </button>
      <ng-template scMenuPortal>
        <div scMenu class="w-56">
          <ng-template scMenuContent>
            <div
              class="flex items-center gap-2 px-2 py-1.5"
              role="presentation"
            >
              <img
                src="https://github.com/shadcn.png"
                alt=""
                class="size-8 rounded-full"
              />
              <div class="flex flex-col">
                <span class="text-sm font-semibold">shadcn</span>
                <span class="text-muted-foreground text-xs">
                  m&#64;example.com
                </span>
              </div>
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
            <div scMenuSeparator></div>
            <div scMenuItem value="Team">
              <svg
                siUsersIcon
                class="text-muted-foreground size-4"
                aria-hidden="true"
              ></svg>
              <span class="flex-1">Team</span>
            </div>
            <div scMenuItem value="New Team">
              <svg
                siCirclePlusIcon
                class="text-muted-foreground size-4"
                aria-hidden="true"
              ></svg>
              <span class="flex-1">New Team</span>
              <span
                class="text-muted-foreground ml-auto text-xs tracking-widest"
              >
                ⌘+T
              </span>
            </div>
            <div scMenuSeparator></div>
            <div
              scMenuItem
              value="Log out"
              class="text-destructive hover:bg-destructive/10 data-[active=true]:bg-destructive/10"
            >
              <svg siLogOutIcon class="size-4" aria-hidden="true"></svg>
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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuAvatarDemo {}
