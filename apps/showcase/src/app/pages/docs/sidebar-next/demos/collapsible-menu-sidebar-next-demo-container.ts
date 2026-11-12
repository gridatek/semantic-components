import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-collapsible-menu-sidebar-next-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Collapsible menu"
      demoUrl="/demos/sidebar-next/collapsible-menu-sidebar-next-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleMenuSidebarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScSidebarNext,
  ScSidebarNextContent,
  ScSidebarNextGroup,
  ScSidebarNextGroupContent,
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
import {
  SiChevronRightIcon,
  SiPanelLeftIcon,
} from '@semantic-icons/lucide-icons';

/** Sub-menus that open and close: the item is a Collapsible, its button the trigger, its sub-menu in the panel. */
@Component({
  selector: 'app-collapsible-menu-sidebar-next-demo',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScSidebarNext,
    ScSidebarNextContent,
    ScSidebarNextGroup,
    ScSidebarNextGroupContent,
    ScSidebarNextInset,
    ScSidebarNextMenu,
    ScSidebarNextMenuButton,
    ScSidebarNextMenuItem,
    ScSidebarNextMenuSub,
    ScSidebarNextMenuSubButton,
    ScSidebarNextMenuSubItem,
    ScSidebarNextProvider,
    ScSidebarNextTrigger,
    SiChevronRightIcon,
    SiPanelLeftIcon,
  ],
  template: \`
    <div scSidebarNextProvider [storageKey]="null">
      <aside scSidebarNext aria-label="Sidebar, collapsible menu">
        <nav scSidebarNextContent aria-label="Main, collapsible menu">
          <div scSidebarNextGroup>
            <div scSidebarNextGroupContent>
              <ul scSidebarNextMenu>
                @for (section of sections; track section.title) {
                  <li scSidebarNextMenuItem scCollapsible [open]="$first">
                    <button
                      scSidebarNextMenuButton
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
                    </div>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarNextInset aria-label="Collapsible menu example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarNextTrigger>
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
export class CollapsibleMenuSidebarNextDemo {
  protected readonly sections = [
    { title: 'Getting Started', pages: ['Installation', 'Project Structure'] },
    {
      title: 'Building Your Application',
      pages: ['Routing', 'Data Fetching', 'Rendering'],
    },
    { title: 'API Reference', pages: ['Components', 'File Conventions'] },
  ];
}`;
}
