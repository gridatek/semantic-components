import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
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
  ScSidebarNextMenuSkeleton,
  ScSidebarNextProvider,
  ScSidebarNextTrigger,
} from '@semantic-components/ui';
import {
  SiChartPieIcon,
  SiFrameIcon,
  SiMapIcon,
  SiPanelLeftIcon,
} from '@semantic-icons/lucide-icons';

/** Rows shown while the menu loads: here for two seconds. */
@Component({
  selector: 'app-skeleton-sidebar-next-demo',
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
    ScSidebarNextMenuSkeleton,
    ScSidebarNextProvider,
    ScSidebarNextTrigger,
    SiChartPieIcon,
    SiFrameIcon,
    SiMapIcon,
    SiPanelLeftIcon,
  ],
  template: `
    <div scSidebarNextProvider [storageKey]="null">
      <aside scSidebarNext aria-label="Sidebar, skeleton">
        <nav scSidebarNextContent aria-label="Main, skeleton">
          <div scSidebarNextGroup>
            <div scSidebarNextGroupLabel>Projects</div>
            <div scSidebarNextGroupContent>
              <ul scSidebarNextMenu [attr.aria-busy]="loading()">
                @if (loading()) {
                  @for (row of rows; track row) {
                    <li scSidebarNextMenuItem>
                      <div scSidebarNextMenuSkeleton showIcon></div>
                    </li>
                  }
                } @else {
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
                }
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarNextInset aria-label="Skeleton example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarNextTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">Sidebar</span>
          </button>
          <button scButton variant="outline" size="sm" (click)="load()">
            Reload
          </button>
        </header>
      </main>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class SkeletonSidebarNextDemo {
  protected readonly loading = signal(true);
  protected readonly rows = [1, 2, 3, 4, 5];
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    this.load();
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected load(): void {
    clearTimeout(this.timer);
    this.loading.set(true);
    this.timer = setTimeout(() => this.loading.set(false), 2000);
  }
}
