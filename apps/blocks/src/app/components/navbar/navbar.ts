import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ScLink,
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuPortal,
  ScNavigationMenuTrigger,
  cn,
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
  SiMenuIcon,
  SiMountainIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    ScNavbar,
    ScNavbarProvider,
    ScNavbarBrand,
    ScNavbarGroup,
    ScNavbarActions,
    ScNavbarMobileTrigger,
    ScNavbarMobilePortal,
    ScNavbarMobileMenu,
    ScNavbarMobileLink,
    ScLink,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuPortal,
    ScNavigationMenuTrigger,
    SiMenuIcon,
    SiXIcon,
    SiMountainIcon,
  ],
  template: `
    <div scNavbarProvider>
      <nav scNavbar>
        <div scNavbarGroup>
          <a scNavbarBrand routerLink="/">
            <svg siMountainIcon aria-hidden="true"></svg>
            <span>Brand</span>
          </a>

          <nav scNavigationMenu class="hidden md:flex">
            <ul scNavigationMenuList>
              <li scNavigationMenuItem>
                <button scNavigationMenuTrigger>Pages</button>
                <ng-template scNavigationMenuPortal>
                  <div scNavigationMenuContent>
                    <ul
                      class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2"
                    >
                      <li>
                        <a scNavigationMenuLink routerLink="/dashboard">
                          <div class="text-sm leading-none font-medium">
                            Dashboard
                          </div>
                          <p
                            class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                          >
                            Sidebar layout with navigation
                          </p>
                        </a>
                      </li>
                      <li>
                        <a scNavigationMenuLink routerLink="/settings">
                          <div class="text-sm leading-none font-medium">
                            Settings
                          </div>
                          <p
                            class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                          >
                            Account and profile management
                          </p>
                        </a>
                      </li>
                      <li>
                        <a scNavigationMenuLink routerLink="/gallery">
                          <div class="text-sm leading-none font-medium">
                            Gallery
                          </div>
                          <p
                            class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                          >
                            Component showcase reference
                          </p>
                        </a>
                      </li>
                      <li>
                        <a scNavigationMenuLink routerLink="/data-table">
                          <div class="text-sm leading-none font-medium">
                            Data Table
                          </div>
                          <p
                            class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                          >
                            Advanced table with sorting and filtering
                          </p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </ng-template>
              </li>

              <li scNavigationMenuItem>
                <a scNavigationMenuLink routerLink="/pricing">Pricing</a>
              </li>

              <li scNavigationMenuItem>
                <a scNavigationMenuLink routerLink="/blog">Blog</a>
              </li>

              <li scNavigationMenuItem>
                <a scNavigationMenuLink routerLink="/contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>

        <div scNavbarActions>
          <a
            scLink
            variant="ghost"
            routerLink="/login"
            class="hidden md:inline-flex"
          >
            Sign In
          </a>
          <a scLink routerLink="/signup" class="hidden md:inline-flex">
            Get Started
          </a>
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

      <div scNavbarMobilePortal>
        <div scNavbarMobileMenu>
          <a
            scNavbarMobileLink
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            #mobileHomeRla="routerLinkActive"
            [active]="mobileHomeRla.isActive"
          >
            Home
          </a>
          <a
            scNavbarMobileLink
            routerLink="/pricing"
            routerLinkActive="active"
            #mobilePricingRla="routerLinkActive"
            [active]="mobilePricingRla.isActive"
          >
            Pricing
          </a>
          <a
            scNavbarMobileLink
            routerLink="/blog"
            routerLinkActive="active"
            #mobileBlogRla="routerLinkActive"
            [active]="mobileBlogRla.isActive"
          >
            Blog
          </a>
          <a
            scNavbarMobileLink
            routerLink="/contact"
            routerLinkActive="active"
            #mobileContactRla="routerLinkActive"
            [active]="mobileContactRla.isActive"
          >
            Contact
          </a>
          <hr class="border-border my-2" />
          <a
            scNavbarMobileLink
            routerLink="/dashboard"
            routerLinkActive="active"
            #mobileDashboardRla="routerLinkActive"
            [active]="mobileDashboardRla.isActive"
          >
            Dashboard
          </a>
          <a
            scNavbarMobileLink
            routerLink="/settings"
            routerLinkActive="active"
            #mobileSettingsRla="routerLinkActive"
            [active]="mobileSettingsRla.isActive"
          >
            Settings
          </a>
          <a
            scNavbarMobileLink
            routerLink="/gallery"
            routerLinkActive="active"
            #mobileGalleryRla="routerLinkActive"
            [active]="mobileGalleryRla.isActive"
          >
            Gallery
          </a>
          <a
            scNavbarMobileLink
            routerLink="/data-table"
            routerLinkActive="active"
            #mobileDataTableRla="routerLinkActive"
            [active]="mobileDataTableRla.isActive"
          >
            Data Table
          </a>
          <hr class="border-border my-2" />
          <a scLink variant="ghost" routerLink="/login" class="w-full">
            Sign In
          </a>
          <a scLink routerLink="/signup" class="w-full">Get Started</a>
        </div>
      </div>
    </div>
  `,
  host: {
    'data-slot': 'navbar',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
