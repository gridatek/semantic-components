import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-menu-badge-sidebar-next-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Menu badge"
      demoUrl="/demos/sidebar-next/menu-badge-sidebar-next-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuBadgeSidebarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSidebarNext,
  ScSidebarNextContent,
  ScSidebarNextGroup,
  ScSidebarNextGroupContent,
  ScSidebarNextGroupLabel,
  ScSidebarNextInset,
  ScSidebarNextMenu,
  ScSidebarNextMenuBadge,
  ScSidebarNextMenuButton,
  ScSidebarNextMenuItem,
  ScSidebarNextProvider,
  ScSidebarNextTrigger,
} from '@semantic-components/ui';
import {
  SiChartPieIcon,
  SiFrameIcon,
  SiMapIcon,
  SiPanelLeftIcon,
} from '@semantic-icons/lucide-icons';

/** A count at the end of a menu item. */
@Component({
  selector: 'app-menu-badge-sidebar-next-demo',
  imports: [
    ScSidebarNext,
    ScSidebarNextContent,
    ScSidebarNextGroup,
    ScSidebarNextGroupContent,
    ScSidebarNextGroupLabel,
    ScSidebarNextInset,
    ScSidebarNextMenu,
    ScSidebarNextMenuBadge,
    ScSidebarNextMenuButton,
    ScSidebarNextMenuItem,
    ScSidebarNextProvider,
    ScSidebarNextTrigger,
    SiChartPieIcon,
    SiFrameIcon,
    SiMapIcon,
    SiPanelLeftIcon,
  ],
  template: \`
    <div scSidebarNextProvider [storageKey]="null">
      <aside scSidebarNext aria-label="Sidebar, menu badge">
        <nav scSidebarNextContent aria-label="Main, menu badge">
          <div scSidebarNextGroup>
            <div scSidebarNextGroupLabel>Projects</div>
            <div scSidebarNextGroupContent>
              <ul scSidebarNextMenu>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siFrameIcon></svg>
                    <span>Design Engineering</span>
                  </a>
                  <div scSidebarNextMenuBadge>24</div>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siChartPieIcon></svg>
                    <span>Sales & Marketing</span>
                  </a>
                  <div scSidebarNextMenuBadge>12</div>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siMapIcon></svg>
                    <span>Travel</span>
                  </a>
                  <div scSidebarNextMenuBadge>3</div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarNextInset aria-label="Menu badge example">
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
export class MenuBadgeSidebarNextDemo {}`;
}
