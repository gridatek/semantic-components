import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSidebarNext,
  ScSidebarNextContent,
  ScSidebarNextFooter,
  ScSidebarNextGroup,
  ScSidebarNextGroupContent,
  ScSidebarNextGroupLabel,
  ScSidebarNextHeader,
  ScSidebarNextInset,
  ScSidebarNextMenu,
  ScSidebarNextMenuButton,
  ScSidebarNextMenuItem,
  ScSidebarNextProvider,
  ScSidebarNextRail,
  ScSidebarNextTrigger,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiGalleryVerticalEndIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiPanelLeftIcon,
  SiSearchIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

/** A page with a sidebar: its header, its menu in a group, its footer. The trigger (or Ctrl/⌘ + B, or its edge) opens and closes it; on a phone it is a sheet. */
@Component({
  selector: 'app-sidebar-next-usage-demo',
  imports: [
    ScSidebarNext,
    ScSidebarNextContent,
    ScSidebarNextFooter,
    ScSidebarNextGroup,
    ScSidebarNextGroupContent,
    ScSidebarNextGroupLabel,
    ScSidebarNextHeader,
    ScSidebarNextInset,
    ScSidebarNextMenu,
    ScSidebarNextMenuButton,
    ScSidebarNextMenuItem,
    ScSidebarNextProvider,
    ScSidebarNextRail,
    ScSidebarNextTrigger,
    SiCalendarIcon,
    SiGalleryVerticalEndIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    SiSettingsIcon,
  ],
  template: `
    <div scSidebarNextProvider [storageKey]="null">
      <aside scSidebarNext aria-label="Sidebar, usage">
        <div scSidebarNextHeader>
          <ul scSidebarNextMenu>
            <li scSidebarNextMenuItem>
              <a
                scSidebarNextMenuButton
                size="lg"
                href="#"
                (click)="$event.preventDefault()"
              >
                <span
                  class="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <svg siGalleryVerticalEndIcon></svg>
                </span>
                <span class="grid flex-1 text-sm leading-tight">
                  <span class="truncate font-semibold">Acme Inc</span>
                  <span class="text-sidebar-foreground/70 truncate text-xs"
                    >Enterprise</span
                  >
                </span>
              </a>
            </li>
          </ul>
        </div>
        <nav scSidebarNextContent aria-label="Main, usage">
          <div scSidebarNextGroup>
            <div scSidebarNextGroupLabel>Application</div>
            <div scSidebarNextGroupContent>
              <ul scSidebarNextMenu>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    [active]="active() === 'Home'"
                    (click)="go($event, 'Home')"
                  >
                    <svg siHouseIcon></svg>
                    <span>Home</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    [active]="active() === 'Inbox'"
                    (click)="go($event, 'Inbox')"
                  >
                    <svg siInboxIcon></svg>
                    <span>Inbox</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    [active]="active() === 'Calendar'"
                    (click)="go($event, 'Calendar')"
                  >
                    <svg siCalendarIcon></svg>
                    <span>Calendar</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    [active]="active() === 'Search'"
                    (click)="go($event, 'Search')"
                  >
                    <svg siSearchIcon></svg>
                    <span>Search</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    [active]="active() === 'Settings'"
                    (click)="go($event, 'Settings')"
                  >
                    <svg siSettingsIcon></svg>
                    <span>Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div scSidebarNextFooter>
          <p class="text-sidebar-foreground/70 truncate px-2 text-xs">
            Signed in as Ada
          </p>
        </div>
        <button scSidebarNextRail></button>
      </aside>
      <main scSidebarNextInset aria-label="Usage example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarNextTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">Sidebar</span>
          </button>
        </header>
        <div class="p-4">
          <p class="text-muted-foreground text-sm">Page: {{ active() }}</p>
        </div>
      </main>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class SidebarNextUsageDemo {
  protected readonly active = signal('Home');

  protected go(event: Event, page: string): void {
    event.preventDefault();
    this.active.set(page);
  }
}
