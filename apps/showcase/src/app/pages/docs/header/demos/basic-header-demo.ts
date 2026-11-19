import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScHeader,
  ScHeaderActions,
  ScHeaderBrand,
  ScHeaderMenu,
  ScHeaderMenuLink,
  ScHeaderNav,
  ScHeaderToggle,
  ScLink,
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
  selector: 'app-basic-header-demo',
  imports: [
    ScLink,
    ScHeader,
    ScHeaderActions,
    ScHeaderBrand,
    ScNavigationMenu,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScHeaderMenu,
    ScHeaderMenuLink,
    ScHeaderNav,
    ScHeaderToggle,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: `
    <header scHeader aria-label="Acme" #header="scHeader">
      <a scHeaderBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu scHeaderNav aria-label="Main">
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
      <div scHeaderActions>
        <a scLink variant="ghost" href="/docs/components/header">Sign in</a>
        <a scLink variant="button" href="/docs/getting-started/introduction"
          >Get started</a
        >
      </div>
      <button scHeaderToggle>
        @if (header.open()) {
          <svg siXIcon></svg>
          <span class="sr-only">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only">Open menu</span>
        }
      </button>
      <ng-template scHeaderMenu>
        <nav aria-label="Main">
          @for (link of links; track link) {
            <a
              scHeaderMenuLink
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
export class BasicHeaderDemo {
  private readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  private readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  private go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}
