import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { ScButton, ScThemeToggler } from '@semantic-components/ui';
import { SiMenuIcon } from '@semantic-icons/lucide-icons';

import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-header',
  imports: [ScButton, ScThemeToggler, RouterLink, RouterLinkActive, NgClass, SiMenuIcon],
  template: `
    <div class="flex h-14 items-center px-4 justify-between md:justify-start">
      <div class="md:hidden">
        <!-- Mobile Menu Toggle -->
        <button (click)="toggleMobileMenu()" sc-button variant="outline" size="icon">
          <svg si-menu-icon></svg>
        </button>
      </div>

      <!-- Logo - Centered on mobile, left-aligned on desktop -->
      <div
        class="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none md:mr-4 flex"
      >
        <a class="md:mr-6 flex items-center md:space-x-2" routerLink="/">
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
          <span class="hidden font-bold sm:inline-block">Semantic Components</span>
        </a>
        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a
            class="transition-colors hover:text-foreground/80"
            #link1="routerLinkActive"
            [ngClass]="link1.isActive ? 'text-foreground' : 'text-foreground/60'"
            routerLink="/docs/getting-started/introduction"
            routerLinkActive=""
          >
            Docs
          </a>
          <a
            class="transition-colors hover:text-foreground/80"
            #link2="routerLinkActive"
            [ngClass]="link2.isActive ? 'text-foreground' : 'text-foreground/60'"
            routerLink="/docs/components/accordion"
            routerLinkActive=""
          >
            Components
          </a>
        </nav>
      </div>

      <div class="flex md:flex-1 items-center justify-between space-x-2 md:justify-end">
        <div class="w-full flex-1 md:w-auto md:flex-none">
          <!--div class="relative">
            <svg
              class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
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
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8 sm:w-[200px] md:w-[250px] lg:w-[300px]"
              type="search"
              placeholder="Search documentation..."
            />
          </div-->
        </div>

        <nav class="flex items-center">
          <a
            class="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mr-1"
            href="https://github.com/gridatek/semantic-components"
            target="_blank"
          >
            GitHub
          </a>

          <sc-theme-toggler />
        </nav>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly appStateService = inject(AppStateService);

  protected toggleMobileMenu() {
    this.appStateService.mobileMenu.update((v) => !v);
  }

  private readonly router = inject(Router);

  constructor() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (this.appStateService.mobileMenu()) {
          this.appStateService.mobileMenu.set(false);
        }
      }
    });
  }
}
