import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-basic-navbar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/navbar/basic-navbar-demo"
      framed
      [frameHeight]="360"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicNavbarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScNavigationMenu,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
} from '@semantic-components/ui';
import {
  ScNavbar,
  ScNavbarActions,
  ScNavbarBrand,
  ScNavbarGroup,
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
  selector: 'app-basic-navbar-demo',
  imports: [
    ScButton,
    ScNavigationMenu,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavbar,
    ScNavbarActions,
    ScNavbarBrand,
    ScNavbarGroup,
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
    <div scNavbarProvider>
      <nav scNavbar aria-label="Acme site">
        <div scNavbarGroup>
          <a scNavbarBrand href="#">
            <svg siGalleryVerticalEndIcon class="size-6"></svg>
            <span>Acme</span>
          </a>

          <nav
            scNavigationMenu
            aria-label="Acme sections"
            class="hidden md:flex"
          >
            <ul scNavigationMenuList>
              @for (link of links; track link) {
                <li scNavigationMenuItem>
                  <a scNavigationMenuLink href="#">{{ link }}</a>
                </li>
              }
            </ul>
          </nav>
        </div>

        <div scNavbarActions>
          <button scButton class="hidden md:inline-flex">Get started</button>
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
            <a scNavbarMobileLink href="#">{{ link }}</a>
          }
          <button scButton class="mt-4">Get started</button>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class BasicNavbarDemo {
  readonly links = ['Products', 'Pricing', 'Docs', 'Blog'];
}`;
}
