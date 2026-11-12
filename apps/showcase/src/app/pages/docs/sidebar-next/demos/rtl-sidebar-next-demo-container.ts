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
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
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
  ScSidebarNextRail,
  ScSidebarNextTrigger,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiPanelLeftIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: at the start — the right; it collapses there. */
@Component({
  selector: 'app-rtl-sidebar-next-demo',
  imports: [
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
    ScSidebarNextRail,
    ScSidebarNextTrigger,
    SiCalendarIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiSettingsIcon,
  ],
  template: \`
    <div scSidebarNextProvider [storageKey]="null" dir="rtl" lang="ar">
      <aside scSidebarNext aria-label="الشريط الجانبي">
        <nav scSidebarNextContent aria-label="Main, rtl">
          <div scSidebarNextGroup>
            <div scSidebarNextGroupLabel>التطبيق</div>
            <div scSidebarNextGroupContent>
              <ul scSidebarNextMenu>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siHouseIcon></svg>
                    <span>الرئيسية</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siInboxIcon></svg>
                    <span>البريد الوارد</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siCalendarIcon></svg>
                    <span>التقويم</span>
                  </a>
                </li>
                <li scSidebarNextMenuItem>
                  <a
                    scSidebarNextMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siSettingsIcon></svg>
                    <span>الإعدادات</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <button scSidebarNextRail></button>
      </aside>
      <main scSidebarNextInset aria-label="مثال من اليمين إلى اليسار">
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
export class RtlSidebarNextDemo {}`;
}
