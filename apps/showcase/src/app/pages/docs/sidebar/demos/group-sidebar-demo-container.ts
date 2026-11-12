import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-group-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Group"
      demoUrl="/demos/sidebar/group-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupSidebarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSidebar,
  ScSidebarContent,
  ScSidebarGroup,
  ScSidebarGroupContent,
  ScSidebarGroupLabel,
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarProvider,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChartPieIcon,
  SiFrameIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiMapIcon,
  SiPanelLeftIcon,
  SiSearchIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

/** A group: its label, then its content — here two of them. */
@Component({
  selector: 'app-group-sidebar-demo',
  imports: [
    ScSidebar,
    ScSidebarContent,
    ScSidebarGroup,
    ScSidebarGroupContent,
    ScSidebarGroupLabel,
    ScSidebarInset,
    ScSidebarMenu,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarProvider,
    ScSidebarTrigger,
    SiCalendarIcon,
    SiChartPieIcon,
    SiFrameIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiMapIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    SiSettingsIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, group">
        <nav scSidebarContent aria-label="Main, group">
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
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Projects</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siFrameIcon></svg>
                    <span>Design Engineering</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siChartPieIcon></svg>
                    <span>Sales & Marketing</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siMapIcon></svg>
                    <span>Travel</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarInset aria-label="Group example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">Sidebar</span>
          </button>
        </header>
      </main>
    </div>
  \`,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupSidebarDemo {}`;
}
