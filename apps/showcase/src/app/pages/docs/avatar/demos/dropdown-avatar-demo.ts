import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
} from '@semantic-components/ui';

/**
 * An avatar that opens the account menu: a round icon button around it, named
 * by its sr-only text (the picture is decoration then).
 */
@Component({
  selector: 'app-dropdown-avatar-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
  ],
  template: `
    <div scMenuProvider>
      <button
        scButton
        scMenuTrigger
        variant="ghost"
        size="icon"
        class="rounded-full"
      >
        <span scAvatar aria-hidden="true">
          <img scAvatarImage src="https://github.com/shadcn.png" alt="" />
          <span scAvatarFallback>CN</span>
        </span>
        <span class="sr-only">Account</span>
      </button>
      <ng-template scMenuPortal>
        <div scMenu class="w-32">
          <ng-template scMenuContent>
            <div scMenuItem value="Profile">Profile</div>
            <div scMenuItem value="Billing">Billing</div>
            <div scMenuItem value="Settings">Settings</div>
            <div scMenuSeparator></div>
            <div
              scMenuItem
              value="Log out"
              class="text-destructive hover:bg-destructive/10 data-[active=true]:bg-destructive/10"
            >
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
export class DropdownAvatarDemo {}
