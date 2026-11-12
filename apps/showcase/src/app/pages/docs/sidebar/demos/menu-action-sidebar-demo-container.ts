import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-menu-action-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Menu action"
      demoUrl="/demos/sidebar/menu-action-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuActionSidebarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuAction,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarProvider,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import {
  SiChartPieIcon,
  SiEllipsisIcon,
  SiFrameIcon,
  SiMapIcon,
  SiPanelLeftIcon,
} from '@semantic-icons/lucide-icons';

/** A button at the end of a menu item, beside its link: here it opens a menu. */
@Component({
  selector: 'app-menu-action-sidebar-demo',
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
    ScSidebarInset,
    ScSidebarMenu,
    ScSidebarMenuAction,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarProvider,
    ScSidebarTrigger,
    SiChartPieIcon,
    SiEllipsisIcon,
    SiFrameIcon,
    SiMapIcon,
    SiPanelLeftIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, menu action">
        <nav scSidebarContent aria-label="Main, menu action">
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
                  <div scMenuProvider>
                    <button scSidebarMenuAction scMenuTrigger>
                      <svg siEllipsisIcon></svg>
                      <span class="sr-only">More, Design Engineering</span>
                    </button>
                    <ng-template scMenuPortal>
                      <div scMenu>
                        <ng-template scMenuContent>
                          <div scMenuItem value="Edit Project">
                            Edit Project
                          </div>
                          <div scMenuItem value="Delete Project">
                            Delete Project
                          </div>
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
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
                  <div scMenuProvider>
                    <button scSidebarMenuAction scMenuTrigger>
                      <svg siEllipsisIcon></svg>
                      <span class="sr-only">More, Sales & Marketing</span>
                    </button>
                    <ng-template scMenuPortal>
                      <div scMenu>
                        <ng-template scMenuContent>
                          <div scMenuItem value="Edit Project">
                            Edit Project
                          </div>
                          <div scMenuItem value="Delete Project">
                            Delete Project
                          </div>
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
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
                  <div scMenuProvider>
                    <button scSidebarMenuAction scMenuTrigger>
                      <svg siEllipsisIcon></svg>
                      <span class="sr-only">More, Travel</span>
                    </button>
                    <ng-template scMenuPortal>
                      <div scMenu>
                        <ng-template scMenuContent>
                          <div scMenuItem value="Edit Project">
                            Edit Project
                          </div>
                          <div scMenuItem value="Delete Project">
                            Delete Project
                          </div>
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarInset aria-label="Menu action example">
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
export class MenuActionSidebarDemo {}`;
}
