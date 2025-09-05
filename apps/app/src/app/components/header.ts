import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { ScButton, ScThemeToggler } from '@semantic-components/ui';
import { SiMenuIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

import { AppStateService } from '../app-state.service';
import { SearchCommandComponent } from './search-command/search-command.component';

@Component({
  selector: 'app-header',
  imports: [
    ScButton,
    ScThemeToggler,
    RouterLink,
    RouterLinkActive,
    SiMenuIcon,
    SiSearchIcon,
    SearchCommandComponent,
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
        <button
          class="hidden md:inline-flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          (click)="openSearch()"
          type="button"
          title="Search"
        >
          <svg class="h-4 w-4 text-muted-foreground" si-search-icon></svg>
          <span class="text-muted-foreground">Search...</span>
          <kbd
            class="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs font-mono ml-auto"
          >
            {{ keyboardShortcut }}
          </kbd>
        </button>

        <!-- Search Trigger (Mobile) -->
        <button
          class="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0"
          (click)="openSearch()"
          sc-button
          variant="ghost"
          size="icon"
          title="Search"
        >
          <svg class="h-4 w-4" si-search-icon></svg>
        </button>

        <a
          class="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          href="https://github.com/gridatek/semantic-components"
          target="_blank"
        >
          GitHub
        </a>
        <sc-theme-toggler />
      </div>

      <!-- Search Command Dialog -->
      <app-search-command [open]="searchOpen" />
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly appStateService = inject(AppStateService);
  private readonly router = inject(Router);

  protected readonly searchOpen = signal(false);

  // OS detection for keyboard shortcuts
  protected readonly keyboardShortcut =
    typeof navigator !== 'undefined'
      ? navigator.platform.toUpperCase().indexOf('MAC') >= 0
        ? '⌘K'
        : 'Ctrl+K'
      : 'Ctrl+K';

  protected toggleMobileMenu() {
    this.appStateService.mobileMenu.update((v) => !v);
  }

  protected openSearch() {
    this.searchOpen.set(true);
  }

  @HostListener('window:keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent) {
    // Handle Cmd+K (Mac) or Ctrl+K (Windows/Linux) for search
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.openSearch();
    }

    // Handle Escape to close search
    if (event.key === 'Escape' && this.searchOpen()) {
      this.searchOpen.set(false);
    }
  }

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.appStateService.mobileMenu()) {
          this.appStateService.mobileMenu.set(false);
        }
        // Close search on navigation
        if (this.searchOpen()) {
          this.searchOpen.set(false);
        }
      }
    });
  }
}
