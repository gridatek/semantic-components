import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScButton,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
  ScSeparator,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import {
  SiBellIcon,
  SiMessageSquareIcon,
  SiPanelLeftIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';
import { MESSAGES, NOTIFICATIONS } from '../data/dashboard';
import { LocaleSelect } from './locale-select';
import { ThemeMenu } from './theme-menu';

/**
 * The header: the sidebar's toggle, the search, and on the end the theme,
 * messages, notifications and the profile's menu (shadcndashboard's).
 */
@Component({
  selector: 'app-header',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScButton,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
    ScSeparator,
    ScSidebarTrigger,
    SiBellIcon,
    SiMessageSquareIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    LocaleSelect,
    ThemeMenu,
  ],
  template: `
    <header
      class="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4 md:px-6"
    >
      <button scSidebarTrigger>
        <svg siPanelLeftIcon></svg>
        <span i18n="@@layout.appHeader.toggleSidebar" class="sr-only"
          >Toggle sidebar</span
        >
      </button>
      <div
        scSeparator
        orientation="vertical"
        class="me-2 h-4 self-center"
      ></div>
      <div role="search" class="hidden max-w-sm flex-1 sm:block">
        <div scInputGroup>
          <input
            i18n-aria-label="@@layout.appHeader.search"
            i18n-placeholder="@@layout.appHeader.search2"
            scInput
            type="search"
            placeholder="Search…"
            aria-label="Search"
          />
          <div scInputGroupAddon><svg siSearchIcon></svg></div>
        </div>
      </div>
      <div class="ms-auto flex items-center gap-1">
        <app-locale-select />
        <app-theme-menu />

        <div scMenuProvider alignment="end">
          <button scButton scMenuTrigger variant="ghost" size="icon">
            <svg siMessageSquareIcon></svg>
            <span i18n="@@layout.appHeader.messages" class="sr-only"
              >Messages</span
            >
          </button>
          <ng-template scMenuPortal>
            <div scMenu class="w-72">
              <ng-template scMenuContent>
                <div scMenuGroup>
                  <div i18n="@@layout.appHeader.messages" scMenuLabel>
                    Messages
                  </div>
                  @for (message of messages; track message.name) {
                    <div scMenuItem [value]="message.name" class="gap-3">
                      <span scAvatar class="size-8">
                        <img scAvatarImage [src]="message.avatar" alt="" />
                        <span scAvatarFallback>{{ message.name[0] }}</span>
                      </span>
                      <span class="flex min-w-0 flex-col">
                        <span class="font-medium">{{ message.name }}</span>
                        <span class="text-muted-foreground truncate text-xs">
                          {{ message.text }}
                        </span>
                      </span>
                    </div>
                  }
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>

        <div scMenuProvider alignment="end">
          <button scButton scMenuTrigger variant="ghost" size="icon">
            <svg siBellIcon></svg>
            <span i18n="@@layout.appHeader.notifications" class="sr-only"
              >Notifications</span
            >
          </button>
          <ng-template scMenuPortal>
            <div scMenu class="w-72">
              <ng-template scMenuContent>
                <div scMenuGroup>
                  <div i18n="@@layout.appHeader.notifications" scMenuLabel>
                    Notifications
                  </div>
                  @for (
                    notification of notifications;
                    track notification.title
                  ) {
                    <div scMenuItem [value]="notification.title">
                      <span class="flex min-w-0 flex-col">
                        <span class="font-medium">{{
                          notification.title
                        }}</span>
                        <span class="text-muted-foreground truncate text-xs">
                          {{ notification.text }}
                        </span>
                      </span>
                    </div>
                  }
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>

        <div scMenuProvider alignment="end">
          <button
            scButton
            scMenuTrigger
            variant="ghost"
            size="icon"
            class="rounded-full"
          >
            <span scAvatar class="size-8">
              <img scAvatarImage src="images/profile/user-1.png" alt="" />
              <span scAvatarFallback>MA</span>
            </span>
            <span i18n="@@layout.appHeader.account" class="sr-only"
              >Account</span
            >
          </button>
          <ng-template scMenuPortal>
            <div scMenu class="w-56" (itemSelected)="go($event)">
              <ng-template scMenuContent>
                <div scMenuGroup>
                  <div
                    i18n="@@layout.appHeader.mathewAndersonMathewAndersonGmail"
                    scMenuLabel
                  >
                    <span class="block font-medium">Mathew Anderson</span>
                    <span
                      class="text-muted-foreground block text-xs font-normal"
                    >
                      mathew.anderson&#64;gmail.com
                    </span>
                  </div>
                  <div
                    i18n="@@layout.appHeader.myProfile"
                    scMenuItem
                    value="/pages/user-profile"
                  >
                    My Profile
                  </div>
                  <div
                    i18n="@@layout.appHeader.myNotes"
                    scMenuItem
                    value="/apps/notes"
                  >
                    My Notes
                  </div>
                  <div
                    i18n="@@layout.appHeader.myTickets"
                    scMenuItem
                    value="/apps/tickets"
                  >
                    My Tickets
                  </div>
                </div>
                <div scMenuSeparator></div>
                <div
                  i18n="@@layout.appHeader.logOut"
                  scMenuItem
                  value="/auth/login"
                  variant="destructive"
                >
                  Log out
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>
      </div>
    </header>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class AppHeader {
  private readonly router = inject(Router);
  private readonly messages = MESSAGES;
  private readonly notifications = NOTIFICATIONS;

  private go(url: unknown): void {
    if (typeof url === 'string') void this.router.navigateByUrl(url);
  }
}
