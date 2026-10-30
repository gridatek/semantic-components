import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-icon-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Collapse to Icons"
      demoUrl="/demos/sidebar/icon-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconSidebarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
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
  SiPlusIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-icon-sidebar-demo',
  imports: [
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
    ScSidebarProvider,
    ScSidebarRail,
    ScSidebarTrigger,
    SiCalendarIcon,
    SiGalleryVerticalEndIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiPlusIcon,
    SiSettingsIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, icons" collapsible="icon">
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
        <nav scSidebarContent aria-label="Main, icons">
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
                      [tooltip]="item.label"
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
        </nav>
        <div scSidebarFooter>
          <p
            class="text-sidebar-foreground/70 truncate px-2 text-xs group-data-[collapsible=icon]:hidden"
          >
            Signed in as Ada
          </p>
        </div>
        <button scSidebarRail></button>
      </aside>
      <main scSidebarInset aria-label="Icons example">
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
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class IconSidebarDemo {
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
}`;
}
