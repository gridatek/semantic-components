import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-basic-header-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/header/basic-header-demo"
      framed
      [frameWidth]="1024"
      [frameHeight]="300"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicHeaderDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScHeader,
  ScHeaderMobileMenu,
  ScHeaderMobileMenuToggle,
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
  template: \`
    <header scHeader aria-label="Acme" #header="scHeader">
      <a class="flex items-center gap-2 font-semibold [&>svg]:size-6" href="#">
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu aria-label="Main">
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
      <div class="ms-auto flex items-center gap-2">
        <a scLink variant="ghost" href="/docs/components/header">Sign in</a>
        <a scLink variant="button" href="/docs/getting-started/introduction"
          >Get started</a
        >
      </div>
      <button scHeaderMobileMenuToggle class="-me-2">
        @if (header.mobileMenuOpen()) {
          <svg siXIcon></svg>
          <span class="sr-only">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only">Open menu</span>
        }
      </button>
      <ng-template scHeaderMobileMenu>
        <nav aria-label="Main">
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
  \`,
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
}`;
}
