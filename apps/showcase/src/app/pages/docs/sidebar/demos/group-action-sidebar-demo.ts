import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSidebar,
  ScSidebarContent,
  ScSidebarGroup,
  ScSidebarGroupAction,
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
  SiChartPieIcon,
  SiFrameIcon,
  SiMapIcon,
  SiPanelLeftIcon,
  SiPlusIcon,
} from '@semantic-icons/lucide-icons';

/** A button at the end of a group's label: name it (sr-only). */
@Component({
  selector: 'app-group-action-sidebar-demo',
  imports: [
    ScSidebar,
    ScSidebarContent,
    ScSidebarGroup,
    ScSidebarGroupAction,
    ScSidebarGroupContent,
    ScSidebarGroupLabel,
    ScSidebarInset,
    ScSidebarMenu,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarProvider,
    ScSidebarTrigger,
    SiChartPieIcon,
    SiFrameIcon,
    SiMapIcon,
    SiPanelLeftIcon,
    SiPlusIcon,
  ],
  template: `
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, group action">
        <nav scSidebarContent aria-label="Main, group action">
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Projects</div>
            <button scSidebarGroupAction (click)="added.set(added() + 1)">
              <svg siPlusIcon></svg>
              <span class="sr-only">Add Project</span>
            </button>
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
      <main scSidebarInset aria-label="Group action example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">Sidebar</span>
          </button>
        </header>
        <p class="text-muted-foreground p-4 text-sm" aria-live="polite">
          Projects added: {{ added() }}
        </p>
      </main>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupActionSidebarDemo {
  protected readonly added = signal(0);
}
