import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
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
  ScThemeToggle,
} from '@semantic-components/ui-lab';
import {
  SiBookOpenTextIcon,
  SiBoxIcon,
  SiDownloadIcon,
  SiMoonIcon,
  SiSunIcon,
} from '@semantic-icons/lucide-icons';
import { cn, ScSeparator } from '@semantic-components/ui';
import { filter } from 'rxjs';

import { Logo } from '../../components/logo/logo';
import { Toc } from '../../components/toc/toc';
import { TocService } from '../../components/toc/toc.service';
import { ComponentsService } from '../../services/components.service';
import { ConfigService } from '../../services/config.service';

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
    ScSeparator,
    ScThemeToggle,
    SiSunIcon,
    SiMoonIcon,
    SiBookOpenTextIcon,
    SiBoxIcon,
    SiDownloadIcon,
    Logo,
    Toc,
  ],
  template: `
    <div scSidebarProvider class="min-h-svh">
      <div scSidebar side="left" variant="sidebar" collapsible="icon">
        <div scSidebarHeader>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton size="lg" routerLink="/">
                <svg app-logo class="!size-8"></svg>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">
                    Semantic Components
                  </span>
                  <span class="truncate text-xs text-sidebar-foreground/70">
                    UI lib for Angular
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div scSidebarContent>
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
                        [isActive]="introRla.isActive"
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
                        [isActive]="componentsListRla.isActive"
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
                        [isActive]="prerequisitesRla.isActive"
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
                        [isActive]="coreRla.isActive"
                      >
                        <span>UI</span>
                      </a>
                    </li>
                    @if (devMode()) {
                      <li scSidebarMenuSubItem>
                        <a
                          scSidebarMenuSubButton
                          routerLink="/docs/getting-started/ui-lab"
                          routerLinkActive
                          #uiLabRla="routerLinkActive"
                          [isActive]="uiLabRla.isActive"
                        >
                          <span>UI Lab</span>
                        </a>
                      </li>
                    }

                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/docs/getting-started/carousel"
                        routerLinkActive
                        #carouselRla="routerLinkActive"
                        [isActive]="carouselRla.isActive"
                      >
                        <span>Carousel</span>
                      </a>
                    </li>

                    @if (devMode()) {
                      <li scSidebarMenuSubItem>
                        <a
                          scSidebarMenuSubButton
                          routerLink="/docs/getting-started/editor"
                          routerLinkActive
                          #editorRla="routerLinkActive"
                          [isActive]="editorRla.isActive"
                        >
                          <span>Editor</span>
                        </a>
                      </li>
                      <li scSidebarMenuSubItem>
                        <a
                          scSidebarMenuSubButton
                          routerLink="/docs/getting-started/code"
                          routerLinkActive
                          #codeRla="routerLinkActive"
                          [isActive]="codeRla.isActive"
                        >
                          <span>Code</span>
                        </a>
                      </li>
                    }
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
                          [isActive]="rla.isActive"
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
        </div>

        <div scSidebarFooter>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <button scThemeToggle #themeToggle="scThemeToggle" class="w-full">
                @if (themeToggle.isDark()) {
                  <svg siSunIcon></svg>
                } @else {
                  <svg siMoonIcon></svg>
                }
              </button>
            </li>
          </ul>
        </div>

        <button scSidebarRail></button>
      </div>

      <main scSidebarInset>
        <header
          class="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4"
        >
          <button scSidebarTrigger>
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
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
            <span class="sr-only">Toggle Sidebar</span>
          </button>
          <div scSeparator orientation="vertical" class="h-4"></div>
          <span class="text-sm font-medium text-muted-foreground">
            Documentation
          </span>
        </header>

        <div class="flex flex-1">
          <div #contentArea class="flex-1 p-6">
            <router-outlet />
          </div>

          <aside class="hidden xl:block w-56 border-l shrink-0">
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsLayout {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly tocService = inject(TocService);
  private readonly componentsService = inject(ComponentsService);
  private readonly config = inject(ConfigService);

  private readonly contentArea =
    viewChild.required<ElementRef<HTMLElement>>('contentArea');

  readonly components = this.componentsService.visibleComponents;
  protected readonly devMode = this.config.devMode;

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

  private extractTocHeadings(): void {
    const container = this.contentArea().nativeElement;
    this.tocService.extractHeadings(container);
  }
}
