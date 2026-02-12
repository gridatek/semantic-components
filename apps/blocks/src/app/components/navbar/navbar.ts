import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ScNavbar,
  ScNavbarProvider,
  ScNavbarBrand,
  ScNavbarGroup,
  ScNavbarActions,
  ScNavbarMobileTrigger,
  ScNavbarMobilePortal,
  ScNavbarMobileMenu,
  ScNavbarMobileLink,
  ScButton,
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuTrigger,
} from '@semantic-components/ui-lab';
import { SiMenuIcon, SiXIcon } from '@semantic-icons/lucide-icons';

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
    ScButton,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuTrigger,
    SiMenuIcon,
    SiXIcon,
  ],
  template: `
    <div sc-navbar-provider>
      <nav sc-navbar class="sticky top-0 z-50">
        <div sc-navbar-group>
          <a sc-navbar-brand routerLink="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
            <span>Brand</span>
          </a>

          <nav sc-navigation-menu class="hidden md:flex">
            <ul sc-navigation-menu-list>
              <li sc-navigation-menu-item>
                <button sc-navigation-menu-trigger>Features</button>
                <div sc-navigation-menu-content>
                  <ul
                    class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2"
                  >
                    <li>
                      <a sc-navigation-menu-link href="#">
                        <div class="text-sm font-medium leading-none">
                          Analytics
                        </div>
                        <p
                          class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                        >
                          Track your data and insights
                        </p>
                      </a>
                    </li>
                    <li>
                      <a sc-navigation-menu-link href="#">
                        <div class="text-sm font-medium leading-none">
                          Reports
                        </div>
                        <p
                          class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                        >
                          Generate detailed reports
                        </p>
                      </a>
                    </li>
                    <li>
                      <a sc-navigation-menu-link href="#">
                        <div class="text-sm font-medium leading-none">
                          Automation
                        </div>
                        <p
                          class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                        >
                          Automate your workflows
                        </p>
                      </a>
                    </li>
                    <li>
                      <a sc-navigation-menu-link href="#">
                        <div class="text-sm font-medium leading-none">
                          Integration
                        </div>
                        <p
                          class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                        >
                          Connect with your tools
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li sc-navigation-menu-item>
                <a sc-navigation-menu-link routerLink="/">Pricing</a>
              </li>

              <li sc-navigation-menu-item>
                <a sc-navigation-menu-link href="#">About</a>
              </li>

              <li sc-navigation-menu-item>
                <a sc-navigation-menu-link routerLink="/dashboard">Dashboard</a>
              </li>
            </ul>
          </nav>
        </div>

        <div sc-navbar-actions>
          <button sc-button variant="ghost" class="hidden md:inline-flex">
            Sign In
          </button>
          <button sc-button class="hidden md:inline-flex">Get Started</button>
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
          <a sc-navbar-mobile-link href="#" [active]="false">Features</a>
          <a sc-navbar-mobile-link href="#" [active]="false">Pricing</a>
          <a sc-navbar-mobile-link href="#" [active]="false">About</a>
          <a
            sc-navbar-mobile-link
            routerLink="/dashboard"
            routerLinkActive="active"
            #mobileDashboardRla="routerLinkActive"
            [active]="mobileDashboardRla.isActive"
          >
            Dashboard
          </a>
          <hr class="my-2 border-border" />
          <button sc-button variant="ghost" class="w-full">Sign In</button>
          <button sc-button class="w-full">Get Started</button>
        </div>
      </div>
    </div>
  `,
  host: {
    'data-slot': 'navbar',
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {}
