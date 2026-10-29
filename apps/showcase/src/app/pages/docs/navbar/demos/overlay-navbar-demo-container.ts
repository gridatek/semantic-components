import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-overlay-navbar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Overlay Menu"
      demoUrl="/demos/navbar/overlay-navbar-demo"
      framed
      [frameWidth]="390"
      [frameHeight]="420"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OverlayNavbarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
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
  selector: 'app-overlay-navbar-demo',
  imports: [
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
  template: \`
    <header scNavbar aria-label="Acme, overlay" #navbar="scNavbar">
      <a scNavbarBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavbarNav aria-label="Main, overlay">
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
      <div scNavbarMenu overlay>
        <nav aria-label="Main, overlay">
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
      </div>
    </header>
    <div class="space-y-4 p-4">
      <h2 class="text-lg font-semibold">{{ current() }}</h2>
      <p class="text-muted-foreground text-sm">
        The menu opens over this text, which stays where it is. A click here, or
        the focus moving here, closes it.
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class OverlayNavbarDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}`;
}
