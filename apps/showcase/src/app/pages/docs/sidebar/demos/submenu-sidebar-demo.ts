import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsibleBody,
  ScCollapsibleContent,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScSidebar,
  ScSidebarContent,
  ScSidebarFooter,
  ScSidebarGroup,
  ScSidebarGroupAction,
  ScSidebarGroupContent,
  ScSidebarGroupLabel,
  ScSidebarHeader,
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuBadge,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarMenuSub,
  ScSidebarMenuSubButton,
  ScSidebarMenuSubItem,
  ScSidebarProvider,
  ScSidebarRail,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import {
  SiBookOpenIcon,
  SiCalendarIcon,
  SiChevronRightIcon,
  SiGalleryVerticalEndIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiPanelLeftIcon,
  SiPlusIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-submenu-sidebar-demo',
  imports: [
    ScCollapsible,
    ScCollapsibleBody,
    ScCollapsibleContent,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScSidebar,
    ScSidebarContent,
    ScSidebarFooter,
    ScSidebarGroup,
    ScSidebarGroupAction,
    ScSidebarGroupContent,
    ScSidebarGroupLabel,
    ScSidebarHeader,
    ScSidebarInset,
    ScSidebarMenu,
    ScSidebarMenuBadge,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarMenuSub,
    ScSidebarMenuSubButton,
    ScSidebarMenuSubItem,
    ScSidebarProvider,
    ScSidebarRail,
    ScSidebarTrigger,
    SiBookOpenIcon,
    SiCalendarIcon,
    SiChevronRightIcon,
    SiGalleryVerticalEndIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiPlusIcon,
    SiSettingsIcon,
  ],
  template: `
    <div scSidebarProvider [storageKey]="null">
      <div scSidebar aria-label="Navigation">
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
        <nav scSidebarContent aria-label="Main, sub-menus">
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Application</div>
            <button scSidebarGroupAction>
              <svg siPlusIcon></svg>
              <span class="sr-only">Add a project</span>
            </button>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                @for (item of items; track item.id) {
                  <li scSidebarMenuItem>
                    <a
                      scSidebarMenuButton
                      href="#"
                      [active]="active() === item.id"
                      (click)="go($event, item.id)"
                    >
                      @switch (item.id) {
                        @case ('home') {
                          <svg siHouseIcon></svg>
                        }
                        @case ('inbox') {
                          <svg siInboxIcon></svg>
                        }
                        @case ('calendar') {
                          <svg siCalendarIcon></svg>
                        }
                        @case ('settings') {
                          <svg siSettingsIcon></svg>
                        }
                      }
                      <span>{{ item.label }}</span>
                    </a>
                    @if (item.badge) {
                      <div scSidebarMenuBadge>{{ item.badge }}</div>
                    }
                  </li>
                }
              </ul>
            </div>
          </div>
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Documentation</div>
            <ul scSidebarMenu>
              @for (section of sections; track section.title) {
                <li scSidebarMenuItem scCollapsible>
                  <button
                    scSidebarMenuButton
                    scCollapsibleTrigger
                    [panel]="pages.panel"
                    [expanded]="$first"
                    class="[&[aria-expanded=true]>svg:last-child]:rotate-90"
                  >
                    <svg siBookOpenIcon></svg>
                    <span>{{ section.title }}</span>
                    <svg
                      siChevronRightIcon
                      class="ms-auto transition-transform rtl:-scale-x-100"
                    ></svg>
                  </button>
                  <div scCollapsiblePanel #pages="scCollapsiblePanel">
                    <ng-template scCollapsibleContent>
                      <div scCollapsibleBody>
                        <ul scSidebarMenuSub>
                          @for (page of section.pages; track page) {
                            <li scSidebarMenuSubItem>
                              <a
                                scSidebarMenuSubButton
                                href="#"
                                [active]="active() === page"
                                (click)="go($event, page)"
                              >
                                <span>{{ page }}</span>
                              </a>
                            </li>
                          }
                        </ul>
                      </div>
                    </ng-template>
                  </div>
                </li>
              }
            </ul>
          </div>
        </nav>
        <div scSidebarFooter>
          <p
            class="text-sidebar-foreground/70 truncate px-2 text-xs group-data-[collapsible=icon]:hidden"
          >
            Signed in as Ada
          </p>
        </div>
        <button scSidebarRail></button>
      </div>
      <main scSidebarInset aria-label="Sub-menus example">
        <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <button scSidebarTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">Sidebar</span>
          </button>
          <p class="text-sm font-medium">{{ label() }}</p>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid gap-4 md:grid-cols-3">
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
          </div>
          <div class="bg-muted/50 min-h-64 flex-1 rounded-xl"></div>
        </div>
      </main>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class SubmenuSidebarDemo {
  readonly items = [
    { id: 'home', label: 'Home', badge: '' },
    { id: 'inbox', label: 'Inbox', badge: '12' },
    { id: 'calendar', label: 'Calendar', badge: '' },
    { id: 'settings', label: 'Settings', badge: '' },
  ];
  readonly active = signal('home');
  readonly label = computed(
    () =>
      this.items.find((item) => item.id === this.active())?.label ??
      this.active(),
  );

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, id: string): void {
    event.preventDefault();
    this.active.set(id);
  }
  readonly sections = [
    { title: 'Getting started', pages: ['Installation', 'Theming', 'Presets'] },
    { title: 'Components', pages: ['Button', 'Dialog', 'Sidebar'] },
  ];
}
