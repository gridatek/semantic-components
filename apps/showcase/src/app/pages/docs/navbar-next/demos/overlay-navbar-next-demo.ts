import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  selector: 'app-overlay-navbar-next-demo',
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
  template: `
    <header scNavbarNext aria-label="Acme, overlay" #navbar="scNavbarNext">
      <a scNavbarNextBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavbarNextNav aria-label="Main, overlay">
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
          <span class="sr-only">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only">Open menu</span>
        }
      </button>
      <div scNavbarNextMenu overlay>
        <nav aria-label="Main, overlay">
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
    <div class="space-y-4 p-4">
      <h2 class="text-lg font-semibold">{{ current() }}</h2>
      <p class="text-muted-foreground text-sm">
        The menu opens over this text, which stays where it is. A click here, or
        the focus moving here, closes it.
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class OverlayNavbarNextDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}
