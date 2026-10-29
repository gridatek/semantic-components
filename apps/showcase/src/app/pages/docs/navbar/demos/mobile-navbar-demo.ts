import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScLink,
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
  selector: 'app-mobile-navbar-demo',
  imports: [
    ScLink,
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
    <header
      scNavbar
      aria-label="Acme, mobile"
      #navbar="scNavbar"
      [(open)]="open"
    >
      <a scNavbarBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavbarNav aria-label="Main, mobile">
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
          <span class="sr-only">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only">Open menu</span>
        }
      </button>
      <div scNavbarMenu>
        <nav aria-label="Main, mobile">
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
        <a scLink class="mt-3">Get started</a>
      </div>
    </header>
    <p class="text-muted-foreground p-4 text-sm">
      Menu {{ open() ? 'open' : 'closed' }}
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MobileNavbarDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
  /** Two-way bound to the navbar's open state. */
  readonly open = signal(false);
}
