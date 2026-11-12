import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-inset-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Inset"
      demoUrl="/demos/sidebar/inset-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InsetSidebarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
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
  SiGalleryVerticalEndIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiPanelLeftIcon,
  SiSearchIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

/** variant="inset": the page is a raised card beside it. */
@Component({
  selector: 'app-inset-sidebar-demo',
  imports: [
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
    SiGalleryVerticalEndIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    SiSettingsIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, inset" variant="inset">
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
        <nav scSidebarContent aria-label="Main, inset">
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
      <main scSidebarInset aria-label="Inset example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">Sidebar</span>
          </button>
        </header>
        <div class="p-4">
          <p class="text-muted-foreground text-sm">The page, in a card.</p>
        </div>
      </main>
    </div>
  \`,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class InsetSidebarDemo {}`;
}
