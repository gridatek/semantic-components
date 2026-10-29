import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-rtl-sidebar-next-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/sidebar-next/rtl-sidebar-next-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSidebarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScSidebarNext,
  ScSidebarNextContent,
  ScSidebarNextFooter,
  ScSidebarNextGroup,
  ScSidebarNextGroupAction,
  ScSidebarNextGroupContent,
  ScSidebarNextGroupLabel,
  ScSidebarNextHeader,
  ScSidebarNextInset,
  ScSidebarNextMenu,
  ScSidebarNextMenuBadge,
  ScSidebarNextMenuButton,
  ScSidebarNextMenuItem,
  ScSidebarNextProvider,
  ScSidebarNextRail,
  ScSidebarNextTrigger,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiGalleryVerticalEndIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiPanelLeftIcon,
  SiPlusIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-sidebar-next-demo',
  imports: [
    ScSidebarNext,
    ScSidebarNextContent,
    ScSidebarNextFooter,
    ScSidebarNextGroup,
    ScSidebarNextGroupAction,
    ScSidebarNextGroupContent,
    ScSidebarNextGroupLabel,
    ScSidebarNextHeader,
    ScSidebarNextInset,
    ScSidebarNextMenu,
    ScSidebarNextMenuBadge,
    ScSidebarNextMenuButton,
    ScSidebarNextMenuItem,
    ScSidebarNextProvider,
    ScSidebarNextRail,
    ScSidebarNextTrigger,
    SiCalendarIcon,
    SiGalleryVerticalEndIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiPlusIcon,
    SiSettingsIcon,
  ],
  template: \`
    <div scSidebarNextProvider [storageKey]="null" dir="rtl" lang="ar">
      <div scSidebarNext aria-label="التنقل" collapsible="icon">
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
                  <span class="truncate font-semibold">شركة أكمي</span>
                  <span class="text-sidebar-foreground/70 truncate text-xs"
                    >المؤسسات</span
                  >
                </span>
              </a>
            </li>
          </ul>
        </div>
        <nav scSidebarNextContent aria-label="الرئيسية">
          <div scSidebarNextGroup>
            <div scSidebarNextGroupLabel>التطبيق</div>
            <button scSidebarNextGroupAction>
              <svg siPlusIcon></svg>
              <span class="sr-only">أضف مشروعًا</span>
            </button>
            <div scSidebarNextGroupContent>
              <ul scSidebarNextMenu>
                @for (item of items; track item.id) {
                  <li scSidebarNextMenuItem>
                    <a
                      scSidebarNextMenuButton
                      href="#"
                      [tooltip]="item.label"
                      [active]="active() === item.id"
                      (click)="go($event, item.id)"
                    >
                      @switch (item.id) {
                        @case ('home') {
                          <svg siHouseIcon></svg>
                        }
                        @case ('inbox') {
                          <svg siInboxIcon></svg>
                        }
                        @case ('calendar') {
                          <svg siCalendarIcon></svg>
                        }
                        @case ('settings') {
                          <svg siSettingsIcon></svg>
                        }
                      }
                      <span>{{ item.label }}</span>
                    </a>
                    @if (item.badge) {
                      <div scSidebarNextMenuBadge>{{ item.badge }}</div>
                    }
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
        <div scSidebarNextFooter>
          <p
            class="text-sidebar-foreground/70 truncate px-2 text-xs group-data-[collapsible=icon]:hidden"
          >
            مسجّلة باسم آدا
          </p>
        </div>
        <button scSidebarNextRail></button>
      </div>
      <main scSidebarNextInset aria-label="مثال">
        <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <button scSidebarNextTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">الشريط الجانبي</span>
          </button>
          <p class="text-sm font-medium">{{ label() }}</p>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid gap-4 md:grid-cols-3">
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
            <div class="bg-muted/50 aspect-video rounded-xl"></div>
          </div>
          <div class="bg-muted/50 min-h-64 flex-1 rounded-xl"></div>
        </div>
      </main>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class RtlSidebarNextDemo {
  readonly items = [
    { id: 'home', label: 'الرئيسية', badge: '' },
    { id: 'inbox', label: 'البريد', badge: '١٢' },
    { id: 'calendar', label: 'التقويم', badge: '' },
    { id: 'settings', label: 'الإعدادات', badge: '' },
  ];
  readonly active = signal('home');
  readonly label = computed(
    () =>
      this.items.find((item) => item.id === this.active())?.label ??
      this.active(),
  );

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, id: string): void {
    event.preventDefault();
    this.active.set(id);
  }
}`;
}
