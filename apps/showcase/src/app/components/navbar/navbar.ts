import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ScInputButton,
  ScKbd,
  ScLink,
  ScNavbar,
  ScNavbarActions,
  ScNavbarBrand,
  ScNavbarMenu,
  ScNavbarMenuLink,
  ScNavbarNav,
  ScNavbarToggle,
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuTrigger,
  ScNavigationMenuTriggerIcon,
  ScThemeModeToggle,
  cn,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiGithubIcon,
  SiMenuIcon,
  SiMoonIcon,
  SiSearchIcon,
  SiSunIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { CommandPaletteService } from '../../services/command-palette-service';
import { ComponentsService } from '../../services/components-service';
import { GithubService } from '../../services/github-service';
import { Logo } from '../logo/logo';
import { PresetSheet } from '../preset-sheet/preset-sheet';

@Component({
  selector: 'app-navbar',
  imports: [
    PresetSheet,
    RouterLink,
    RouterLinkActive,
    ScNavbar,
    ScNavbarActions,
    ScNavbarBrand,
    ScNavbarMenu,
    ScNavbarMenuLink,
    ScNavbarNav,
    ScNavbarToggle,
    ScInputButton,
    ScKbd,
    ScLink,
    ScThemeModeToggle,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuTrigger,
    SiGithubIcon,
    SiSearchIcon,
    SiSunIcon,
    SiMoonIcon,
    SiMenuIcon,
    SiXIcon,
    Logo,
    SiChevronDownIcon,
    ScNavigationMenuTriggerIcon,
  ],
  template: `
    <header scNavbar #navbar="scNavbar">
      <!-- Brand -->
      <a scNavbarBrand routerLink="/">
        <svg app-logo class="size-6"></svg>
        <span class="hidden sm:inline">Semantic Components</span>
      </a>

      <!-- Desktop Navigation -->
      <nav scNavigationMenu scNavbarNav aria-label="Main">
        <ul scNavigationMenuList>
          <li scNavigationMenuItem>
            <button scNavigationMenuTrigger>
              Components
              <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
            </button>
            <div scNavigationMenuContent>
              <ul
                class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
              >
                @for (component of featuredComponents(); track component.path) {
                  <li>
                    <a
                      scNavigationMenuLink
                      class="flex-col items-start gap-1"
                      [routerLink]="'/docs/components/' + component.path"
                    >
                      <div class="text-sm leading-none font-medium">
                        {{ component.name }}
                      </div>
                      <p
                        class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                      >
                        {{ component.description }}
                      </p>
                    </a>
                  </li>
                }
                <li>
                  <a
                    scNavigationMenuLink
                    class="flex-col items-start gap-1"
                    routerLink="/docs/components"
                  >
                    <div class="text-sm leading-none font-medium">View All</div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
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

          <li scNavigationMenuItem>
            <a scNavigationMenuLink routerLink="/customize">Customize</a>
          </li>
        </ul>
      </nav>

      <!-- Actions -->
      <div scNavbarActions>
        <button
          scInputButton
          class="hidden w-48 md:flex lg:w-64"
          (click)="openCommandPalette()"
        >
          <svg siSearchIcon></svg>
          <span class="flex-1 text-start">Search...</span>
          <kbd scKbd>&#8984;K</kbd>
        </button>
        <a
          scLink
          variant="ghost"
          href="https://github.com/gridatek/semantic-components"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden gap-1 md:inline-flex"
        >
          <svg siGithubIcon></svg>
          <span class="sr-only">GitHub</span>
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
          class="md:hidden"
        >
          <svg siGithubIcon></svg>
          <span class="sr-only">GitHub</span>
        </a>
        <a
          scLink
          class="hidden md:inline-flex"
          routerLink="/docs/getting-started"
        >
          Get Started
        </a>
        <app-preset-sheet />
        <button scThemeModeToggle #themeToggle="scThemeModeToggle">
          @if (themeToggle.isDark()) {
            <svg siSunIcon></svg>
            <span class="sr-only">Switch to light theme</span>
          } @else {
            <svg siMoonIcon></svg>
            <span class="sr-only">Switch to dark theme</span>
          }
        </button>
      </div>

      <button scNavbarToggle>
        @if (navbar.open()) {
          <svg siXIcon></svg>
          <span class="sr-only">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only">Open menu</span>
        }
      </button>

      <!-- Mobile Menu -->
      <div scNavbarMenu>
        <nav aria-label="Main">
          <a
            scNavbarMenuLink
            routerLink="/docs/components"
            routerLinkActive="active"
            #mobileComponentsRla="routerLinkActive"
            [active]="mobileComponentsRla.isActive"
          >
            Components
          </a>
          <a
            scNavbarMenuLink
            routerLink="/docs/getting-started"
            routerLinkActive="active"
            #mobileDocsRla="routerLinkActive"
            [active]="mobileDocsRla.isActive"
          >
            Documentation
          </a>
          <a
            scNavbarMenuLink
            routerLink="/customize"
            routerLinkActive="active"
            #mobileCustomizeRla="routerLinkActive"
            [active]="mobileCustomizeRla.isActive"
          >
            Customize
          </a>
        </nav>
      </div>
    </header>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
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

  private readonly commandPalette = inject(CommandPaletteService);

  openCommandPalette(): void {
    this.commandPalette.open.set(true);
  }
}
