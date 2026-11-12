import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-controlled-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Controlled"
      demoUrl="/demos/sidebar/controlled-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledSidebarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
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
  selector: 'app-controlled-sidebar-demo',
  imports: [
    ScButton,
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
    SiChartPieIcon,
    SiFrameIcon,
    SiMapIcon,
    SiPanelLeftCloseIcon,
    SiPanelLeftOpenIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null" [(open)]="open">
      <aside scSidebar aria-label="Sidebar, controlled">
        <nav scSidebarContent aria-label="Main, controlled">
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Projects</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siFrameIcon></svg>
                    <span>Design Engineering</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siChartPieIcon></svg>
                    <span>Sales & Marketing</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
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
      <main scSidebarInset aria-label="Controlled example">
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
export class ControlledSidebarDemo {
  protected readonly open = signal(true);
}`;
}
