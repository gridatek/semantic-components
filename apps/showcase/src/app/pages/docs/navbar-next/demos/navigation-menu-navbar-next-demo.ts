import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScNavbarNext,
  ScNavbarNextBrand,
  ScNavbarNextMenu,
  ScNavbarNextMenuLink,
  ScNavbarNextNav,
  ScNavbarNextToggle,
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
  selector: 'app-navigation-menu-navbar-next-demo',
  imports: [
    ScNavbarNext,
    ScNavbarNextBrand,
    ScNavbarNextMenu,
    ScNavbarNextMenuLink,
    ScNavbarNextNav,
    ScNavbarNextToggle,
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
    <header scNavbarNext aria-label="Acme, with menus" #navbar="scNavbarNext">
      <a scNavbarNextBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu scNavbarNextNav aria-label="Main, with menus">
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
        <nav aria-label="Main, with menus">
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
export class NavigationMenuNavbarNextDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
  readonly products = ['Analytics', 'Automation', 'Reports'];
}
