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
  selector: 'app-sticky-navbar-demo',
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
      <nav scNavbarNav aria-label="Main, sticky">
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
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
  readonly paragraphs = Array.from({ length: 30 });
}`;
}
