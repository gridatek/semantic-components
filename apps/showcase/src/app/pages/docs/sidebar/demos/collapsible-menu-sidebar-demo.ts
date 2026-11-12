import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScSidebar,
  ScSidebarContent,
  ScSidebarGroup,
  ScSidebarGroupContent,
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarMenuSub,
  ScSidebarMenuSubButton,
  ScSidebarMenuSubItem,
  ScSidebarProvider,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiPanelLeftIcon,
} from '@semantic-icons/lucide-icons';

/** Sub-menus that open and close: the item is a Collapsible, its button the trigger, its sub-menu in the panel. */
@Component({
  selector: 'app-collapsible-menu-sidebar-demo',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScSidebar,
    ScSidebarContent,
    ScSidebarGroup,
    ScSidebarGroupContent,
    ScSidebarInset,
    ScSidebarMenu,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarMenuSub,
    ScSidebarMenuSubButton,
    ScSidebarMenuSubItem,
    ScSidebarProvider,
    ScSidebarTrigger,
    SiChevronRightIcon,
    SiPanelLeftIcon,
  ],
  template: `
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, collapsible menu">
        <nav scSidebarContent aria-label="Main, collapsible menu">
          <div scSidebarGroup>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                @for (section of sections; track section.title) {
                  <li scSidebarMenuItem scCollapsible [open]="$first">
                    <button
                      scSidebarMenuButton
                      scCollapsibleTrigger
                      class="[&[aria-expanded=true]>svg]:rotate-90"
                    >
                      <span>{{ section.title }}</span>
                      <svg
                        siChevronRightIcon
                        class="ms-auto transition-transform rtl:-scale-x-100"
                      ></svg>
                    </button>
                    <div scCollapsiblePanel>
                      <ul scSidebarMenuSub>
                        @for (page of section.pages; track page) {
                          <li scSidebarMenuSubItem>
                            <a
                              scSidebarMenuSubButton
                              href="#"
                              (click)="$event.preventDefault()"
                            >
                              <span>{{ page }}</span>
                            </a>
                          </li>
                        }
                      </ul>
                    </div>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarInset aria-label="Collapsible menu example">
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
export class CollapsibleMenuSidebarDemo {
  protected readonly sections = [
    { title: 'Getting Started', pages: ['Installation', 'Project Structure'] },
    {
      title: 'Building Your Application',
      pages: ['Routing', 'Data Fetching', 'Rendering'],
    },
    { title: 'API Reference', pages: ['Components', 'File Conventions'] },
  ];
}
