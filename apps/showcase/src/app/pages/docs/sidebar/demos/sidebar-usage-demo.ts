import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSidebar,
  ScSidebarContent,
  ScSidebarFooter,
  ScSidebarGroup,
  ScSidebarGroupContent,
  ScSidebarGroupLabel,
  ScSidebarHeader,
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarProvider,
  ScSidebarRail,
  ScSidebarTrigger,
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
  selector: 'app-sidebar-usage-demo',
  imports: [
    ScSidebar,
    ScSidebarContent,
    ScSidebarFooter,
    ScSidebarGroup,
    ScSidebarGroupContent,
    ScSidebarGroupLabel,
    ScSidebarHeader,
    ScSidebarInset,
    ScSidebarMenu,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarProvider,
    ScSidebarRail,
    ScSidebarTrigger,
    SiCalendarIcon,
    SiGalleryVerticalEndIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    SiSettingsIcon,
  ],
  template: `
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, usage">
        <div scSidebarHeader>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a
                scSidebarMenuButton
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
        <nav scSidebarContent aria-label="Main, usage">
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Application</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    [active]="active() === 'Home'"
                    (click)="go($event, 'Home')"
                  >
                    <svg siHouseIcon></svg>
                    <span>Home</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    [active]="active() === 'Inbox'"
                    (click)="go($event, 'Inbox')"
                  >
                    <svg siInboxIcon></svg>
                    <span>Inbox</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    [active]="active() === 'Calendar'"
                    (click)="go($event, 'Calendar')"
                  >
                    <svg siCalendarIcon></svg>
                    <span>Calendar</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    [active]="active() === 'Search'"
                    (click)="go($event, 'Search')"
                  >
                    <svg siSearchIcon></svg>
                    <span>Search</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
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
        <div scSidebarFooter>
          <p class="text-sidebar-foreground/70 truncate px-2 text-xs">
            Signed in as Ada
          </p>
        </div>
        <button scSidebarRail></button>
      </aside>
      <main scSidebarInset aria-label="Usage example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarTrigger>
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
export class SidebarUsageDemo {
  protected readonly active = signal('Home');

  protected go(event: Event, page: string): void {
    event.preventDefault();
    this.active.set(page);
  }
}
