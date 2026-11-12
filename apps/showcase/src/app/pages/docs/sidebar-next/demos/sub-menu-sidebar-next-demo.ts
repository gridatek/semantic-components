import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSidebarNext,
  ScSidebarNextContent,
  ScSidebarNextGroup,
  ScSidebarNextGroupContent,
  ScSidebarNextGroupLabel,
  ScSidebarNextInset,
  ScSidebarNextMenu,
  ScSidebarNextMenuButton,
  ScSidebarNextMenuItem,
  ScSidebarNextMenuSub,
  ScSidebarNextMenuSubButton,
  ScSidebarNextMenuSubItem,
  ScSidebarNextProvider,
  ScSidebarNextTrigger,
} from '@semantic-components/ui';
import { SiPanelLeftIcon } from '@semantic-icons/lucide-icons';

/** A list under an item: its sub-items, each a link. */
@Component({
  selector: 'app-sub-menu-sidebar-next-demo',
  imports: [
    ScSidebarNext,
    ScSidebarNextContent,
    ScSidebarNextGroup,
    ScSidebarNextGroupContent,
    ScSidebarNextGroupLabel,
    ScSidebarNextInset,
    ScSidebarNextMenu,
    ScSidebarNextMenuButton,
    ScSidebarNextMenuItem,
    ScSidebarNextMenuSub,
    ScSidebarNextMenuSubButton,
    ScSidebarNextMenuSubItem,
    ScSidebarNextProvider,
    ScSidebarNextTrigger,
    SiPanelLeftIcon,
  ],
  template: `
    <div scSidebarNextProvider [storageKey]="null">
      <aside scSidebarNext aria-label="Sidebar, sub-menu">
        <nav scSidebarNextContent aria-label="Main, sub-menu">
          <div scSidebarNextGroup>
            <div scSidebarNextGroupLabel>Documentation</div>
            <div scSidebarNextGroupContent>
              <ul scSidebarNextMenu>
                @for (section of sections; track section.title) {
                  <li scSidebarNextMenuItem>
                    <a
                      scSidebarNextMenuButton
                      href="#"
                      (click)="$event.preventDefault()"
                    >
                      <span>{{ section.title }}</span>
                    </a>
                    <ul scSidebarNextMenuSub>
                      @for (page of section.pages; track page) {
                        <li scSidebarNextMenuSubItem>
                          <a
                            scSidebarNextMenuSubButton
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
      <main scSidebarNextInset aria-label="Sub-menu example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarNextTrigger>
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
export class SubMenuSidebarNextDemo {
  protected readonly sections = [
    { title: 'Getting Started', pages: ['Installation', 'Project Structure'] },
    {
      title: 'Building Your Application',
      pages: ['Routing', 'Data Fetching', 'Rendering'],
    },
  ];
}
