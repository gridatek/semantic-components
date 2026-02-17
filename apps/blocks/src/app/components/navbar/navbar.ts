import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { cn, ScButton } from '@semantic-components/ui';
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
            <span>Brand</span>
          </a>

          <nav scNavigationMenu class="hidden md:flex">
            <ul scNavigationMenuList>
              <li scNavigationMenuItem>
                <button scNavigationMenuTrigger>Features</button>
                <div scNavigationMenuContent>
                  <ul
                    class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2"
                  >
                    <li>
                      <a scNavigationMenuLink href="#">
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
                      <a scNavigationMenuLink href="#">
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
                      <a scNavigationMenuLink href="#">
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
                      <a scNavigationMenuLink href="#">
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

              <li scNavigationMenuItem>
                <a scNavigationMenuLink routerLink="/">Pricing</a>
              </li>

              <li scNavigationMenuItem>
                <a scNavigationMenuLink href="#">About</a>
              </li>

              <li scNavigationMenuItem>
                <a scNavigationMenuLink routerLink="/dashboard">Dashboard</a>
              </li>
            </ul>
          </nav>
        </div>

        <div scNavbarActions>
          <button scButton variant="ghost" class="hidden md:inline-flex">
            Sign In
          </button>
          <button scButton class="hidden md:inline-flex">Get Started</button>
          <button scNavbarMobileTrigger #trigger="scNavbarMobileTrigger">
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
          <a scNavbarMobileLink href="#" [active]="false">Features</a>
          <a scNavbarMobileLink href="#" [active]="false">Pricing</a>
          <a scNavbarMobileLink href="#" [active]="false">About</a>
          <a
            scNavbarMobileLink
            routerLink="/dashboard"
            routerLinkActive="active"
            #mobileDashboardRla="routerLinkActive"
            [active]="mobileDashboardRla.isActive"
          >
            Dashboard
          </a>
          <hr class="my-2 border-border" />
          <button scButton variant="ghost" class="w-full">Sign In</button>
          <button scButton class="w-full">Get Started</button>
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
