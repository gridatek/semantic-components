import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-floating-sidebar-next-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Floating"
      demoUrl="/demos/sidebar-next/floating-sidebar-next-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FloatingSidebarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSidebarNext,
  ScSidebarNextContent,
  ScSidebarNextGroup,
  ScSidebarNextGroupContent,
  ScSidebarNextGroupLabel,
  ScSidebarNextHeader,
  ScSidebarNextInset,
  ScSidebarNextMenu,
  ScSidebarNextMenuButton,
  ScSidebarNextMenuItem,
  ScSidebarNextProvider,
  ScSidebarNextTrigger,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiGalleryVerticalEndIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiPanelLeftIcon,
  SiSearchIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

/** variant="floating": a panel of its own, clear of the edges. */
@Component({
  selector: 'app-floating-sidebar-next-demo',
  imports: [
    ScSidebarNext,
    ScSidebarNextContent,
    ScSidebarNextGroup,
    ScSidebarNextGroupContent,
    ScSidebarNextGroupLabel,
    ScSidebarNextHeader,
    ScSidebarNextInset,
    ScSidebarNextMenu,
    ScSidebarNextMenuButton,
    ScSidebarNextMenuItem,
    ScSidebarNextProvider,
    ScSidebarNextTrigger,
    SiCalendarIcon,
    SiGalleryVerticalEndIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    SiSettingsIcon,
  ],
  template: \`
    <div scSidebarNextProvider [storageKey]="null">
      <aside scSidebarNext aria-label="Sidebar, floating" variant="floating">
        <div scSidebarNextHeader>
          <ul scSidebarNextMenu>
            <li scSidebarNextMenuItem>
              <a
                scSidebarNextMenuButton
                size="lg"
                href="#"
                (click)="$event.preventDefault()"
              >
                <span
                  class="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <svg siGalleryVerticalEndIcon></svg>
                </span>
                <span class="grid flex-1 text-sm leading-tight">
                  <span class="truncate font-semibold">Acme Inc</span>
                  <span class="text-sidebar-foreground/70 truncate text-xs"
                    >Enterprise</span
                  >
                </span>
              </a>
            </li>
          </ul>
        </div>
        <nav scSidebarNextContent aria-label="Main, floating">
          <div scSidebarNextGroup>
            <div scSidebarNextGroupLabel>Application</div>
            <div scSidebarNextGroupContent>
              <ul scSidebarNextMenu>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siHouseIcon></svg>
                    <span>Home</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siInboxIcon></svg>
                    <span>Inbox</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siCalendarIcon></svg>
                    <span>Calendar</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siSearchIcon></svg>
                    <span>Search</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
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
      </aside>
      <main scSidebarNextInset aria-label="Floating example">
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
export class FloatingSidebarNextDemo {}`;
}
