import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
  ScSidebar,
  ScSidebarContent,
  ScSidebarGroup,
  ScSidebarGroupContent,
  ScSidebarGroupLabel,
  ScSidebarHeader,
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarProvider,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronDownIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiPanelLeftIcon,
  SiSearchIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

/** The header stays at the top: here a menu to switch workspace. */
@Component({
  selector: 'app-header-sidebar-demo',
  imports: [
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    ScSidebar,
    ScSidebarContent,
    ScSidebarGroup,
    ScSidebarGroupContent,
    ScSidebarGroupLabel,
    ScSidebarHeader,
    ScSidebarInset,
    ScSidebarMenu,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarProvider,
    ScSidebarTrigger,
    SiCalendarIcon,
    SiChevronDownIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    SiSettingsIcon,
  ],
  template: `
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, header">
        <div scSidebarHeader>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <div scMenuProvider>
                <button scSidebarMenuButton scMenuTrigger>
                  <span>Select Workspace</span>
                  <svg siChevronDownIcon class="ms-auto"></svg>
                </button>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Acme Inc">Acme Inc</div>
                      <div scMenuItem value="Acme Corp.">Acme Corp.</div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
            </li>
          </ul>
        </div>
        <nav scSidebarContent aria-label="Main, header">
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Application</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siHouseIcon></svg>
                    <span>Home</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siInboxIcon></svg>
                    <span>Inbox</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siCalendarIcon></svg>
                    <span>Calendar</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siSearchIcon></svg>
                    <span>Search</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siSettingsIcon></svg>
                    <span>Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarInset aria-label="Header example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">Sidebar</span>
          </button>
        </header>
      </main>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class HeaderSidebarDemo {}
