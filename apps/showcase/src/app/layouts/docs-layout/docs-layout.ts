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
  SiChevronRightIcon,
  SiCookingPotIcon,
  SiDownloadIcon,
  SiPanelLeftIcon,
  SiSearchIcon,
  SiSparklesIcon,
  SiWrenchIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';
import { filter, map } from 'rxjs';
import { Logo } from '../../components/logo/logo';
import { PageNav, type PageNavItem } from '../../components/page-nav/page-nav';
import { ThemeMenu } from '../../components/theme-menu/theme-menu';
import { Toc } from '../../components/toc/toc';
import { TocService } from '../../components/toc/toc-service';
import { CommandPaletteService } from '../../services/command-palette-service';
import { ComponentsService } from '../../services/components-service';
import { ConfigService } from '../../services/config-service';

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
    SiCookingPotIcon,
    SiDownloadIcon,
    SiPanelLeftIcon,
    SiSearchIcon,
    SiSparklesIcon,
    SiWrenchIcon,
    Logo,
    Toc,
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
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siBookOpenTextIcon></svg>
                    <span>Semantic Components</span>
                  </a>
                  <ul scSidebarMenuSub>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/docs/getting-started/introduction"
                        routerLinkActive
                        #introRla="routerLinkActive"
                        [active]="introRla.isActive"
                      >
                        <span>Introduction</span>
                      </a>
                    </li>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/docs/components"
                        [routerLinkActiveOptions]="{ exact: true }"
                        routerLinkActive
                        #componentsListRla="routerLinkActive"
                        [active]="componentsListRla.isActive"
                      >
                        <span>Components</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siDownloadIcon></svg>
                    <span>Installation</span>
                  </a>
                  <ul scSidebarMenuSub>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/docs/getting-started/prerequisites"
                        routerLinkActive
                        #prerequisitesRla="routerLinkActive"
                        [active]="prerequisitesRla.isActive"
                      >
                        <span>Prerequisites</span>
                      </a>
                    </li>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/docs/getting-started/ui"
                        routerLinkActive
                        #coreRla="routerLinkActive"
                        [active]="coreRla.isActive"
                      >
                        <span>UI</span>
                      </a>
                    </li>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/docs/getting-started/presets"
                        routerLinkActive
                        #presetsRla="routerLinkActive"
                        [active]="presetsRla.isActive"
                      >
                        <span>Presets</span>
                      </a>
                    </li>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/docs/getting-started/custom-preset"
                        routerLinkActive
                        #customPresetRla="routerLinkActive"
                        [active]="customPresetRla.isActive"
                      >
                        <span>Custom preset</span>
                      </a>
                    </li>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/docs/getting-started/i18n"
                        routerLinkActive
                        #i18nRla="routerLinkActive"
                        [active]="i18nRla.isActive"
                      >
                        <span>Internationalization</span>
                      </a>
                    </li>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/docs/getting-started/rtl"
                        routerLinkActive
                        #rtlRla="routerLinkActive"
                        [active]="rtlRla.isActive"
                      >
                        <span>Right to left</span>
                      </a>
                    </li>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/docs/getting-started/mcp-server"
                        routerLinkActive
                        #mcpServerRla="routerLinkActive"
                        [active]="mcpServerRla.isActive"
                      >
                        <span>MCP Server</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siBoxIcon></svg>
                    <span>Components</span>
                  </a>
                  <ul scSidebarMenuSub>
                    @for (item of components(); track item.path) {
                      <li scSidebarMenuSubItem>
                        <a
                          scSidebarMenuSubButton
                          [routerLink]="'/docs/components/' + item.path"
                          routerLinkActive
                          #rla="routerLinkActive"
                          [active]="rla.isActive"
                        >
                          <span>{{ item.name }}</span>
                        </a>
                      </li>
                    }
                  </ul>
                </li>
                @if (utilities().length > 0) {
                  <li scSidebarMenuItem>
                    <a scSidebarMenuButton>
                      <svg siWrenchIcon></svg>
                      <span>Utilities</span>
                    </a>
                    <ul scSidebarMenuSub>
                      @for (item of utilities(); track item.path) {
                        <li scSidebarMenuSubItem>
                          <a
                            scSidebarMenuSubButton
                            [routerLink]="'/docs/components/' + item.path"
                            routerLinkActive
                            #utilRla="routerLinkActive"
                            [active]="utilRla.isActive"
                          >
                            <span>{{ item.name }}</span>
                          </a>
                        </li>
                      }
                    </ul>
                  </li>
                }
                @if (recipes().length > 0) {
                  <li scSidebarMenuItem>
                    <a scSidebarMenuButton>
                      <svg siCookingPotIcon></svg>
                      <span>Recipes</span>
                    </a>
                    <ul scSidebarMenuSub>
                      @for (item of recipes(); track item.path) {
                        <li scSidebarMenuSubItem>
                          <a
                            scSidebarMenuSubButton
                            [routerLink]="'/docs/components/' + item.path"
                            routerLinkActive
                            #recipeRla="routerLinkActive"
                            [active]="recipeRla.isActive"
                          >
                            <span>{{ item.name }}</span>
                          </a>
                        </li>
                      }
                    </ul>
                  </li>
                }
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siSparklesIcon></svg>
                    <span>AI Elements</span>
                  </a>
                  <ul scSidebarMenuSub>
                    @for (item of aiElements; track item.path) {
                      <li scSidebarMenuSubItem>
                        <a
                          scSidebarMenuSubButton
                          [routerLink]="'/docs/ai-elements/' + item.path"
                          routerLinkActive
                          #aiRla="routerLinkActive"
                          [active]="aiRla.isActive"
                        >
                          <span>{{ item.name }}</span>
                        </a>
                      </li>
                    }
                  </ul>
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
          <div #contentArea class="min-w-0 flex-1 p-6">
            <router-outlet />
            <app-page-nav [pages]="pages()" />
          </div>

          <aside class="hidden w-56 shrink-0 border-l xl:block">
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
  /** A shortcut as this platform writes it (⌘K, Ctrl+K). */
  protected readonly format = injectFormatForDisplay();
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly tocService = inject(TocService);
  private readonly componentsService = inject(ComponentsService);
  private readonly commandPalette = inject(CommandPaletteService);
  private readonly config = inject(ConfigService);

  private readonly contentArea =
    viewChild.required<ElementRef<HTMLElement>>('contentArea');

  readonly components = this.componentsService.visibleComponents;
  readonly utilities = this.componentsService.visibleUtilities;
  readonly recipes = this.componentsService.visibleRecipes;
  /** shadcn's AI Elements: patterns built from the components. */
  protected readonly aiElements = [
    { name: 'Chain of Thought', path: 'chain-of-thought' },
    { name: 'Chat', path: 'chat' },
    { name: 'Checkpoint', path: 'checkpoint' },
    { name: 'Confirmation', path: 'confirmation' },
    { name: 'Context', path: 'context' },
    { name: 'File Tree', path: 'file-tree' },
    { name: 'Inline Citation', path: 'inline-citation' },
    { name: 'Message', path: 'message' },
    { name: 'Model Selector', path: 'model-selector' },
    { name: 'Plan', path: 'plan' },
    { name: 'Prompt Input', path: 'prompt-input' },
    { name: 'Queue', path: 'queue' },
    { name: 'Reasoning', path: 'reasoning' },
    { name: 'Sources', path: 'sources' },
    { name: 'Stack Trace', path: 'stack-trace' },
    { name: 'Subagent', path: 'subagent' },
    { name: 'Suggestion', path: 'suggestion' },
    { name: 'Task', path: 'task' },
    { name: 'Terminal', path: 'terminal' },
    { name: 'Test Results', path: 'test-results' },
    { name: 'Tool', path: 'tool' },
  ];
  protected readonly devMode = this.config.devMode;

  /** The page shown: its path, without query or fragment. */
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.split(/[?#]/)[0]),
    ),
    { initialValue: this.router.url.split(/[?#]/)[0] },
  );

  /** The header's breadcrumb: Docs › Components › Button. */
  protected readonly crumbs = computed<{ name: string; path?: string }[]>(
    () => {
      const url = this.url();
      const docs = { name: 'Docs', path: '/docs/getting-started/introduction' };
      const components = { name: 'Components', path: '/docs/components' };
      if (url === components.path) return [docs, components];
      const named = this.pages().find((page) => page.path === url);
      if (url.startsWith('/docs/components/')) {
        const slug = url.slice('/docs/components/'.length);
        const item = this.componentsService
          .components()
          .find((c) => c.path === slug);
        return [docs, components, { name: named?.name ?? item?.name ?? slug }];
      }
      return named ? [docs, { name: named.name }] : [docs];
    },
  );

  /** Every docs page, in the sidebar's order: the bottom's previous and next. */
  protected readonly pages = computed<PageNavItem[]>(() => [
    { name: 'Introduction', path: '/docs/getting-started/introduction' },
    { name: 'Components', path: '/docs/components' },
    { name: 'Prerequisites', path: '/docs/getting-started/prerequisites' },
    { name: 'UI', path: '/docs/getting-started/ui' },
    { name: 'Presets', path: '/docs/getting-started/presets' },
    {
      name: 'Custom preset',
      path: '/docs/getting-started/custom-preset',
    },
    { name: 'Internationalization', path: '/docs/getting-started/i18n' },
    { name: 'Right to left', path: '/docs/getting-started/rtl' },
    { name: 'MCP Server', path: '/docs/getting-started/mcp-server' },
    ...[...this.components(), ...this.utilities(), ...this.recipes()].map(
      (item) => ({ name: item.name, path: '/docs/components/' + item.path }),
    ),
    ...this.aiElements.map((item) => ({
      name: item.name,
      path: '/docs/ai-elements/' + item.path,
    })),
  ]);

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

  openCommandPalette(): void {
    this.commandPalette.open.set(true);
  }

  private extractTocHeadings(): void {
    const container = this.contentArea().nativeElement;
    this.tocService.extractHeadings(container);
  }
}
