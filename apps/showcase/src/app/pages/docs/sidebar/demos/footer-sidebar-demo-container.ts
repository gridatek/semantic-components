import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-footer-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Footer"
      demoUrl="/demos/sidebar/footer-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FooterSidebarDemoContainer {
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
  ScSidebarFooter,
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
  SiChevronUpIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiPanelLeftIcon,
  SiSearchIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

/** The footer stays at the bottom: here the account menu, opening upwards. */
@Component({
  selector: 'app-footer-sidebar-demo',
  imports: [
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    ScSidebar,
    ScSidebarContent,
    ScSidebarFooter,
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
    SiChevronUpIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    SiSettingsIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, footer">
        <nav scSidebarContent aria-label="Main, footer">
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
        </nav>
        <div scSidebarFooter>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <div scMenuProvider side="top">
                <button scSidebarMenuButton scMenuTrigger>
                  <span>Username</span>
                  <svg siChevronUpIcon class="ms-auto"></svg>
                </button>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Account">Account</div>
                      <div scMenuItem value="Billing">Billing</div>
                      <div scMenuItem value="Sign out">Sign out</div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <main scSidebarInset aria-label="Footer example">
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
export class FooterSidebarDemo {}`;
}
