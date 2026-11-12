import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-controlled-sidebar-next-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Controlled"
      demoUrl="/demos/sidebar-next/controlled-sidebar-next-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledSidebarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
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
} from '@semantic-components/ui';
import {
  SiChartPieIcon,
  SiFrameIcon,
  SiMapIcon,
  SiPanelLeftCloseIcon,
  SiPanelLeftOpenIcon,
} from '@semantic-icons/lucide-icons';

/** Its open state is yours: [(open)] on the provider, here with a button of your own. */
@Component({
  selector: 'app-controlled-sidebar-next-demo',
  imports: [
    ScButton,
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
    SiChartPieIcon,
    SiFrameIcon,
    SiMapIcon,
    SiPanelLeftCloseIcon,
    SiPanelLeftOpenIcon,
  ],
  template: \`
    <div scSidebarNextProvider [storageKey]="null" [(open)]="open">
      <aside scSidebarNext aria-label="Sidebar, controlled">
        <nav scSidebarNextContent aria-label="Main, controlled">
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
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarNextInset aria-label="Controlled example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button
            scButton
            variant="ghost"
            size="sm"
            (click)="open.set(!open())"
          >
            @if (open()) {
              <svg siPanelLeftCloseIcon></svg>
              Close Sidebar
            } @else {
              <svg siPanelLeftOpenIcon></svg>
              Open Sidebar
            }
          </button>
        </header>
      </main>
    </div>
  \`,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledSidebarNextDemo {
  protected readonly open = signal(true);
}`;
}
