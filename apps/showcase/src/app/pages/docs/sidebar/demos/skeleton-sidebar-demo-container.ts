import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-skeleton-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Skeleton"
      demoUrl="/demos/sidebar/skeleton-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SkeletonSidebarDemoContainer {
  readonly code = `import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
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
  ScSidebarMenuSkeleton,
  ScSidebarProvider,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import {
  SiChartPieIcon,
  SiFrameIcon,
  SiMapIcon,
  SiPanelLeftIcon,
} from '@semantic-icons/lucide-icons';

/** Rows shown while the menu loads: here for two seconds. */
@Component({
  selector: 'app-skeleton-sidebar-demo',
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
    ScSidebarMenuSkeleton,
    ScSidebarProvider,
    ScSidebarTrigger,
    SiChartPieIcon,
    SiFrameIcon,
    SiMapIcon,
    SiPanelLeftIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null">
      <aside scSidebar aria-label="Sidebar, skeleton">
        <nav scSidebarContent aria-label="Main, skeleton">
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Projects</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu [attr.aria-busy]="loading()">
                @if (loading()) {
                  @for (row of rows; track row) {
                    <li scSidebarMenuItem>
                      <div scSidebarMenuSkeleton showIcon></div>
                    </li>
                  }
                } @else {
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
                }
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <main scSidebarInset aria-label="Skeleton example">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">Sidebar</span>
          </button>
          <button scButton variant="outline" size="sm" (click)="load()">
            Reload
          </button>
        </header>
      </main>
    </div>
  \`,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class SkeletonSidebarDemo {
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
}`;
}
