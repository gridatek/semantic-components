import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

import {
  CommandTriggerConfig,
  ScButton,
  ScCommandTrigger,
  ScThemeToggler,
} from '@semantic-components/ui';
import { SiMenuIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

import { AppStateService } from '../app-state.service';
import { SearchCommandTemplateComponent } from './search-command/search-command-template.component';

@Component({
  selector: 'app-header',
  imports: [
    ScButton,
    ScThemeToggler,
    RouterLink,
    RouterLinkActive,
    SiMenuIcon,
    SiSearchIcon,
    ScCommandTrigger,
    SearchCommandTemplateComponent,
  ],
  template: `
    <div class="flex h-14 items-center px-4">
      <!-- Mobile: Menu button -->
      <button
        class="md:hidden"
        (click)="toggleMobileMenu()"
        sc-button
        variant="outline"
        size="icon"
      >
        <svg si-menu-icon></svg>
      </button>

      <!-- Mobile: Centered logo -->
      <div class="absolute left-1/2 -translate-x-1/2 md:hidden">
        <a class="flex items-center" routerLink="/">
          <svg
            class="h-6 w-6"
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
            <path
              d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
            ></path>
          </svg>
        </a>
      </div>

      <!-- Desktop: Logo + Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <a class="flex items-center space-x-2" routerLink="/">
          <svg
            class="h-6 w-6"
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
            <path
              d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
            ></path>
          </svg>
          <span class="font-bold">Semantic Components</span>
        </a>

        <nav class="flex items-center space-x-6 text-sm font-medium">
          <a
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            routerLink="/docs/getting-started/introduction"
            routerLinkActive="text-foreground"
          >
            Docs
          </a>
          <a
            class="transition-colors hover:text-foreground/80 text-foreground/60"
            routerLink="/docs/components/accordion"
            routerLinkActive="text-foreground"
          >
            Components
          </a>
        </nav>
      </div>

      <!-- Right side: Search + GitHub + Theme toggle -->
      <div class="flex items-center ml-auto space-x-2">
        <!-- Search Trigger (Desktop) -->
        <div class="hidden md:block">
          <sc-command-trigger
            [config]="searchConfig"
            [dialogTemplate]="searchTemplate"
            (dialogOpened)="onSearchOpened()"
            (dialogClosed)="onSearchClosed($event)"
          >
            <svg class="h-4 w-4 text-muted-foreground" slot="icon" si-search-icon></svg>
            <span class="text-muted-foreground">Search...</span>
          </sc-command-trigger>
        </div>

        <!-- Search Trigger (Mobile) -->
        <div class="md:hidden">
          <sc-command-trigger
            [config]="mobileSearchConfig"
            [dialogTemplate]="searchTemplate"
            (dialogOpened)="onSearchOpened()"
            (dialogClosed)="onSearchClosed($event)"
            triggerClass="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0"
          >
            <svg class="h-4 w-4" slot="icon" si-search-icon></svg>
          </sc-command-trigger>
        </div>

        <a
          class="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          href="https://github.com/gridatek/semantic-components"
          target="_blank"
        >
          GitHub
        </a>
        <sc-theme-toggler />
      </div>

      <!-- Search Template -->
      <ng-template #searchTemplate>
        <app-search-command-template />
      </ng-template>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  @ViewChild('searchTemplate') searchTemplate!: TemplateRef<any>;

  private readonly appStateService = inject(AppStateService);
  private readonly router = inject(Router);

  // Search configurations
  protected readonly searchConfig: CommandTriggerConfig = {
    title: 'Search Documentation',
    description: 'Search components, docs, and guides',
    width: '700px',
    height: '500px',
    placeholder: 'Search documentation, components, and more...',
    enableGlobalShortcut: true,
    shortcutKey: 'k',
  };

  protected readonly mobileSearchConfig: CommandTriggerConfig = {
    title: 'Search',
    description: 'Search components, docs, and guides',
    width: '90vw',
    height: '80vh',
    placeholder: 'Search...',
    enableGlobalShortcut: false,
  };

  protected toggleMobileMenu() {
    this.appStateService.mobileMenu.update((v) => !v);
  }

  protected onSearchOpened() {
    console.log('Search dialog opened');
  }

  protected onSearchClosed(result: any) {
    console.log('Search dialog closed:', result);
  }

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.appStateService.mobileMenu()) {
          this.appStateService.mobileMenu.set(false);
        }
      }
    });
  }
}
