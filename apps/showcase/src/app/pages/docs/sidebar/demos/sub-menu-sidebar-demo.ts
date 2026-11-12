import { Component, ViewEncapsulation } from '@angular/core';
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
  ScSidebarMenuSub,
  ScSidebarMenuSubButton,
  ScSidebarMenuSubItem,
  ScSidebarProvider,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import { SiPanelLeftIcon } from '@semantic-icons/lucide-icons';

/** A list under an item: its sub-items, each a link. */
@Component({
  selector: 'app-sub-menu-sidebar-demo',
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
    ScSidebarMenuSub,
    ScSidebarMenuSubButton,
    ScSidebarMenuSubItem,
    ScSidebarProvider,
    ScSidebarTrigger,
    SiPanelLeftIcon,
  ],
  template: `
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, sub-menu">
        <nav scSidebarContent aria-label="Main, sub-menu">
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Documentation</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                @for (section of sections; track section.title) {
                  <li scSidebarMenuItem>
                    <a
                      scSidebarMenuButton
                      href="#"
                      (click)="$event.preventDefault()"
                    >
                      <span>{{ section.title }}</span>
                    </a>
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
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarInset aria-label="Sub-menu example">
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
export class SubMenuSidebarDemo {
  protected readonly sections = [
    { title: 'Getting Started', pages: ['Installation', 'Project Structure'] },
    {
      title: 'Building Your Application',
      pages: ['Routing', 'Data Fetching', 'Rendering'],
    },
  ];
}
