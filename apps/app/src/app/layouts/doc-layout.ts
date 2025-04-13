import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

import {
  ScLink,
  ScSheet,
  ScSheetClose,
  ScSheetConfig,
  ScSheetManager,
} from '@semantic-components/ui';
import { SiChevronLeftIcon, SiChevronRightIcon, SiXIcon } from '@semantic-icons/lucide-icons';

import { AppStateService } from '../app-state.service';
import { Sidebar } from '../components/sidebar';
import { TableOfContents } from '../components/table-of-contents';
import { SitemapLoader } from '../core/sitemap';
import { PageInfo } from '../core/types';

@Component({
  selector: 'app-doc-layout',
  imports: [
    Sidebar,
    RouterOutlet,
    TableOfContents,
    ScLink,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    RouterLink,
    NgTemplateOutlet,
    ScSheet,
    ScSheetClose,
    SiXIcon,
  ],
  template: `
    <div class="flex-1 flex">
      <!-- Sidebar -->
      <div
        class="hidden md:flex border-r border-border/40 w-[240px] flex-shrink-0 md:sticky md:top-14 md:h-[calc(100vh-56px)] md:overflow-y-auto"
      >
        <ng-template #sidebar>
          <app-sidebar />
        </ng-template>
        <ng-container *ngTemplateOutlet="sidebarRef()" />
      </div>

      <ng-template #sheet>
        <div sc-sheet>
          <button sc-sheet-close>
            <svg class="size-4" si-x-icon></svg>
            <span class="sr-only">Close</span>
          </button>
          <ng-container *ngTemplateOutlet="sidebarRef()" />
        </div>
      </ng-template>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <!-- Table of Contents & Content -->
        <div class="flex flex-col lg:flex-row">
          <div class="flex-1 px-4 pt-6 pb-8 lg:px-8">
            <div class="mx-auto max-w-3xl space-y-10">
              <!-- Introduction -->
              <div class="space-y-2">
                <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
                  {{ pageInfo()?.current?.title }}
                </h1>
                <p class="text-xl text-muted-foreground">
                  {{ pageInfo()?.current?.description }}
                </p>
              </div>

              <router-outlet />

              <div class="mt-8 flex justify-between">
                <div>
                  @if (pageInfo()?.previous) {
                    <a [routerLink]="[pageInfo()?.previous?.path]" sc-link variant="ghost">
                      <svg si-chevron-left-icon></svg>
                      <span>{{ pageInfo()?.previous?.title }}</span>
                    </a>
                  }
                </div>

                <div>
                  @if (pageInfo()?.next) {
                    <a [routerLink]="[pageInfo()?.next?.path]" sc-link variant="ghost">
                      <span>{{ pageInfo()?.next?.title }}</span>
                      <svg si-chevron-right-icon></svg>
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>

          <!-- Table of Contents -->
          <div
            class="hidden lg:block sticky top-14 h-[calc(100vh-56px)] w-[240px] flex-shrink-0 overflow-y-auto py-6 pl-8 pr-4"
          >
            <app-table-of-contents />
          </div>
        </div>
      </main>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocLayout {
  private readonly router = inject(Router);

  readonly sitemapLoader = inject(SitemapLoader);

  readonly currentPath = signal('');

  private readonly appStateService = inject(AppStateService);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath.set(this.router.url);
      }
    });

    effect(() => {
      const a = this.appStateService.mobileMenu();

      if (a) {
        this.openSheet();
      }

      if (!a) {
        this.scSheetManager.close();
      }
    });

    afterRenderEffect(() => {
      if (!this.currentPath()) {
        this.currentPath.set(this.router.url);
      }
    });
  }

  pageInfo = computed<PageInfo | undefined>(() => {
    const p: PageInfo = { current: undefined, previous: undefined, next: undefined };

    for (let index = 0; index < this.sitemapLoader.pages().length; index++) {
      if (this.sitemapLoader.pages()[index].path === this.currentPath()) {
        p.current = this.sitemapLoader.pages()[index];

        if (index > 0) {
          p.previous = this.sitemapLoader.pages()[index - 1];
        }

        if (index < this.sitemapLoader.pages().length) {
          p.next = this.sitemapLoader.pages()[index + 1];
        }
      }
    }

    return p;
  });

  private readonly scSheetManager = inject(ScSheetManager);

  protected readonly sidebarRef = viewChild.required<TemplateRef<unknown>>('sidebar');

  protected readonly sheetRef = viewChild.required<TemplateRef<unknown>>('sheet');

  private openSheet() {
    const config = new ScSheetConfig();
    config.side = 'left';
    config.width = '300';

    this.scSheetManager.open(this.sheetRef(), config);
  }
}
