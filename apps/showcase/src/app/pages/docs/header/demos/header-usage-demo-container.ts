import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';

@Component({
  selector: 'app-header-usage-demo-container',
  imports: [UsageCode],
  template: `
    <app-usage-code
      [code]="code"
      demoUrl="/demos/header/header-usage-demo"
      demoTitle="Header"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HeaderUsageDemoContainer {
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
  selector: 'app-header-usage-demo',
  imports: [
    ScHeader,
    ScHeaderMobileMenu,
    ScHeaderMobileMenuToggle,
    ScLink,
    ScNavigationMenu,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: \`
    <header scHeader #header="scHeader">
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
        <a scLink variant="button" href="#">Get started</a>
      </div>

      <button scHeaderMobileMenuToggle class="-me-2">
        @if (header.open()) {
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
    <main class="space-y-2 p-6">
      <h1 class="text-2xl font-semibold">{{ current() }}</h1>
      <p class="text-muted-foreground text-sm">
        Narrow the window: the links move into the menu, behind the toggle.
      </p>
    </main>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderUsageDemo {
  private readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  private readonly current = signal('Products');

  /** A demo: the link marks its page, and stays here. */
  private go(event: Event, link: string): void {
    event.preventDefault();
    this.current.set(link);
  }
}`;
}
