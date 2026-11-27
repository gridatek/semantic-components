import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-rtl-header-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/header/rtl-header-demo"
      framed
      [frameWidth]="390"
      [frameHeight]="420"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlHeaderDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScHeader,
  ScHeaderMobileMenu,
  ScHeaderMobileMenuToggle,
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
    RouterLink,
    Dir,
    ScHeader,
    ScNavigationMenu,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScHeaderMobileMenu,
    ScHeaderMobileMenuToggle,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <header scHeader class="border-b-0" aria-label="أكمي" #header="scHeader">
        <a
          class="flex items-center gap-2 font-semibold [&>svg]:size-6"
          routerLink="."
        >
          <svg siGalleryVerticalEndIcon></svg>
          أكمي
        </a>
        <nav scNavigationMenu aria-label="الرئيسية">
          <ul scNavigationMenuList>
            @for (link of links; track link) {
              <li scNavigationMenuItem>
                <a
                  scNavigationMenuLink
                  routerLink="."
                  [active]="link === current()"
                  (click)="go($event, link)"
                >
                  {{ link }}
                </a>
              </li>
            }
          </ul>
        </nav>
        <button scHeaderMobileMenuToggle class="ms-auto -me-2">
          @if (header.mobileMenuOpen()) {
            <svg siXIcon></svg>
            <span class="sr-only">إغلاق القائمة</span>
          } @else {
            <svg siMenuIcon></svg>
            <span class="sr-only">فتح القائمة</span>
          }
        </button>
        <ng-template scHeaderMobileMenu>
          <nav aria-label="الرئيسية">
            @for (link of links; track link) {
              <a
                scNavigationMenuLink
                routerLink="."
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
  // The page under the bar: gray, the frame's height.
  host: { class: 'bg-muted block min-h-dvh' },
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
}`;
}
