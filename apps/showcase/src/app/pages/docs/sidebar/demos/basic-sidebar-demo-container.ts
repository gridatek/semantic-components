import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-basic-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/sidebar/basic-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSidebarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSeparator,
  ScSidebar,
  ScSidebarBody,
  ScSidebarFooter,
  ScSidebarGroup,
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
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-sidebar-demo',
  imports: [
    ScSeparator,
    ScSidebar,
    ScSidebarBody,
    ScSidebarFooter,
    ScSidebarGroup,
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
    SiSettingsIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null">
      <div scSidebar closeLabel="Close" aria-label="Acme navigation">
        <div scSidebarHeader>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton size="lg" href="#">
                <span
                  class="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <svg siGalleryVerticalEndIcon></svg>
                </span>
                <span class="grid flex-1 text-sm leading-tight">
                  <span class="truncate font-semibold">Acme Inc</span>
                  <span class="text-sidebar-foreground/70 truncate text-xs">
                    Enterprise
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div scSidebarBody>
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Application</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                @for (item of items; track item.id) {
                  <li scSidebarMenuItem>
                    <button
                      scSidebarMenuButton
                      [isActive]="active() === item.id"
                      (click)="active.set(item.id)"
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
                    </button>
                    @if (item.badge) {
                      <div scSidebarMenuBadge>{{ item.badge }}</div>
                    }
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>

        <div scSidebarFooter>
          <p class="text-sidebar-foreground/70 px-2 text-xs">v1.0.0</p>
        </div>
        <button scSidebarRail aria-label="Toggle Sidebar"></button>
      </div>

      <main scSidebarInset aria-label="Basic example content">
        <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <button scSidebarTrigger aria-label="Toggle sidebar">
            <svg siPanelLeftIcon></svg>
          </button>
          <div
            scSeparator
            orientation="vertical"
            class="me-2 data-[orientation=vertical]:h-4"
          ></div>
          <h2 class="text-sm font-medium">{{ activeLabel() }}</h2>
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
export class BasicSidebarDemo {
  readonly items = [
    { id: 'home', label: 'Home', badge: '' },
    { id: 'inbox', label: 'Inbox', badge: '12' },
    { id: 'calendar', label: 'Calendar', badge: '' },
    { id: 'settings', label: 'Settings', badge: '' },
  ];

  readonly active = signal('home');

  activeLabel(): string {
    return this.items.find((item) => item.id === this.active())?.label ?? '';
  }
}`;
}
