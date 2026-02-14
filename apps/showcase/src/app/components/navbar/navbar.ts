import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { cn, ScLink } from '@semantic-components/ui';
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
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuTrigger,
  ScThemeToggle,
} from '@semantic-components/ui-lab';
import {
  SiGithubIcon,
  SiMenuIcon,
  SiMoonIcon,
  SiSunIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { VISIBLE_COMPONENTS } from '../../data/components';
import { GithubService } from '../../services/github.service';
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
    ScLink,
    ScThemeToggle,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuTrigger,
    SiGithubIcon,
    SiSunIcon,
    SiMoonIcon,
    SiMenuIcon,
    SiXIcon,
    Logo,
  ],
  template: `
    <div sc-navbar-provider>
      <nav sc-navbar>
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
                <a sc-navigation-menu-link routerLink="/docs/getting-started">
                  Docs
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Actions -->
        <div sc-navbar-actions>
          <a
            sc-link
            variant="ghost"
            href="https://github.com/gridatek/semantic-components"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="hidden md:inline-flex gap-1"
          >
            <svg si-github-icon></svg>
            @if (starCount()) {
              <span class="text-muted-foreground w-fit text-xs tabular-nums">
                {{ starCount() }}
              </span>
            }
          </a>
          <a
            sc-link
            variant="ghost"
            size="icon"
            href="https://github.com/gridatek/semantic-components"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="md:hidden"
          >
            <svg si-github-icon></svg>
          </a>
          <a
            sc-link
            class="hidden md:inline-flex"
            routerLink="/docs/getting-started"
          >
            Get Started
          </a>
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
          <a sc-link class="w-full mt-2" routerLink="/docs/getting-started">
            Get Started
          </a>
        </div>
      </div>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Navbar {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  protected readonly featuredComponents = VISIBLE_COMPONENTS.slice(0, 5);

  private readonly github = inject(GithubService);
  protected readonly starCount = this.github.starCount;
}
