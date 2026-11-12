import { injectFormatForDisplay } from '@tanstack/angular-hotkeys';
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
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiGithubIcon,
  SiMenuIcon,
  SiSearchIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';
import { CommandPaletteService } from '../../services/command-palette-service';
import { ComponentsService } from '../../services/components-service';
import { GithubService } from '../../services/github-service';
import { Logo } from '../logo/logo';
import { PresetSheet } from '../preset-sheet/preset-sheet';
import { ThemeMenu } from '../theme-menu/theme-menu';

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
    ThemeMenu,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuTrigger,
    SiGithubIcon,
    SiSearchIcon,
    SiMenuIcon,
    SiXIcon,
    Logo,
    SiChevronDownIcon,
    ScNavigationMenuTriggerIcon,
  ],
  template: `
    <header scNavbar #navbar="scNavbar" class="border-b-0">
      <!-- Brand -->
      <a scNavbarBrand routerLink="/">
        <svg app-logo class="size-6"></svg>
        <span class="sr-only">Semantic Components</span>
      </a>

      <!-- Desktop Navigation -->
      <nav scNavigationMenu scNavbarNav aria-label="Main">
        <ul scNavigationMenuList>
          <li scNavigationMenuItem>
            <a
              scNavigationMenuLink
              routerLink="/"
              routerLinkActive
              [routerLinkActiveOptions]="{ exact: true }"
              #homeRla="routerLinkActive"
              [active]="homeRla.isActive"
            >
              Home
            </a>
          </li>

          <li scNavigationMenuItem>
            <a
              scNavigationMenuLink
              routerLink="/docs/getting-started"
              routerLinkActive
              #docsRla="routerLinkActive"
              [active]="docsRla.isActive"
            >
              Documentation
            </a>
          </li>

          <li scNavigationMenuItem>
            <button scNavigationMenuTrigger>
              Components
              <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
            </button>
            <div scNavigationMenuContent>
              <ul
                class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
              >
                @for (component of featuredComponents(); track component.path) {
                  <li>
                    <a
                      scNavigationMenuLink
                      [routerLink]="'/docs/components/' + component.path"
                    >
                      <div class="flex flex-col gap-1 text-sm">
                        <div class="leading-none font-medium">
                          {{ component.name }}
                        </div>
                        <div class="text-muted-foreground line-clamp-2">
                          {{ component.description }}
                        </div>
                      </div>
                    </a>
                  </li>
                }
                <li>
                  <a scNavigationMenuLink routerLink="/docs/components">
                    <div class="flex flex-col gap-1 text-sm">
                      <div class="leading-none font-medium">View All</div>
                      <div class="text-muted-foreground line-clamp-2">
                        See all available components.
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li scNavigationMenuItem>
            <a
              scNavigationMenuLink
              routerLink="/charts"
              routerLinkActive
              #chartsRla="routerLinkActive"
              [active]="chartsRla.isActive"
            >
              Charts
            </a>
          </li>

          <li scNavigationMenuItem>
            <a
              scNavigationMenuLink
              routerLink="/typeset"
              routerLinkActive
              #typesetRla="routerLinkActive"
              [active]="typesetRla.isActive"
            >
              Typeset
            </a>
          </li>
          <li scNavigationMenuItem>
            <a
              scNavigationMenuLink
              routerLink="/presets"
              routerLinkActive
              #presetsRla="routerLinkActive"
              [active]="presetsRla.isActive"
            >
              Presets
            </a>
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
          <kbd scKbd>{{ format('Mod+K') }}</kbd>
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
          variant="button"
          class="hidden md:inline-flex"
          routerLink="/docs/getting-started"
        >
          Get Started
        </a>
        <app-preset-sheet />
        <app-theme-menu />
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
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            #mobileHomeRla="routerLinkActive"
            [active]="mobileHomeRla.isActive"
          >
            Home
          </a>
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
            routerLink="/charts"
            routerLinkActive="active"
            #mobileChartsRla="routerLinkActive"
            [active]="mobileChartsRla.isActive"
          >
            Charts
          </a>
          <a
            scNavbarMenuLink
            routerLink="/typeset"
            routerLinkActive="active"
            #mobileTypesetRla="routerLinkActive"
            [active]="mobileTypesetRla.isActive"
          >
            Typeset
          </a>
          <a
            scNavbarMenuLink
            routerLink="/presets"
            routerLinkActive="active"
            #mobilePresetsRla="routerLinkActive"
            [active]="mobilePresetsRla.isActive"
          >
            Presets
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
  /** A shortcut as this platform writes it (⌘K, Ctrl+K). */
  protected readonly format = injectFormatForDisplay();
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
