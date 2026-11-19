import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-sticky-header-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Sticky, Hides on Scroll"
      demoUrl="/demos/header/sticky-header-demo"
      framed
      [frameWidth]="1024"
      [frameHeight]="360"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StickyHeaderDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScHeader,
  ScHeaderBrand,
  ScHeaderMenu,
  ScHeaderMenuLink,
  ScHeaderNav,
  ScHeaderToggle,
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
  template: \`
    <header
      scHeader
      aria-label="Acme, sticky"
      #header="scHeader"
      sticky
      hideOnScroll
    >
      <a scHeaderBrand href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu scHeaderNav aria-label="Main, sticky">
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
        <nav aria-label="Main, sticky">
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
export class StickyHeaderDemo {
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
