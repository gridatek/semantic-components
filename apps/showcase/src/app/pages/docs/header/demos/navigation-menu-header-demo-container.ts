import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-navigation-menu-header-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="With a Navigation Menu"
      demoUrl="/demos/header/navigation-menu-header-demo"
      framed
      [frameWidth]="1024"
      [frameHeight]="360"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NavigationMenuHeaderDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    RouterLink,
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
  template: \`
    <header
      scHeader
      class="border-b-0"
      aria-label="Acme, with menus"
      #header="scHeader"
    >
      <a
        class="flex items-center gap-2 font-semibold [&>svg]:size-6"
        routerLink="."
      >
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
                    <a scNavigationMenuLink routerLink=".">{{ product }}</a>
                  </li>
                }
              </ul>
            </div>
          </li>
          @for (link of links.slice(1); track link) {
            <li scNavigationMenuItem>
              <a scNavigationMenuLink routerLink=".">{{ link }}</a>
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
              routerLink="."
              [active]="link === current()"
              (click)="go($event, link)"
            >
              {{ link }}
            </a>
          }
        </nav>
      </ng-template>
    </header>
  \`,
  // The page under the bar: gray, the frame's height.
  host: { class: 'bg-muted block min-h-dvh' },
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
}`;
}
