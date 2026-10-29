import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScLink,
  ScNavbarNext,
  ScNavbarNextActions,
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
  selector: 'app-basic-navbar-next-demo',
  imports: [
    ScLink,
    ScNavbarNext,
    ScNavbarNextActions,
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
  template: `
    <header scNavbarNext aria-label="Acme" #navbar="scNavbarNext">
      <a scNavbarNextBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavbarNextNav aria-label="Main">
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
      <div scNavbarNextActions>
        <a scLink variant="ghost">Sign in</a>
        <a scLink>Get started</a>
      </div>
      <button scNavbarNextToggle>
        @if (navbar.open()) {
          <svg siXIcon></svg>
          <span class="sr-only">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only">Open menu</span>
        }
      </button>
      <div scNavbarNextMenu>
        <nav aria-label="Main">
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
  `,
  encapsulation: ViewEncapsulation.None,
})
export class BasicNavbarNextDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}
