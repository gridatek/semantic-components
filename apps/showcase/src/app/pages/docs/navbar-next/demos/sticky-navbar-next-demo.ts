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
  selector: 'app-sticky-navbar-next-demo',
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
    <header
      scNavbarNext
      aria-label="Acme, sticky"
      #navbar="scNavbarNext"
      sticky
      hideOnScroll
    >
      <a scNavbarNextBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavbarNextNav aria-label="Main, sticky">
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
      <div scNavbarNextMenu>
        <nav aria-label="Main, sticky">
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
    <div class="space-y-4 p-6">
      @for (paragraph of paragraphs; track $index) {
        <p class="text-muted-foreground max-w-prose">
          Scroll down: the bar slides away. Scroll up: it comes back. Paragraph
          {{ $index + 1 }}.
        </p>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class StickyNavbarNextDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
  readonly paragraphs = Array.from({ length: 30 });
}
