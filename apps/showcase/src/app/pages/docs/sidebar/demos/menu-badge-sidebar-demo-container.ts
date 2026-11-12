import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-menu-badge-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Menu badge"
      demoUrl="/demos/sidebar/menu-badge-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuBadgeSidebarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSidebar,
  ScSidebarContent,
  ScSidebarGroup,
  ScSidebarGroupContent,
  ScSidebarGroupLabel,
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuBadge,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarProvider,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import {
  SiChartPieIcon,
  SiFrameIcon,
  SiMapIcon,
  SiPanelLeftIcon,
} from '@semantic-icons/lucide-icons';

/** A count at the end of a menu item. */
@Component({
  selector: 'app-menu-badge-sidebar-demo',
  imports: [
    ScSidebar,
    ScSidebarContent,
    ScSidebarGroup,
    ScSidebarGroupContent,
    ScSidebarGroupLabel,
    ScSidebarInset,
    ScSidebarMenu,
    ScSidebarMenuBadge,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarProvider,
    ScSidebarTrigger,
    SiChartPieIcon,
    SiFrameIcon,
    SiMapIcon,
    SiPanelLeftIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, menu badge">
        <nav scSidebarContent aria-label="Main, menu badge">
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
                  <div scSidebarMenuBadge>24</div>
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
                  <div scSidebarMenuBadge>12</div>
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
                  <div scSidebarMenuBadge>3</div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarInset aria-label="Menu badge example">
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
export class MenuBadgeSidebarDemo {}`;
}
