import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScHeader,
  ScHeaderMobileMenu,
  ScHeaderMobileMenuToggle,
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
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
  selector: 'app-navigation-menu-header-demo',
  imports: [
    ScHeader,
    ScHeaderMobileMenu,
    ScHeaderMobileMenuToggle,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuTrigger,
    ScNavigationMenuTriggerIcon,
    SiChevronDownIcon,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: `
    <header scHeader aria-label="Acme, with menus" #header="scHeader">
      <a class="flex items-center gap-2 font-semibold [&>svg]:size-6" href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu aria-label="Main, with menus">
        <ul scNavigationMenuList>
          <li scNavigationMenuItem>
            <button scNavigationMenuTrigger>
              Products
              <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
            </button>
            <div scNavigationMenuContent>
              <ul class="grid w-72 gap-1">
                @for (product of products; track product) {
                  <li>
                    <a scNavigationMenuLink href="#">{{ product }}</a>
                  </li>
                }
              </ul>
            </div>
          </li>
          @for (link of links.slice(1); track link) {
            <li scNavigationMenuItem>
              <a scNavigationMenuLink href="#">{{ link }}</a>
            </li>
          }
        </ul>
      </nav>
      <button scHeaderMobileMenuToggle class="ms-auto -me-2">
        @if (header.mobileMenuOpen()) {
          <svg siXIcon></svg>
          <span class="sr-only">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only">Open menu</span>
        }
      </button>
      <ng-template scHeaderMobileMenu>
        <nav aria-label="Main, with menus">
          @for (link of links; track link) {
            <a
              scNavigationMenuLink
              href="#"
              [active]="link === current()"
              (click)="go($event, link)"
            >
              {{ link }}
            </a>
          }
        </nav>
      </ng-template>
    </header>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class NavigationMenuHeaderDemo {
  private readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  private readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  private go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
  private readonly products = ['Analytics', 'Automation', 'Reports'];
}
