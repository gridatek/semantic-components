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
import { ComponentsService } from '../../services/components.service';
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
    <div scNavbarProvider>
      <nav scNavbar>
        <div scNavbarGroup>
          <!-- Brand -->
          <a scNavbarBrand href="#">
            <svg app-logo class="size-6"></svg>
            <span class="hidden sm:inline">Semantic Components</span>
          </a>

          <!-- Desktop Navigation -->
          <nav scNavigationMenu class="hidden md:flex">
            <ul scNavigationMenuList>
              <li scNavigationMenuItem>
                <button scNavigationMenuTrigger>Components</button>
                <div scNavigationMenuContent>
                  <ul
                    class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  >
                    @for (
                      component of featuredComponents();
                      track component.path
                    ) {
                      <li>
                        <a
                          scNavigationMenuLink
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
                      <a scNavigationMenuLink routerLink="/docs/components">
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

              <li scNavigationMenuItem>
                <a scNavigationMenuLink routerLink="/docs/getting-started">
                  Documentation
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Actions -->
        <div scNavbarActions>
          <a
            scLink
            variant="ghost"
            href="https://github.com/gridatek/semantic-components"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="hidden md:inline-flex gap-1"
          >
            <svg siGithubIcon></svg>
            @if (starCount()) {
              <span class="text-muted-foreground w-fit text-xs tabular-nums">
                {{ starCount() }}
              </span>
            }
          </a>
          <a
            scLink
            variant="ghost"
            size="icon"
            href="https://github.com/gridatek/semantic-components"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="md:hidden"
          >
            <svg siGithubIcon></svg>
          </a>
          <a
            scLink
            class="hidden md:inline-flex"
            routerLink="/docs/getting-started"
          >
            Get Started
          </a>
          <button scThemeToggle #themeToggle="scThemeToggle">
            @if (themeToggle.isDark()) {
              <svg siSunIcon></svg>
            } @else {
              <svg siMoonIcon></svg>
            }
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

      <!-- Mobile Menu -->
      <div scNavbarMobilePortal>
        <div scNavbarMobileMenu>
          <a
            scNavbarMobileLink
            routerLink="/docs/components"
            routerLinkActive="active"
            #mobileComponentsRla="routerLinkActive"
            [active]="mobileComponentsRla.isActive"
          >
            Components
          </a>
          <a
            scNavbarMobileLink
            routerLink="/docs/getting-started"
            routerLinkActive="active"
            #mobileDocsRla="routerLinkActive"
            [active]="mobileDocsRla.isActive"
          >
            Documentation
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

  private readonly componentsService = inject(ComponentsService);
  protected readonly featuredComponents = computed(() =>
    this.componentsService.visibleComponents().slice(0, 5),
  );

  private readonly github = inject(GithubService);
  protected readonly starCount = this.github.starCount;
}
