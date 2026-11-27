import { Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScHeader,
  ScHeaderMobileMenu,
  ScHeaderMobileMenuToggle,
  ScLink,
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
  selector: 'app-mobile-header-demo',
  imports: [
    RouterLink,
    ScLink,
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
  template: `
    <header
      scHeader
      class="border-b-0"
      aria-label="Acme, mobile"
      #header="scHeader"
      [(mobileMenuOpen)]="open"
    >
      <a
        class="flex items-center gap-2 font-semibold [&>svg]:size-6"
        routerLink="."
      >
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu aria-label="Main, mobile">
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
          <span class="sr-only">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only">Open menu</span>
        }
      </button>
      <ng-template scHeaderMobileMenu>
        <nav aria-label="Main, mobile">
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
        <a
          scLink
          variant="button"
          class="mt-3"
          href="/docs/overview/introduction"
          >Get started</a
        >
      </ng-template>
    </header>
    <p class="text-muted-foreground p-4 text-sm">
      Menu {{ open() ? 'open' : 'closed' }}
    </p>
  `,
  // The page under the bar: gray, the frame's height.
  host: { class: 'bg-muted block min-h-dvh' },
  encapsulation: ViewEncapsulation.None,
})
export class MobileHeaderDemo {
  private readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  private readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  private go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
  /** Two-way bound to the header's open state. */
  private readonly open = signal(false);
}
