import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScNavbar,
  ScNavbarBrand,
  ScNavbarMenu,
  ScNavbarMenuLink,
  ScNavbarNav,
  ScNavbarToggle,
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuPortal,
  ScNavigationMenuTrigger,
  ScNavigationMenuTriggerIcon,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiGalleryVerticalEndIcon,
  SiMenuIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-navigation-menu-navbar-demo',
  imports: [
    ScNavbar,
    ScNavbarBrand,
    ScNavbarMenu,
    ScNavbarMenuLink,
    ScNavbarNav,
    ScNavbarToggle,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuPortal,
    ScNavigationMenuTrigger,
    ScNavigationMenuTriggerIcon,
    SiChevronDownIcon,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: `
    <header scNavbar aria-label="Acme, with menus" #navbar="scNavbar">
      <a scNavbarBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu scNavbarNav aria-label="Main, with menus">
        <ul scNavigationMenuList>
          <li scNavigationMenuItem>
            <button scNavigationMenuTrigger>
              Products
              <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
            </button>
            <ng-template scNavigationMenuPortal>
              <div scNavigationMenuContent>
                <ul class="grid w-72 gap-1 p-2">
                  @for (product of products; track product) {
                    <li>
                      <a scNavigationMenuLink href="#">{{ product }}</a>
                    </li>
                  }
                </ul>
              </div>
            </ng-template>
          </li>
          @for (link of links.slice(1); track link) {
            <li scNavigationMenuItem>
              <a scNavigationMenuLink href="#">{{ link }}</a>
            </li>
          }
        </ul>
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
        <nav aria-label="Main, with menus">
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
export class NavigationMenuNavbarDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
  readonly products = ['Analytics', 'Automation', 'Reports'];
}
