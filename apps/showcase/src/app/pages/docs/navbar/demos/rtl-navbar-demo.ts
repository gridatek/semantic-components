import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScNavbar,
  ScNavbarBrand,
  ScNavbarLink,
  ScNavbarMenu,
  ScNavbarMenuLink,
  ScNavbarNav,
  ScNavbarToggle,
} from '@semantic-components/ui';
import {
  SiGalleryVerticalEndIcon,
  SiMenuIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-navbar-demo',
  imports: [
    ScNavbar,
    ScNavbarBrand,
    ScNavbarLink,
    ScNavbarMenu,
    ScNavbarMenuLink,
    ScNavbarNav,
    ScNavbarToggle,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: `
    <div dir="rtl" lang="ar">
      <header scNavbar aria-label="أكمي" #navbar="scNavbar">
        <a scNavbarBrand href="#">
          <svg siGalleryVerticalEndIcon></svg>
          أكمي
        </a>
        <nav scNavbarNav aria-label="الرئيسية">
          @for (link of links; track link) {
            <a
              scNavbarLink
              href="#"
              [active]="link === current()"
              (click)="go($event, link)"
            >
              {{ link }}
            </a>
          }
        </nav>
        <button scNavbarToggle>
          @if (navbar.open()) {
            <svg siXIcon></svg>
            <span class="sr-only">إغلاق القائمة</span>
          } @else {
            <svg siMenuIcon></svg>
            <span class="sr-only">فتح القائمة</span>
          }
        </button>
        <div scNavbarMenu>
          <nav aria-label="الرئيسية">
            @for (link of links; track link) {
              <a
                scNavbarMenuLink
                href="#"
                [active]="link === current()"
                (click)="go($event, link)"
              >
                {{ link }}
              </a>
            }
          </nav>
        </div>
      </header>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class RtlNavbarDemo {
  readonly links = ['المنتجات', 'الأسعار', 'التوثيق', 'المدونة'];
  readonly current = signal('المنتجات');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}
