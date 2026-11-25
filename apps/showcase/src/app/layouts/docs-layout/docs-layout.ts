import { injectFormatForDisplay } from '@tanstack/angular-hotkeys';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScBreadcrumbPage,
  ScBreadcrumbSeparator,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScSidebar,
  ScSidebarContent,
  ScSidebarFooter,
  ScSidebarGroup,
  ScSidebarGroupContent,
  ScSidebarGroupLabel,
  ScSidebarHeader,
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarMenuSub,
  ScSidebarMenuSubButton,
  ScSidebarMenuSubItem,
  ScSidebarProvider,
  ScSidebarRail,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import { ScInputButton, ScKbd, ScSeparator } from '@semantic-components/ui';
import {
  SiBookOpenTextIcon,
  SiBoxIcon,
  SiChartColumnIcon,
  SiChevronRightIcon,
  SiCompassIcon,
  SiCookingPotIcon,
  SiPackageIcon,
  SiPanelLeftIcon,
  SiSearchIcon,
  SiSparklesIcon,
  SiWrenchIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';
import { filter, map } from 'rxjs';
import { Logo } from '../../components/logo/logo';
import { PageNav } from '../../components/page-nav/page-nav';
import { ThemeMenu } from '../../components/theme-menu/theme-menu';
import { Toc } from '../../components/toc/toc';
import { TocService } from '../../components/toc/toc-service';
import { docsPath } from '../../data/components';
import {
  aiElementPages,
  guidePages,
  overviewPages,
  packagePages,
} from '../../data/docs-nav';
import { CommandPaletteService } from '../../services/command-palette-service';
import { ComponentsService } from '../../services/components-service';
import { ConfigService } from '../../services/config-service';
import { DocsNavService } from '../../services/docs-nav-service';

/** The sidebar groups with a page listing them: their breadcrumb links to it. */
const GROUP_PAGES: Partial<Record<string, string>> = {
  Components: '/docs/overview/components',
  Charts: '/charts',
  Recipes: '/docs/recipes',
};

@Component({
  selector: 'app-docs-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ScSidebarProvider,
    ScSidebar,
    ScSidebarHeader,
    ScSidebarContent,
    ScSidebarFooter,
    ScSidebarGroup,
    ScSidebarGroupLabel,
    ScSidebarGroupContent,
    ScSidebarMenu,
    ScSidebarMenuItem,
    ScSidebarMenuButton,
    ScSidebarMenuSub,
    ScSidebarMenuSubItem,
    ScSidebarMenuSubButton,
    ScSidebarInset,
    ScSidebarTrigger,
    ScSidebarRail,
    ScInputButton,
    ScKbd,
    ScSeparator,
    ThemeMenu,
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScBreadcrumbPage,
    ScBreadcrumbSeparator,
    SiChevronRightIcon,
    PageNav,
    SiBookOpenTextIcon,
    SiBoxIcon,
    SiChartColumnIcon,
    SiCookingPotIcon,
    SiCompassIcon,
    SiPackageIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    SiSparklesIcon,
    SiWrenchIcon,
    Logo,
    Toc,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
  ],
  template: `
    <div scSidebarProvider class="min-h-svh">
      <!-- Above the page's sticky header (z-10): its edge, the rail's hover
        line, half over the page, isn't covered there. -->
      <aside
        scSidebar
        side="inline-start"
        variant="sidebar"
        collapsible="icon"
        aria-label="Sidebar"
        class="relative z-20"
      >
        <div scSidebarHeader>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton size="lg" routerLink="/">
                <svg app-logo class="size-8!"></svg>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">
                    Semantic Components
                  </span>
                  <span class="text-sidebar-foreground/70 truncate text-xs">
                    Angular components
                  </span>
                </div>
              </a>
            </li>
          </ul>

          <button
            scInputButton
            class="w-full group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
            (click)="openCommandPalette()"
          >
            <svg siSearchIcon></svg>
            <span
              class="flex-1 text-start group-data-[collapsible=icon]:hidden"
            >
              Search...
            </span>
            <kbd scKbd class="group-data-[collapsible=icon]:hidden">
              {{ format('Mod+K') }}
            </kbd>
          </button>
        </div>

        <nav scSidebarContent aria-label="Documentation">
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Documentation</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li
                  scSidebarMenuItem
                  scCollapsible
                  routerLinkActive
                  [routerLinkActiveOptions]="{ exact: true }"
                  #groupOverview="routerLinkActive"
                  [open]="groupOverview.isActive"
                >
                  <button
                    scSidebarMenuButton
                    scCollapsibleTrigger
                    class="[&[aria-expanded=true]>svg:last-child]:rotate-90"
                  >
                    <svg siBookOpenTextIcon></svg>
                    <span>Overview</span>
                    <svg
                      siChevronRightIcon
                      class="ms-auto transition-transform rtl:-scale-x-100"
                    ></svg>
                  </button>
                  <div scCollapsiblePanel hiddenUntilFound>
                    <ul scSidebarMenuSub>
                      @for (page of overviewPages; track page.path) {
                        <li scSidebarMenuSubItem>
                          <a
                            scSidebarMenuSubButton
                            [routerLink]="page.path"
                            [routerLinkActiveOptions]="{ exact: true }"
                            routerLinkActive
                            #pageRla="routerLinkActive"
                            [active]="pageRla.isActive"
                          >
                            <span>{{ page.name }}</span>
                          </a>
                        </li>
                      }
                    </ul>
                  </div>
                </li>
                <li
                  scSidebarMenuItem
                  scCollapsible
                  routerLinkActive
                  [routerLinkActiveOptions]="{ exact: true }"
                  #groupPackages="routerLinkActive"
                  [open]="groupPackages.isActive"
                >
                  <button
                    scSidebarMenuButton
                    scCollapsibleTrigger
                    class="[&[aria-expanded=true]>svg:last-child]:rotate-90"
                  >
                    <svg siPackageIcon></svg>
                    <span>Packages</span>
                    <svg
                      siChevronRightIcon
                      class="ms-auto transition-transform rtl:-scale-x-100"
                    ></svg>
                  </button>
                  <div scCollapsiblePanel hiddenUntilFound>
                    <ul scSidebarMenuSub>
                      @for (page of packagePages; track page.path) {
                        <li scSidebarMenuSubItem>
                          <a
                            scSidebarMenuSubButton
                            [routerLink]="page.path"
                            [routerLinkActiveOptions]="{ exact: true }"
                            routerLinkActive
                            #pageRla="routerLinkActive"
                            [active]="pageRla.isActive"
                          >
                            <span>{{ page.name }}</span>
                          </a>
                        </li>
                      }
                    </ul>
                  </div>
                </li>
                <li
                  scSidebarMenuItem
                  scCollapsible
                  routerLinkActive
                  [routerLinkActiveOptions]="{ exact: true }"
                  #groupGuides="routerLinkActive"
                  [open]="groupGuides.isActive"
                >
                  <button
                    scSidebarMenuButton
                    scCollapsibleTrigger
                    class="[&[aria-expanded=true]>svg:last-child]:rotate-90"
                  >
                    <svg siCompassIcon></svg>
                    <span>Guides</span>
                    <svg
                      siChevronRightIcon
                      class="ms-auto transition-transform rtl:-scale-x-100"
                    ></svg>
                  </button>
                  <div scCollapsiblePanel hiddenUntilFound>
                    <ul scSidebarMenuSub>
                      @for (page of guidePages; track page.path) {
                        <li scSidebarMenuSubItem>
                          <a
                            scSidebarMenuSubButton
                            [routerLink]="page.path"
                            [routerLinkActiveOptions]="{ exact: true }"
                            routerLinkActive
                            #pageRla="routerLinkActive"
                            [active]="pageRla.isActive"
                          >
                            <span>{{ page.name }}</span>
                          </a>
                        </li>
                      }
                    </ul>
                  </div>
                </li>
                <li
                  scSidebarMenuItem
                  scCollapsible
                  routerLinkActive
                  [routerLinkActiveOptions]="{ exact: true }"
                  #groupComponents="routerLinkActive"
                  [open]="groupComponents.isActive"
                >
                  <button
                    scSidebarMenuButton
                    scCollapsibleTrigger
                    class="[&[aria-expanded=true]>svg:last-child]:rotate-90"
                  >
                    <svg siBoxIcon></svg>
                    <span>Components</span>
                    <svg
                      siChevronRightIcon
                      class="ms-auto transition-transform rtl:-scale-x-100"
                    ></svg>
                  </button>
                  <div scCollapsiblePanel hiddenUntilFound>
                    <ul scSidebarMenuSub>
                      @for (item of components(); track item.path) {
                        <li scSidebarMenuSubItem>
                          <a
                            scSidebarMenuSubButton
                            [routerLink]="docsPath(item)"
                            routerLinkActive
                            #rla="routerLinkActive"
                            [active]="rla.isActive"
                          >
                            <span>{{ item.name }}</span>
                          </a>
                        </li>
                      }
                    </ul>
                  </div>
                </li>
                @if (charts().length > 0) {
                  <li
                    scSidebarMenuItem
                    scCollapsible
                    routerLinkActive
                    [routerLinkActiveOptions]="{ exact: true }"
                    #groupCharts="routerLinkActive"
                    [open]="groupCharts.isActive"
                  >
                    <button
                      scSidebarMenuButton
                      scCollapsibleTrigger
                      class="[&[aria-expanded=true]>svg:last-child]:rotate-90"
                    >
                      <svg siChartColumnIcon></svg>
                      <span>Charts</span>
                      <svg
                        siChevronRightIcon
                        class="ms-auto transition-transform rtl:-scale-x-100"
                      ></svg>
                    </button>
                    <div scCollapsiblePanel hiddenUntilFound>
                      <ul scSidebarMenuSub>
                        @for (item of charts(); track item.path) {
                          <li scSidebarMenuSubItem>
                            <a
                              scSidebarMenuSubButton
                              [routerLink]="docsPath(item)"
                              routerLinkActive
                              #chartRla="routerLinkActive"
                              [active]="chartRla.isActive"
                            >
                              <span>{{ item.name }}</span>
                            </a>
                          </li>
                        }
                      </ul>
                    </div>
                  </li>
                }
                @if (utilities().length > 0) {
                  <li
                    scSidebarMenuItem
                    scCollapsible
                    routerLinkActive
                    [routerLinkActiveOptions]="{ exact: true }"
                    #groupUtilities="routerLinkActive"
                    [open]="groupUtilities.isActive"
                  >
                    <button
                      scSidebarMenuButton
                      scCollapsibleTrigger
                      class="[&[aria-expanded=true]>svg:last-child]:rotate-90"
                    >
                      <svg siWrenchIcon></svg>
                      <span>Utilities</span>
                      <svg
                        siChevronRightIcon
                        class="ms-auto transition-transform rtl:-scale-x-100"
                      ></svg>
                    </button>
                    <div scCollapsiblePanel hiddenUntilFound>
                      <ul scSidebarMenuSub>
                        @for (item of utilities(); track item.path) {
                          <li scSidebarMenuSubItem>
                            <a
                              scSidebarMenuSubButton
                              [routerLink]="docsPath(item)"
                              routerLinkActive
                              #utilRla="routerLinkActive"
                              [active]="utilRla.isActive"
                            >
                              <span>{{ item.name }}</span>
                            </a>
                          </li>
                        }
                      </ul>
                    </div>
                  </li>
                }
                @if (recipes().length > 0) {
                  <li
                    scSidebarMenuItem
                    scCollapsible
                    routerLinkActive
                    [routerLinkActiveOptions]="{ exact: true }"
                    #groupRecipes="routerLinkActive"
                    [open]="groupRecipes.isActive"
                  >
                    <button
                      scSidebarMenuButton
                      scCollapsibleTrigger
                      class="[&[aria-expanded=true]>svg:last-child]:rotate-90"
                    >
                      <svg siCookingPotIcon></svg>
                      <span>Recipes</span>
                      <svg
                        siChevronRightIcon
                        class="ms-auto transition-transform rtl:-scale-x-100"
                      ></svg>
                    </button>
                    <div scCollapsiblePanel hiddenUntilFound>
                      <ul scSidebarMenuSub>
                        <li scSidebarMenuSubItem>
                          <a
                            scSidebarMenuSubButton
                            routerLink="/docs/recipes"
                            [routerLinkActiveOptions]="{ exact: true }"
                            routerLinkActive
                            #recipesRla="routerLinkActive"
                            [active]="recipesRla.isActive"
                          >
                            <span>All recipes</span>
                          </a>
                        </li>
                        @for (item of recipes(); track item.path) {
                          <li scSidebarMenuSubItem>
                            <a
                              scSidebarMenuSubButton
                              [routerLink]="docsPath(item)"
                              routerLinkActive
                              #recipeRla="routerLinkActive"
                              [active]="recipeRla.isActive"
                            >
                              <span>{{ item.name }}</span>
                            </a>
                          </li>
                        }
                      </ul>
                    </div>
                  </li>
                }
                <li
                  scSidebarMenuItem
                  scCollapsible
                  routerLinkActive
                  [routerLinkActiveOptions]="{ exact: true }"
                  #groupAIElements="routerLinkActive"
                  [open]="groupAIElements.isActive"
                >
                  <button
                    scSidebarMenuButton
                    scCollapsibleTrigger
                    class="[&[aria-expanded=true]>svg:last-child]:rotate-90"
                  >
                    <svg siSparklesIcon></svg>
                    <span>AI Elements</span>
                    <svg
                      siChevronRightIcon
                      class="ms-auto transition-transform rtl:-scale-x-100"
                    ></svg>
                  </button>
                  <div scCollapsiblePanel hiddenUntilFound>
                    <ul scSidebarMenuSub>
                      @for (page of aiElementPages; track page.path) {
                        <li scSidebarMenuSubItem>
                          <a
                            scSidebarMenuSubButton
                            [routerLink]="page.path"
                            [routerLinkActiveOptions]="{ exact: true }"
                            routerLinkActive
                            #pageRla="routerLinkActive"
                            [active]="pageRla.isActive"
                          >
                            <span>{{ page.name }}</span>
                          </a>
                        </li>
                      }
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div scSidebarFooter>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <app-theme-menu inSidebar />
            </li>
          </ul>
        </div>

        <button scSidebarRail></button>
      </aside>

      <main scSidebarInset class="min-w-0 overflow-x-clip">
        <header
          class="bg-background sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b px-4"
        >
          <button scSidebarTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only">Toggle Sidebar</span>
          </button>
          <div
            scSeparator
            orientation="vertical"
            aria-hidden="true"
            class="h-4 self-center"
          ></div>
          <nav scBreadcrumb aria-label="Where you are">
            <ol scBreadcrumbList>
              @for (crumb of crumbs(); track crumb.name; let last = $last) {
                <li scBreadcrumbItem>
                  @if (last || !crumb.path) {
                    <span scBreadcrumbPage>{{ crumb.name }}</span>
                  } @else {
                    <a scBreadcrumbLink [routerLink]="crumb.path">{{
                      crumb.name
                    }}</a>
                  }
                </li>
                @if (!last) {
                  <li scBreadcrumbSeparator>
                    <svg siChevronRightIcon></svg>
                  </li>
                }
              }
            </ol>
          </nav>
        </header>

        <div class="flex flex-1">
          <div #contentArea class="min-w-0 flex-1 px-6 py-10">
            <!-- A reading width, as shadcn's docs: lines of 65–75 characters. -->
            <div class="mx-auto w-full max-w-3xl">
              <router-outlet />
              <app-page-nav [pages]="pages()" />
            </div>
          </div>

          <aside class="hidden w-56 shrink-0 xl:block">
            <div class="sticky top-14 p-6">
              <app-toc
                [items]="tocService.items()"
                [activeId]="tocService.activeId()"
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class DocsLayout {
  /** A component's page: its sidebar group's address. */
  private readonly docsPath = docsPath;

  /** A shortcut as this platform writes it (⌘K, Ctrl+K). */
  private readonly format = injectFormatForDisplay();
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() => cn('block', this.classInput()));

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly tocService = inject(TocService);
  private readonly componentsService = inject(ComponentsService);
  private readonly commandPalette = inject(CommandPaletteService);
  private readonly config = inject(ConfigService);

  private readonly contentArea =
    viewChild.required<ElementRef<HTMLElement>>('contentArea');

  private readonly components = this.componentsService.visibleComponents;
  private readonly charts = this.componentsService.visibleCharts;
  private readonly utilities = this.componentsService.visibleUtilities;
  private readonly recipes = this.componentsService.visibleRecipes;
  private readonly overviewPages = overviewPages;
  private readonly guidePages = guidePages;
  private readonly packagePages = packagePages;
  private readonly aiElementPages = aiElementPages;
  private readonly devMode = this.config.devMode;

  /** The page shown: its path, without query or fragment. */
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.split(/[?#]/)[0]),
    ),
    { initialValue: this.router.url.split(/[?#]/)[0] },
  );

  /**
   * The header's breadcrumb: every page under its sidebar group, as its
   * address is (Docs › Overview › Introduction, Docs › Components › Button,
   * Docs › Charts › Bar Chart, Docs › AI Elements › Chat). A group with a
   * page of its own links to it.
   */
  private readonly crumbs = computed<{ name: string; path?: string }[]>(() => {
    const url = this.url();
    const docs = { name: 'Docs', path: '/docs/overview/introduction' };
    const named = this.pages().find((page) => page.path === url);
    if (!named) return [docs];
    const group = this.docsNav
      .groups()
      .find((g) => g.pages.some((page) => page.path === url));
    if (!group) return [docs, { name: named.name }];
    const groupPath = GROUP_PAGES[group.label];
    return [
      docs,
      { name: group.label, path: groupPath === url ? undefined : groupPath },
      { name: named.name },
    ];
  });

  /** Every docs page, in the sidebar's order: the bottom's previous and next. */
  private readonly docsNav = inject(DocsNavService);
  private readonly pages = this.docsNav.pages;

  constructor() {
    afterNextRender(() => {
      this.extractTocHeadings();

      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe(() => {
          setTimeout(() => this.extractTocHeadings(), 100);
        });
    });
  }

  private openCommandPalette(): void {
    this.commandPalette.open.set(true);
  }

  private extractTocHeadings(): void {
    const container = this.contentArea().nativeElement;
    this.tocService.extractHeadings(container);
  }
}
