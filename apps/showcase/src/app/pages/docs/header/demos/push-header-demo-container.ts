import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-push-header-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Push Menu"
      demoUrl="/demos/header/push-header-demo"
      framed
      [frameWidth]="390"
      [frameHeight]="420"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PushHeaderDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  selector: 'app-push-header-demo',
  imports: [
    RouterLink,
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
    <header
      scHeader
      class="border-b-0"
      mobileMenu="push"
      aria-label="Acme, push"
      #header="scHeader"
    >
      <a
        class="flex items-center gap-2 font-semibold [&>svg]:size-6"
        routerLink="."
      >
        <svg siGalleryVerticalEndIcon></svg>
        Acme
      </a>
      <nav scNavigationMenu aria-label="Main, push">
        <ul scNavigationMenuList>
          @for (link of links; track link) {
            <li scNavigationMenuItem>
              <a
                scNavigationMenuLink
                routerLink="."
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
        <nav aria-label="Main, push">
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
    <div class="space-y-4 p-4">
      <h2 class="text-lg font-semibold">{{ current() }}</h2>
      <p class="text-muted-foreground text-sm">
        The menu pushes this text down, and stays open until you close it with
        its toggle, Escape or a link.
      </p>
    </div>
  \`,
  // The page under the bar: gray, the frame's height.
  host: { class: 'bg-muted block min-h-dvh' },
  encapsulation: ViewEncapsulation.None,
})
export class PushHeaderDemo {
  private readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  private readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  private go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}`;
}
