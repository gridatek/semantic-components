import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScHeader,
  ScHeaderMobileMenu,
  ScHeaderMobileMenuToggle,
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
  selector: 'app-sticky-header-demo',
  imports: [
    ScHeader,
    ScNavigationMenu,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScHeaderMobileMenu,
    ScHeaderMobileMenuToggle,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: `
    <header
      scHeader
      class="border-b-0"
      aria-label="Acme, sticky"
      #header="scHeader"
      sticky
      hideOnScroll
    >
      <a class="flex items-center gap-2 font-semibold [&>svg]:size-6" href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu aria-label="Main, sticky">
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
        <nav aria-label="Main, sticky">
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
    <div class="space-y-4 p-6">
      @for (paragraph of paragraphs; track $index) {
        <p class="text-muted-foreground max-w-prose">
          Scroll down: the bar slides away. Scroll up: it comes back. Paragraph
          {{ $index + 1 }}.
        </p>
      }
    </div>
  `,
  // The page under the bar: gray, the frame's height.
  host: { class: 'bg-muted block min-h-dvh' },
  encapsulation: ViewEncapsulation.None,
})
export class StickyHeaderDemo {
  private readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  private readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  private go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
  private readonly paragraphs = Array.from({ length: 30 });
}
