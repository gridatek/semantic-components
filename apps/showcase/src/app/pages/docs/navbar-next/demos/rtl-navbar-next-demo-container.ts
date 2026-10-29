import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-rtl-navbar-next-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/navbar-next/rtl-navbar-next-demo"
      framed
      [frameWidth]="390"
      [frameHeight]="420"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNavbarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScNavbarNext,
  ScNavbarNextBrand,
  ScNavbarNextLink,
  ScNavbarNextMenu,
  ScNavbarNextMenuLink,
  ScNavbarNextNav,
  ScNavbarNextToggle,
} from '@semantic-components/ui';
import {
  SiGalleryVerticalEndIcon,
  SiMenuIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-navbar-next-demo',
  imports: [
    ScNavbarNext,
    ScNavbarNextBrand,
    ScNavbarNextLink,
    ScNavbarNextMenu,
    ScNavbarNextMenuLink,
    ScNavbarNextNav,
    ScNavbarNextToggle,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <header scNavbarNext aria-label="أكمي" #navbar="scNavbarNext">
        <a scNavbarNextBrand href="#">
          <svg siGalleryVerticalEndIcon></svg>
          أكمي
        </a>
        <nav scNavbarNextNav aria-label="الرئيسية">
          @for (link of links; track link) {
            <a
              scNavbarNextLink
              href="#"
              [active]="link === current()"
              (click)="go($event, link)"
            >
              {{ link }}
            </a>
          }
        </nav>
        <button scNavbarNextToggle>
          @if (navbar.open()) {
            <svg siXIcon></svg>
            <span class="sr-only">إغلاق القائمة</span>
          } @else {
            <svg siMenuIcon></svg>
            <span class="sr-only">فتح القائمة</span>
          }
        </button>
        <div scNavbarNextMenu>
          <nav aria-label="الرئيسية">
            @for (link of links; track link) {
              <a
                scNavbarNextMenuLink
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
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class RtlNavbarNextDemo {
  readonly links = ['المنتجات', 'الأسعار', 'التوثيق', 'المدونة'];
  readonly current = signal('المنتجات');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}`;
}
