import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ScButton,
  ScNavbar,
  ScNavbarActions,
  ScNavbarBrand,
  ScNavbarGroup,
  ScNavbarMobileLink,
  ScNavbarMobileMenu,
  ScNavbarMobilePortal,
  ScNavbarMobileTrigger,
  ScNavbarProvider,
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuTrigger,
  ScThemeToggle,
} from '@semantic-components/ui-lab';
import {
  SiMenuIcon,
  SiMoonIcon,
  SiSunIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { COMPONENTS } from '../../data/components';
import { Logo } from '../logo/logo';

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
    ScNavbarMobilePortal,
    ScNavbarMobileMenu,
    ScNavbarMobileLink,
    ScNavbarMobileTrigger,
    ScButton,
    ScThemeToggle,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuTrigger,
    SiSunIcon,
    SiMoonIcon,
    SiMenuIcon,
    SiXIcon,
    Logo,
  ],
  template: `
    <div sc-navbar-provider>
      <nav sc-navbar class="sticky top-0 z-50">
        <div sc-navbar-group>
          <!-- Brand -->
          <a sc-navbar-brand href="#">
            <svg app-logo class="size-6"></svg>
            <span>Semantic Components</span>
          </a>

          <!-- Desktop Navigation -->
          <nav sc-navigation-menu class="hidden md:flex">
            <ul sc-navigation-menu-list>
              <li sc-navigation-menu-item>
                <button sc-navigation-menu-trigger>Components</button>
                <div sc-navigation-menu-content>
                  <ul
                    class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  >
                    @for (
                      component of featuredComponents;
                      track component.path
                    ) {
                      <li>
                        <a
                          sc-navigation-menu-link
                          [routerLink]="'/docs/components/' + component.path"
                        >
                          <div class="text-sm font-medium leading-none">
                            {{ component.name }}
                          </div>
                          <p
                            class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                          >
                            {{ component.description }}
                          </p>
                        </a>
                      </li>
                    }
                    <li>
                      <a sc-navigation-menu-link routerLink="/docs/components">
                        <div class="text-sm font-medium leading-none">
                          View All
                        </div>
                        <p
                          class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                        >
                          See all available components.
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li sc-navigation-menu-item>
                <a sc-navigation-menu-link routerLink="/docs/components">
                  Docs
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Actions -->
        <div sc-navbar-actions>
          <button sc-button class="hidden md:inline-flex">Get Started</button>
          <button sc-theme-toggle #themeToggle="scThemeToggle">
            @if (themeToggle.isDark()) {
              <svg si-sun-icon></svg>
            } @else {
              <svg si-moon-icon></svg>
            }
          </button>
          <button sc-navbar-mobile-trigger #trigger="scNavbarMobileTrigger">
            @if (trigger.isMobileMenuOpen()) {
              <svg si-x-icon></svg>
            } @else {
              <svg si-menu-icon></svg>
            }
            <span class="sr-only">
              {{ trigger.isMobileMenuOpen() ? 'Close menu' : 'Open menu' }}
            </span>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div sc-navbar-mobile-portal>
        <div sc-navbar-mobile-menu>
          <a
            sc-navbar-mobile-link
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            #mobileHomeRla="routerLinkActive"
            [active]="mobileHomeRla.isActive"
          >
            Home
          </a>
          <a
            sc-navbar-mobile-link
            routerLink="/docs/components"
            routerLinkActive="active"
            #mobileComponentsRla="routerLinkActive"
            [active]="mobileComponentsRla.isActive"
          >
            Components
          </a>
          <hr class="my-2 border-border" />
          <button sc-button class="w-full mt-2">Get Started</button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Navbar {
  protected readonly featuredComponents = COMPONENTS.slice(0, 5);
}
