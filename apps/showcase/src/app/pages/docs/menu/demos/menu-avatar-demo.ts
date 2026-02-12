import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMenu,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-menu-avatar-demo',
  imports: [
    ScMenu,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuProvider,
    ScMenuTrigger,
  ],
  template: `
    <div sc-menu-provider>
      <button
        sc-menu-trigger
        class="size-10 rounded-full border-0 bg-transparent p-0 shadow-none hover:bg-transparent hover:opacity-80"
      >
        <img
          src="https://github.com/shadcn.png"
          alt="User avatar"
          class="size-10 rounded-full"
        />
      </button>
      <div sc-menu-portal>
        <div sc-menu class="w-56">
          <div class="flex items-center gap-2 px-2 py-1.5" role="presentation">
            <img
              src="https://github.com/shadcn.png"
              alt=""
              class="size-8 rounded-full"
            />
            <div class="flex flex-col">
              <span class="text-sm font-semibold">shadcn</span>
              <span class="text-xs text-muted-foreground">
                m&#64;example.com
              </span>
            </div>
          </div>
          <div sc-menu-separator></div>
          <div sc-menu-item value="Profile">
            <svg
              class="text-muted-foreground size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span class="flex-1">Profile</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⇧⌘P
            </span>
          </div>
          <div sc-menu-item value="Billing">
            <svg
              class="text-muted-foreground size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            <span class="flex-1">Billing</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘B
            </span>
          </div>
          <div sc-menu-item value="Settings">
            <svg
              class="text-muted-foreground size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span class="flex-1">Settings</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘S
            </span>
          </div>
          <div sc-menu-separator></div>
          <div sc-menu-item value="Team">
            <svg
              class="text-muted-foreground size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span class="flex-1">Team</span>
          </div>
          <div sc-menu-item value="New Team">
            <svg
              class="text-muted-foreground size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="16" />
              <line x1="8" x2="16" y1="12" y2="12" />
            </svg>
            <span class="flex-1">New Team</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘+T
            </span>
          </div>
          <div sc-menu-separator></div>
          <div
            sc-menu-item
            value="Log out"
            class="text-destructive hover:bg-destructive/10 data-[active=true]:bg-destructive/10"
          >
            <svg
              class="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span class="flex-1">Log out</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⇧⌘Q
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuAvatarDemo {}
