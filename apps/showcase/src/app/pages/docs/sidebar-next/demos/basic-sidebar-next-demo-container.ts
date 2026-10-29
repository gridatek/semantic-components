import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-basic-sidebar-next-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/sidebar-next/basic-sidebar-next-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSidebarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScSidebarNext,
  ScSidebarNextContent,
  ScSidebarNextFooter,
  ScSidebarNextGroup,
  ScSidebarNextGroupAction,
  ScSidebarNextGroupContent,
  ScSidebarNextGroupLabel,
  ScSidebarNextHeader,
  ScSidebarNextInset,
  ScSidebarNextMenu,
  ScSidebarNextMenuAction,
  ScSidebarNextMenuBadge,
  ScSidebarNextMenuButton,
  ScSidebarNextMenuItem,
  ScSidebarNextProvider,
  ScSidebarNextRail,
  ScSidebarNextTrigger,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiEllipsisIcon,
  SiGalleryVerticalEndIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiPanelLeftIcon,
  SiPlusIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-sidebar-next-demo',
  imports: [
    ScSidebarNext,
    ScSidebarNextContent,
    ScSidebarNextFooter,
    ScSidebarNextGroup,
    ScSidebarNextGroupAction,
    ScSidebarNextGroupContent,
    ScSidebarNextGroupLabel,
    ScSidebarNextHeader,
    ScSidebarNextInset,
    ScSidebarNextMenu,
    ScSidebarNextMenuAction,
    ScSidebarNextMenuBadge,
    ScSidebarNextMenuButton,
    ScSidebarNextMenuItem,
    ScSidebarNextProvider,
    ScSidebarNextRail,
    ScSidebarNextTrigger,
    SiCalendarIcon,
    SiEllipsisIcon,
    SiGalleryVerticalEndIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiPlusIcon,
    SiSettingsIcon,
  ],
  template: \`
    <div scSidebarNextProvider [storageKey]="null">
      <div scSidebarNext aria-label="Navigation">
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
        <nav scSidebarNextContent aria-label="Main, basic">
          <div scSidebarNextGroup>
            <div scSidebarNextGroupLabel>Application</div>
            <button scSidebarNextGroupAction>
              <svg siPlusIcon></svg>
              <span class="sr-only">Add a project</span>
            </button>
            <div scSidebarNextGroupContent>
              <ul scSidebarNextMenu>
                @for (item of items; track item.id) {
                  <li scSidebarNextMenuItem>
                    <a
                      scSidebarNextMenuButton
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
                      <div scSidebarNextMenuBadge>{{ item.badge }}</div>
                    }
                    @if (item.id === 'calendar') {
                      <button scSidebarNextMenuAction showOnHover>
                        <svg siEllipsisIcon></svg>
                        <span class="sr-only">More</span>
                      </button>
                    }
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
        <div scSidebarNextFooter>
          <p
            class="text-sidebar-foreground/70 truncate px-2 text-xs group-data-[collapsible=icon]:hidden"
          >
            Signed in as Ada
          </p>
        </div>
        <button scSidebarNextRail></button>
      </div>
      <main scSidebarNextInset aria-label="Basic example">
        <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <button scSidebarNextTrigger>
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
export class BasicSidebarNextDemo {
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
