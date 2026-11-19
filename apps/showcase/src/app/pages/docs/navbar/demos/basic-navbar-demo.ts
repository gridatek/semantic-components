import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScLink,
  ScNavbar,
  ScNavbarActions,
  ScNavbarBrand,
  ScNavbarMenu,
  ScNavbarMenuLink,
  ScNavbarNav,
  ScNavbarToggle,
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
  selector: 'app-basic-navbar-demo',
  imports: [
    ScLink,
    ScNavbar,
    ScNavbarActions,
    ScNavbarBrand,
    ScNavigationMenu,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavbarMenu,
    ScNavbarMenuLink,
    ScNavbarNav,
    ScNavbarToggle,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: `
    <header scNavbar aria-label="Acme" #navbar="scNavbar">
      <a scNavbarBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu scNavbarNav aria-label="Main">
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
      <div scNavbarActions>
        <a scLink variant="ghost" href="/docs/components/navbar">Sign in</a>
        <a scLink variant="button" href="/docs/getting-started/introduction"
          >Get started</a
        >
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
  `,
  encapsulation: ViewEncapsulation.None,
})
export class BasicNavbarDemo {
  private readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  private readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  private go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}
