import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-sticky-navbar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Sticky, Hides on Scroll"
      demoUrl="/demos/navbar/sticky-navbar-demo"
      framed
      [frameWidth]="1024"
      [frameHeight]="360"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StickyNavbarDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScNavbar,
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
  selector: 'app-sticky-navbar-demo',
  imports: [
    ScNavbar,
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
  template: \`
    <header
      scNavbar
      aria-label="Acme, sticky"
      #navbar="scNavbar"
      sticky
      hideOnScroll
    >
      <a scNavbarBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu scNavbarNav aria-label="Main, sticky">
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
        <nav aria-label="Main, sticky">
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
    <div class="space-y-4 p-6">
      @for (paragraph of paragraphs; track $index) {
        <p class="text-muted-foreground max-w-prose">
          Scroll down: the bar slides away. Scroll up: it comes back. Paragraph
          {{ $index + 1 }}.
        </p>
      }
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class StickyNavbarDemo {
  private readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  private readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  private go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
  private readonly paragraphs = Array.from({ length: 30 });
}`;
}
