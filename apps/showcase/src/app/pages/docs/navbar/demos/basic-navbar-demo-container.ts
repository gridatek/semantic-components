import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-basic-navbar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/navbar/basic-navbar-demo"
      framed
      [frameWidth]="1024"
      [frameHeight]="300"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicNavbarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScLink,
  ScNavbar,
  ScNavbarActions,
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
  selector: 'app-basic-navbar-demo',
  imports: [
    ScLink,
    ScNavbar,
    ScNavbarActions,
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
    <header scNavbar aria-label="Acme" #navbar="scNavbar">
      <a scNavbarBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavbarNav aria-label="Main">
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
      <div scNavbarActions>
        <a scLink variant="ghost">Sign in</a>
        <a scLink>Get started</a>
      </div>
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
        <nav aria-label="Main">
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
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class BasicNavbarDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}`;
}
