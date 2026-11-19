import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-rtl-navbar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/navbar/rtl-navbar-demo"
      framed
      [frameWidth]="390"
      [frameHeight]="420"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNavbarDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScNavbar,
  ScNavbarBrand,
  ScNavbarMenu,
  ScNavbarMenuLink,
  ScNavbarNav,
  ScNavbarToggle,
  ScNavigationMenu,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
} from '@semantic-components/ui';
import {
  SiGalleryVerticalEndIcon,
  SiMenuIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-navbar-demo',
  imports: [
    Dir,
    ScNavbar,
    ScNavbarBrand,
    ScNavigationMenu,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavbarMenu,
    ScNavbarMenuLink,
    ScNavbarNav,
    ScNavbarToggle,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <header scNavbar aria-label="أكمي" #navbar="scNavbar">
        <a scNavbarBrand href="#">
          <svg siGalleryVerticalEndIcon></svg>
          أكمي
        </a>
        <nav scNavigationMenu scNavbarNav aria-label="الرئيسية">
          <ul scNavigationMenuList>
            @for (link of links; track link) {
              <li scNavigationMenuItem>
                <a
                  scNavigationMenuLink
                  href="#"
                  [active]="link === current()"
                  (click)="go($event, link)"
                >
                  {{ link }}
                </a>
              </li>
            }
          </ul>
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
        <ng-template scNavbarMenu>
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
        </ng-template>
      </header>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  encapsulation: ViewEncapsulation.None,
})
export class RtlNavbarDemo {
  private readonly links = ['المنتجات', 'الأسعار', 'التوثيق', 'المدونة'];
  private readonly current = signal('المنتجات');

  /** A demo: the link marks its page, and stays here. */
  private go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}`;
}
