import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScHeader,
  ScHeaderBrand,
  ScHeaderMenu,
  ScHeaderMenuLink,
  ScHeaderNav,
  ScHeaderToggle,
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
  selector: 'app-rtl-header-demo',
  imports: [
    Dir,
    ScHeader,
    ScHeaderBrand,
    ScNavigationMenu,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScHeaderMenu,
    ScHeaderMenuLink,
    ScHeaderNav,
    ScHeaderToggle,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: `
    <div dir="rtl" lang="ar">
      <header scHeader aria-label="أكمي" #header="scHeader">
        <a scHeaderBrand href="#">
          <svg siGalleryVerticalEndIcon></svg>
          أكمي
        </a>
        <nav scNavigationMenu scHeaderNav aria-label="الرئيسية">
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
        <button scHeaderToggle>
          @if (header.open()) {
            <svg siXIcon></svg>
            <span class="sr-only">إغلاق القائمة</span>
          } @else {
            <svg siMenuIcon></svg>
            <span class="sr-only">فتح القائمة</span>
          }
        </button>
        <ng-template scHeaderMenu>
          <nav aria-label="الرئيسية">
            @for (link of links; track link) {
              <a
                scHeaderMenuLink
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
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  encapsulation: ViewEncapsulation.None,
})
export class RtlHeaderDemo {
  private readonly links = ['المنتجات', 'الأسعار', 'التوثيق', 'المدونة'];
  private readonly current = signal('المنتجات');

  /** A demo: the link marks its page, and stays here. */
  private go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}
