import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-collapsible-group-sidebar-next-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Collapsible group"
      demoUrl="/demos/sidebar-next/collapsible-group-sidebar-next-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleGroupSidebarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScSidebarNext,
  ScSidebarNextContent,
  ScSidebarNextGroup,
  ScSidebarNextGroupContent,
  ScSidebarNextGroupLabel,
  ScSidebarNextInset,
  ScSidebarNextMenu,
  ScSidebarNextMenuButton,
  ScSidebarNextMenuItem,
  ScSidebarNextProvider,
  ScSidebarNextTrigger,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiLifeBuoyIcon,
  SiPanelLeftIcon,
  SiSendIcon,
} from '@semantic-icons/lucide-icons';

/** A group that opens and closes: its label is the Collapsible's trigger (a button), its content the panel. */
@Component({
  selector: 'app-collapsible-group-sidebar-next-demo',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScSidebarNext,
    ScSidebarNextContent,
    ScSidebarNextGroup,
    ScSidebarNextGroupContent,
    ScSidebarNextGroupLabel,
    ScSidebarNextInset,
    ScSidebarNextMenu,
    ScSidebarNextMenuButton,
    ScSidebarNextMenuItem,
    ScSidebarNextProvider,
    ScSidebarNextTrigger,
    SiChevronDownIcon,
    SiLifeBuoyIcon,
    SiPanelLeftIcon,
    SiSendIcon,
  ],
  template: \`
    <div scSidebarNextProvider [storageKey]="null">
      <aside scSidebarNext aria-label="Sidebar, collapsible group">
        <nav scSidebarNextContent aria-label="Main, collapsible group">
          <div scSidebarNextGroup scCollapsible [open]="true">
            <button
              scSidebarNextGroupLabel
              scCollapsibleTrigger
              class="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm [&[aria-expanded=true]>svg]:rotate-180"
            >
              Help
              <svg siChevronDownIcon class="ms-auto transition-transform"></svg>
            </button>
            <div scCollapsiblePanel>
              <div scSidebarNextGroupContent>
                <ul scSidebarNextMenu>
                  <li scSidebarNextMenuItem>
                    <a
                      scSidebarNextMenuButton
                      href="#"
                      (click)="$event.preventDefault()"
                    >
                      <svg siLifeBuoyIcon></svg>
                      <span>Support</span>
                    </a>
                  </li>
                  <li scSidebarNextMenuItem>
                    <a
                      scSidebarNextMenuButton
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
      <main scSidebarNextInset aria-label="Collapsible group example">
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
export class CollapsibleGroupSidebarNextDemo {}`;
}
