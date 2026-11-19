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
  ScButton,
  ScHeader,
  ScHeaderMobileMenu,
  ScHeaderMobileMenuToggle,
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
  ScStorage,
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
import { styleFrom } from '../../styles';
import { Logo } from '../logo/logo';
import { ThemeMenu } from '../theme-menu/theme-menu';

@Component({
  selector: 'app-navbar',
  imports: [
    ScButton,
    RouterLink,
    RouterLinkActive,
    ScHeader,
    ScHeaderMobileMenu,
    ScHeaderMobileMenuToggle,
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
      <a class="flex items-center" routerLink="/">
        <svg app-logo></svg>
        <span class="sr-only">Semantic Components</span>
      </a>

      <!-- Desktop Navigation -->
      <nav scNavigationMenu aria-label="Main">
        <ul scNavigationMenuList>
          <!-- Only where the bar has room for it: the logo leads home too. -->
          <li scNavigationMenuItem [class]="homeItemClass">
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

          <!-- Only where the bar has room for it: Documentation leads there too. -->
          <li scNavigationMenuItem [class]="componentsItemClass">
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

          <li scNavigationMenuItem [class]="tightItemClass">
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

          <li scNavigationMenuItem [class]="tightItemClass">
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
      <div class="ms-auto flex items-center gap-2">
        <!-- Search: the box where the bar has room, else an icon button
             (Ctrl/⌘ K opens it either way). -->
        <button
          scInputButton
          [class]="searchBoxClass"
          (click)="openCommandPalette()"
        >
          <svg siSearchIcon></svg>
          <span class="flex-1 text-start">Search...</span>
          <kbd scKbd>{{ format('Mod+K') }}</kbd>
        </button>
        <button
          scButton
          variant="outline"
          size="icon"
          [class]="searchIconClass"
          (click)="openCommandPalette()"
        >
          <svg siSearchIcon></svg>
          <span class="sr-only">Search</span>
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
        <!-- Only where the bar has room for it: Documentation leads there too. -->
        <a
          scLink
          variant="button"
          [class]="getStartedClass"
          routerLink="/docs/getting-started"
        >
          Get Started
        </a>
        <app-theme-menu />
        <button scHeaderMobileMenuToggle class="-me-2">
          @if (header.mobileMenuOpen()) {
            <svg siXIcon></svg>
            <span class="sr-only">Close menu</span>
          } @else {
            <svg siMenuIcon></svg>
            <span class="sr-only">Open menu</span>
          }
        </button>
      </div>

      <!-- Mobile Menu -->
      <ng-template scHeaderMobileMenu>
        <nav aria-label="Main">
          <a
            scNavigationMenuLink
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            #mobileHomeRla="routerLinkActive"
            [active]="mobileHomeRla.isActive"
          >
            Home
          </a>
          <a
            scNavigationMenuLink
            routerLink="/components"
            routerLinkActive="active"
            #mobileComponentsRla="routerLinkActive"
            [active]="mobileComponentsRla.isActive"
          >
            Components
          </a>
          <a
            scNavigationMenuLink
            routerLink="/docs/getting-started"
            routerLinkActive="active"
            #mobileDocsRla="routerLinkActive"
            [active]="mobileDocsRla.isActive"
          >
            Documentation
          </a>
          <a
            scNavigationMenuLink
            routerLink="/ai-elements"
            routerLinkActive="active"
            #mobileAiElementsRla="routerLinkActive"
            [active]="mobileAiElementsRla.isActive"
          >
            AI Elements
          </a>
          <a
            scNavigationMenuLink
            routerLink="/charts"
            routerLinkActive="active"
            #mobileChartsRla="routerLinkActive"
            [active]="mobileChartsRla.isActive"
          >
            Charts
          </a>
          <a
            scNavigationMenuLink
            routerLink="/typeset"
            routerLinkActive="active"
            #mobileTypesetRla="routerLinkActive"
            [active]="mobileTypesetRla.isActive"
          >
            Typeset
          </a>
          <a
            scNavigationMenuLink
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

  /**
   * Components, in the bar only from the width where it fits beside the
   * actions — measured per style (2026-11-19): vega, maia, luma and sera, with
   * wider buttons and text, need 1440px; the others 1280px. The style is known at
   * start, from its cookie: the server draws the same bar.
   */
  private readonly style = styleFrom(inject(ScStorage));

  private readonly componentsItemClass = [
    'vega',
    'maia',
    'luma',
    'sera',
  ].includes(this.style)
    ? 'max-[90rem]:hidden'
    : 'max-xl:hidden';

  /**
   * Home and Get Started, in the bar only from the width where they fit —
   * the logo leads home, Documentation to getting started (measured
   * 2026-11-19): lyra and mira from 1024px, the others from 1280px.
   */
  private readonly roomy = ['lyra', 'mira'].includes(this.style);
  private readonly homeItemClass = this.roomy
    ? 'max-lg:hidden'
    : 'max-xl:hidden';
  /**
   * AI Elements and Charts: hidden below 1024px in maia, luma and sera, whose
   * wider buttons and text don't fit there (measured 2026-11-19); the mobile
   * menu and Documentation lead to them.
   */
  private readonly tightItemClass = ['maia', 'luma', 'sera'].includes(
    this.style,
  )
    ? 'max-lg:hidden'
    : '';
  /**
   * Search: the box from the width where it fits, else an icon button (from
   * md: below it, the bar has no search) — measured 2026-11-19: the box from
   * 1024px, from 1280px in sera.
   */
  private readonly searchBoxClass =
    this.style === 'sera' ? 'hidden w-64 xl:flex' : 'hidden w-64 lg:flex';
  private readonly searchIconClass =
    this.style === 'sera'
      ? 'hidden md:inline-flex xl:hidden'
      : 'hidden md:inline-flex lg:hidden';

  private readonly getStartedClass = this.roomy
    ? 'hidden lg:inline-flex'
    : 'hidden xl:inline-flex';

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
