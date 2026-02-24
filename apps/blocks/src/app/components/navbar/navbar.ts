import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  cn,
  ScButton,
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuPortal,
  ScNavigationMenuTrigger,
} from '@semantic-components/ui';
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
} from '@semantic-components/ui-lab';
import { SiMenuIcon, SiXIcon } from '@semantic-icons/lucide-icons';
import { LocaleSelect } from '../locale-select/locale-select';

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
    ScNavigationMenuPortal,
    ScNavigationMenuTrigger,
    SiMenuIcon,
    SiXIcon,
    LocaleSelect,
  ],
  template: `
    <div scNavbarProvider>
      <nav scNavbar>
        <div scNavbarGroup>
          <a scNavbarBrand routerLink="/">
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
            <span i18n="@@nav.brand">Brand</span>
          </a>

          <nav scNavigationMenu class="hidden md:flex">
            <ul scNavigationMenuList>
              <li scNavigationMenuItem>
                <button scNavigationMenuTrigger i18n="@@nav.features">
                  Features
                </button>
                <ng-template scNavigationMenuPortal>
                  <div scNavigationMenuContent>
                    <ul
                      class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2"
                    >
                      <li>
                        <a scNavigationMenuLink href="#">
                          <div
                            class="text-sm font-medium leading-none"
                            i18n="@@nav.analytics"
                          >
                            Analytics
                          </div>
                          <p
                            class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                            i18n="@@nav.analytics.desc"
                          >
                            Track your data and insights
                          </p>
                        </a>
                      </li>
                      <li>
                        <a scNavigationMenuLink href="#">
                          <div
                            class="text-sm font-medium leading-none"
                            i18n="@@nav.reports"
                          >
                            Reports
                          </div>
                          <p
                            class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                            i18n="@@nav.reports.desc"
                          >
                            Generate detailed reports
                          </p>
                        </a>
                      </li>
                      <li>
                        <a scNavigationMenuLink href="#">
                          <div
                            class="text-sm font-medium leading-none"
                            i18n="@@nav.automation"
                          >
                            Automation
                          </div>
                          <p
                            class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                            i18n="@@nav.automation.desc"
                          >
                            Automate your workflows
                          </p>
                        </a>
                      </li>
                      <li>
                        <a scNavigationMenuLink href="#">
                          <div
                            class="text-sm font-medium leading-none"
                            i18n="@@nav.integration"
                          >
                            Integration
                          </div>
                          <p
                            class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                            i18n="@@nav.integration.desc"
                          >
                            Connect with your tools
                          </p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </ng-template>
              </li>

              <li scNavigationMenuItem>
                <a scNavigationMenuLink routerLink="/" i18n="@@nav.pricing">
                  Pricing
                </a>
              </li>

              <li scNavigationMenuItem>
                <a scNavigationMenuLink href="#" i18n="@@nav.about">About</a>
              </li>

              <li scNavigationMenuItem>
                <a
                  scNavigationMenuLink
                  routerLink="/dashboard"
                  i18n="@@nav.dashboard"
                >
                  Dashboard
                </a>
              </li>

              <li scNavigationMenuItem>
                <a scNavigationMenuLink routerLink="/locale-test">
                  Locale Test
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div scNavbarActions>
          <app-locale-select class="hidden md:inline-block" />
          <button
            scButton
            variant="ghost"
            class="hidden md:inline-flex"
            i18n="@@nav.signIn"
          >
            Sign In
          </button>
          <button
            scButton
            class="hidden md:inline-flex"
            i18n="@@nav.getStarted"
          >
            Get Started
          </button>
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
            <ng-container i18n="@@nav.home">Home</ng-container>
          </a>
          <a scNavbarMobileLink href="#" [active]="false" i18n="@@nav.features">
            Features
          </a>
          <a scNavbarMobileLink href="#" [active]="false" i18n="@@nav.pricing">
            Pricing
          </a>
          <a scNavbarMobileLink href="#" [active]="false" i18n="@@nav.about">
            About
          </a>
          <a
            scNavbarMobileLink
            routerLink="/dashboard"
            routerLinkActive="active"
            #mobileDashboardRla="routerLinkActive"
            [active]="mobileDashboardRla.isActive"
          >
            <ng-container i18n="@@nav.dashboard">Dashboard</ng-container>
          </a>
          <a
            scNavbarMobileLink
            routerLink="/locale-test"
            routerLinkActive="active"
            #mobileLocaleTestRla="routerLinkActive"
            [active]="mobileLocaleTestRla.isActive"
          >
            Locale Test
          </a>
          <hr class="my-2 border-border" />
          <app-locale-select class="w-full" />
          <button scButton variant="ghost" class="w-full" i18n="@@nav.signIn">
            Sign In
          </button>
          <button scButton class="w-full" i18n="@@nav.getStarted">
            Get Started
          </button>
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
