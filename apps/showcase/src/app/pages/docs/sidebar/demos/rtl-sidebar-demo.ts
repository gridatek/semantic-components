import { Component, ViewEncapsulation } from '@angular/core';
import {
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
  ScSidebarRail,
  ScSidebarTrigger,
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
  selector: 'app-rtl-sidebar-demo',
  imports: [
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
    ScSidebarRail,
    ScSidebarTrigger,
    SiCalendarIcon,
    SiHouseIcon,
    SiInboxIcon,
    SiPanelLeftIcon,
    SiSettingsIcon,
  ],
  template: `
    <div scSidebarProvider [storageKey]="null" dir="rtl" lang="ar">
      <aside scSidebar aria-label="الشريط الجانبي">
        <nav scSidebarContent aria-label="Main, rtl">
          <div scSidebarGroup>
            <div scSidebarGroupLabel>التطبيق</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siHouseIcon></svg>
                    <span>الرئيسية</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siInboxIcon></svg>
                    <span>البريد الوارد</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    href="#"
                    (click)="$event.preventDefault()"
                  >
                    <svg siCalendarIcon></svg>
                    <span>التقويم</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
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
        <button scSidebarRail></button>
      </aside>
      <main scSidebarInset aria-label="مثال من اليمين إلى اليسار">
        <header class="flex h-12 shrink-0 items-center gap-2 px-4">
          <button scSidebarTrigger>
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
export class RtlSidebarDemo {}
