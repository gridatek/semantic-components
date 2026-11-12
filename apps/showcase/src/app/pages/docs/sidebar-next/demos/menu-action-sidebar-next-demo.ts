import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
  ScSidebarNext,
  ScSidebarNextContent,
  ScSidebarNextGroup,
  ScSidebarNextGroupContent,
  ScSidebarNextGroupLabel,
  ScSidebarNextInset,
  ScSidebarNextMenu,
  ScSidebarNextMenuAction,
  ScSidebarNextMenuButton,
  ScSidebarNextMenuItem,
  ScSidebarNextProvider,
  ScSidebarNextTrigger,
} from '@semantic-components/ui';
import {
  SiChartPieIcon,
  SiEllipsisIcon,
  SiFrameIcon,
  SiMapIcon,
  SiPanelLeftIcon,
} from '@semantic-icons/lucide-icons';

/** A button at the end of a menu item, beside its link: here it opens a menu. */
@Component({
  selector: 'app-menu-action-sidebar-next-demo',
  imports: [
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    ScSidebarNext,
    ScSidebarNextContent,
    ScSidebarNextGroup,
    ScSidebarNextGroupContent,
    ScSidebarNextGroupLabel,
    ScSidebarNextInset,
    ScSidebarNextMenu,
    ScSidebarNextMenuAction,
    ScSidebarNextMenuButton,
    ScSidebarNextMenuItem,
    ScSidebarNextProvider,
    ScSidebarNextTrigger,
    SiChartPieIcon,
    SiEllipsisIcon,
    SiFrameIcon,
    SiMapIcon,
    SiPanelLeftIcon,
  ],
  template: `
    <div scSidebarNextProvider [storageKey]="null">
      <aside scSidebarNext aria-label="Sidebar, menu action">
        <nav scSidebarNextContent aria-label="Main, menu action">
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
                  <div scMenuProvider>
                    <button scSidebarNextMenuAction scMenuTrigger>
                      <svg siEllipsisIcon></svg>
                      <span class="sr-only">More, Design Engineering</span>
                    </button>
                    <ng-template scMenuPortal>
                      <div scMenu>
                        <ng-template scMenuContent>
                          <div scMenuItem value="Edit Project">
                            Edit Project
                          </div>
                          <div scMenuItem value="Delete Project">
                            Delete Project
                          </div>
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
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
                  <div scMenuProvider>
                    <button scSidebarNextMenuAction scMenuTrigger>
                      <svg siEllipsisIcon></svg>
                      <span class="sr-only">More, Sales & Marketing</span>
                    </button>
                    <ng-template scMenuPortal>
                      <div scMenu>
                        <ng-template scMenuContent>
                          <div scMenuItem value="Edit Project">
                            Edit Project
                          </div>
                          <div scMenuItem value="Delete Project">
                            Delete Project
                          </div>
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
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
                  <div scMenuProvider>
                    <button scSidebarNextMenuAction scMenuTrigger>
                      <svg siEllipsisIcon></svg>
                      <span class="sr-only">More, Travel</span>
                    </button>
                    <ng-template scMenuPortal>
                      <div scMenu>
                        <ng-template scMenuContent>
                          <div scMenuItem value="Edit Project">
                            Edit Project
                          </div>
                          <div scMenuItem value="Delete Project">
                            Delete Project
                          </div>
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarNextInset aria-label="Menu action example">
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
export class MenuActionSidebarNextDemo {}
