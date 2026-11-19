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
  ScHeader,
  ScHeaderActions,
  ScHeaderBrand,
  ScHeaderMenu,
  ScHeaderMenuLink,
  ScHeaderNav,
  ScHeaderToggle,
  ScInputButton,
  ScKbd,
  ScLink,
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
import { ThemeMenu } from '../theme-menu/theme-menu';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    ScHeader,
    ScHeaderActions,
    ScHeaderBrand,
    ScHeaderMenu,
    ScHeaderMenuLink,
    ScHeaderNav,
    ScHeaderToggle,
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
    <header scHeader #header="scHeader" class="border-b-0">
      <!-- Brand -->
      <a scHeaderBrand routerLink="/">
        <svg app-logo></svg>
        <span class="sr-only">Semantic Components</span>
      </a>

      <!-- Desktop Navigation -->
      <nav scNavigationMenu scHeaderNav aria-label="Main">
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
                  <a scNavigationMenuLink routerLink="/components">
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
              routerLink="/ai-elements"
              routerLinkActive
              #aiElementsRla="routerLinkActive"
              [active]="aiElementsRla.isActive"
            >
              AI Elements
            </a>
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
              routerLink="/customize"
              routerLinkActive
              #customizeRla="routerLinkActive"
              [active]="customizeRla.isActive"
            >
              Customize
            </a>
          </li>
        </ul>
      </nav>

      <!-- Actions -->
      <div scHeaderActions>
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
        <app-theme-menu />
      </div>

      <button scHeaderToggle>
        @if (header.open()) {
          <svg siXIcon></svg>
          <span class="sr-only">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only">Open menu</span>
        }
      </button>

      <!-- Mobile Menu -->
      <ng-template scHeaderMenu>
        <nav aria-label="Main">
          <a
            scHeaderMenuLink
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            #mobileHomeRla="routerLinkActive"
            [active]="mobileHomeRla.isActive"
          >
            Home
          </a>
          <a
            scHeaderMenuLink
            routerLink="/components"
            routerLinkActive="active"
            #mobileComponentsRla="routerLinkActive"
            [active]="mobileComponentsRla.isActive"
          >
            Components
          </a>
          <a
            scHeaderMenuLink
            routerLink="/docs/getting-started"
            routerLinkActive="active"
            #mobileDocsRla="routerLinkActive"
            [active]="mobileDocsRla.isActive"
          >
            Documentation
          </a>
          <a
            scHeaderMenuLink
            routerLink="/ai-elements"
            routerLinkActive="active"
            #mobileAiElementsRla="routerLinkActive"
            [active]="mobileAiElementsRla.isActive"
          >
            AI Elements
          </a>
          <a
            scHeaderMenuLink
            routerLink="/charts"
            routerLinkActive="active"
            #mobileChartsRla="routerLinkActive"
            [active]="mobileChartsRla.isActive"
          >
            Charts
          </a>
          <a
            scHeaderMenuLink
            routerLink="/typeset"
            routerLinkActive="active"
            #mobileTypesetRla="routerLinkActive"
            [active]="mobileTypesetRla.isActive"
          >
            Typeset
          </a>
          <a
            scHeaderMenuLink
            routerLink="/customize"
            routerLinkActive="active"
            #mobileCustomizeRla="routerLinkActive"
            [active]="mobileCustomizeRla.isActive"
          >
            Customize
          </a>
        </nav>
      </ng-template>
    </header>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export default class Navbar {
  /** A shortcut as this platform writes it (⌘K, Ctrl+K). */
  private readonly format = injectFormatForDisplay();
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() => cn('block', this.classInput()));

  private readonly componentsService = inject(ComponentsService);
  private readonly featuredComponents = computed(() =>
    this.componentsService.visibleComponents().slice(0, 5),
  );

  private readonly github = inject(GithubService);
  private readonly starCount = this.github.starCount;

  private readonly commandPalette = inject(CommandPaletteService);

  private openCommandPalette(): void {
    this.commandPalette.open.set(true);
  }
}
