import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-mobile-navbar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Mobile Menu"
      demoUrl="/demos/navbar/mobile-navbar-demo"
      framed
      [frameWidth]="390"
      [frameHeight]="520"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MobileNavbarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScNavbar,
  ScNavbarActions,
  ScNavbarBrand,
  ScNavbarMobileLink,
  ScNavbarMobileMenu,
  ScNavbarMobilePortal,
  ScNavbarMobileTrigger,
  ScNavbarProvider,
} from '@semantic-components/ui-lab';
import {
  SiGalleryVerticalEndIcon,
  SiMenuIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-mobile-navbar-demo',
  imports: [
    ScNavbar,
    ScNavbarActions,
    ScNavbarBrand,
    ScNavbarMobileLink,
    ScNavbarMobileMenu,
    ScNavbarMobilePortal,
    ScNavbarMobileTrigger,
    ScNavbarProvider,
    SiGalleryVerticalEndIcon,
    SiMenuIcon,
    SiXIcon,
  ],
  template: \`
    <div scNavbarProvider [(open)]="menuOpen">
      <nav scNavbar aria-label="Acme mobile site">
        <a scNavbarBrand href="#">
          <svg siGalleryVerticalEndIcon class="size-6"></svg>
          <span>Acme</span>
        </a>

        <div scNavbarActions>
          <button scNavbarMobileTrigger #trigger="scNavbarMobileTrigger">
            @if (trigger.isMobileMenuOpen()) {
              <svg siXIcon></svg>
            } @else {
              <svg siMenuIcon></svg>
            }
            <span class="sr-only">
              {{ trigger.isMobileMenuOpen() ? 'Close menu' : 'Open menu' }}
            </span>
          </button>
        </div>
      </nav>

      <ng-template scNavbarMobilePortal>
        <div scNavbarMobileMenu aria-label="Mobile navigation">
          @for (link of links; track link) {
            <a
              scNavbarMobileLink
              href="#"
              [active]="link === current()"
              (click)="current.set(link)"
            >
              {{ link }}
            </a>
          }
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class MobileNavbarDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
  readonly current = signal('Products');
  /** Two-way bound to the provider's open state. */
  readonly menuOpen = signal(false);
}`;
}
