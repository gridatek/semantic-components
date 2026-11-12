import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSidebarNext,
  ScSidebarNextContent,
  ScSidebarNextGroup,
  ScSidebarNextGroupAction,
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
  SiChartPieIcon,
  SiFrameIcon,
  SiMapIcon,
  SiPanelLeftIcon,
  SiPlusIcon,
} from '@semantic-icons/lucide-icons';

/** A button at the end of a group's label: name it (sr-only). */
@Component({
  selector: 'app-group-action-sidebar-next-demo',
  imports: [
    ScSidebarNext,
    ScSidebarNextContent,
    ScSidebarNextGroup,
    ScSidebarNextGroupAction,
    ScSidebarNextGroupContent,
    ScSidebarNextGroupLabel,
    ScSidebarNextInset,
    ScSidebarNextMenu,
    ScSidebarNextMenuButton,
    ScSidebarNextMenuItem,
    ScSidebarNextProvider,
    ScSidebarNextTrigger,
    SiChartPieIcon,
    SiFrameIcon,
    SiMapIcon,
    SiPanelLeftIcon,
    SiPlusIcon,
  ],
  template: `
    <div scSidebarNextProvider [storageKey]="null">
      <aside scSidebarNext aria-label="Sidebar, group action">
        <nav scSidebarNextContent aria-label="Main, group action">
          <div scSidebarNextGroup>
            <div scSidebarNextGroupLabel>Projects</div>
            <button scSidebarNextGroupAction (click)="added.set(added() + 1)">
              <svg siPlusIcon></svg>
              <span class="sr-only">Add Project</span>
            </button>
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
      <main scSidebarNextInset aria-label="Group action example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarNextTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">Sidebar</span>
          </button>
        </header>
        <p class="text-muted-foreground p-4 text-sm" aria-live="polite">
          Projects added: {{ added() }}
        </p>
      </main>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupActionSidebarNextDemo {
  protected readonly added = signal(0);
}
