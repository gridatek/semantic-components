import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-collapsible-group-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Collapsible group"
      demoUrl="/demos/sidebar/collapsible-group-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleGroupSidebarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
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
  SiChevronDownIcon,
  SiLifeBuoyIcon,
  SiPanelLeftIcon,
  SiSendIcon,
} from '@semantic-icons/lucide-icons';

/** A group that opens and closes: its label is the Collapsible's trigger (a button), its content the panel. */
@Component({
  selector: 'app-collapsible-group-sidebar-demo',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
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
    SiChevronDownIcon,
    SiLifeBuoyIcon,
    SiPanelLeftIcon,
    SiSendIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, collapsible group">
        <nav scSidebarContent aria-label="Main, collapsible group">
          <div scSidebarGroup scCollapsible [open]="true">
            <button
              scSidebarGroupLabel
              scCollapsibleTrigger
              class="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm [&[aria-expanded=true]>svg]:rotate-180"
            >
              Help
              <svg siChevronDownIcon class="ms-auto transition-transform"></svg>
            </button>
            <div scCollapsiblePanel>
              <div scSidebarGroupContent>
                <ul scSidebarMenu>
                  <li scSidebarMenuItem>
                    <a
                      scSidebarMenuButton
                      href="#"
                      (click)="$event.preventDefault()"
                    >
                      <svg siLifeBuoyIcon></svg>
                      <span>Support</span>
                    </a>
                  </li>
                  <li scSidebarMenuItem>
                    <a
                      scSidebarMenuButton
                      href="#"
                      (click)="$event.preventDefault()"
                    >
                      <svg siSendIcon></svg>
                      <span>Feedback</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarInset aria-label="Collapsible group example">
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
export class CollapsibleGroupSidebarDemo {}`;
}
