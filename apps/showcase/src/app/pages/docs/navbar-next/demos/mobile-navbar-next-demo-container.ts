import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-mobile-navbar-next-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Mobile Menu"
      demoUrl="/demos/navbar-next/mobile-navbar-next-demo"
      framed
      [frameWidth]="390"
      [frameHeight]="420"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MobileNavbarNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScLink,
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
  selector: 'app-mobile-navbar-next-demo',
  imports: [
    ScLink,
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
    <header
      scNavbarNext
      aria-label="Acme, mobile"
      #navbar="scNavbarNext"
      [(open)]="open"
    >
      <a scNavbarNextBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavbarNextNav aria-label="Main, mobile">
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
        <nav aria-label="Main, mobile">
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
        <a scLink class="mt-3">Get started</a>
      </div>
    </header>
    <p class="text-muted-foreground p-4 text-sm">
      Menu {{ open() ? 'open' : 'closed' }}
    </p>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class MobileNavbarNextDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
  /** Two-way bound to the navbar's open state. */
  readonly open = signal(false);
}`;
}
