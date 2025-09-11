import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  ScButton,
  ScCommandDialog,
  ScCommandEmpty,
  ScCommandInput,
  ScCommandItem,
  ScCommandList,
  ScDialog,
  ScDialogContent,
  ScNav,
  ScNavLink,
  ScNavList,
  ScThemeToggler,
} from '@semantic-components/ui';

@Component({
  selector: 'cms-navigation',
  imports: [
    RouterModule,
    FormsModule,
    ScButton,
    ScCommandInput,
    ScCommandList,
    ScCommandEmpty,
    ScCommandItem,
    ScDialog,
    ScDialogContent,
    ScNav,
    ScNavList,
    ScNavLink,
    ScThemeToggler,
  ],
  template: `
    <div class="bg-background border-b border-border shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Brand -->
          <div class="shrink-0">
            <h1 class="text-xl font-bold text-foreground">CMS</h1>
          </div>

          <!-- Main Navigation -->
          <nav class="hidden sm:flex" sc-nav>
            <ul sc-nav-list>
              <li>
                <a sc-nav-link routerLink="/home" routerLinkActive="active-page">Home</a>
              </li>
              <li>
                <a sc-nav-link routerLink="/about" routerLinkActive="active-page">About</a>
              </li>
              <li>
                <a sc-nav-link href="#">Content</a>
              </li>
              <li>
                <a sc-nav-link href="#">Media</a>
              </li>
              <li>
                <a sc-nav-link href="#">Settings</a>
              </li>
            </ul>
          </nav>

          <!-- Search Button -->
          <div class="hidden sm:flex flex-1 justify-center px-8">
            <button
              class="w-full max-w-md justify-start text-sm text-muted-foreground"
              (click)="openSearchDialog()"
              sc-button
              variant="outline"
            >
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search...
              <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘K</span>
            </button>
          </div>

          <!-- User Actions -->
          <div class="hidden sm:flex sm:items-center space-x-4">
            <sc-theme-toggler />

            <button
              class="p-1 rounded-full text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
              type="button"
            >
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            <button
              class="rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
            >
              <span class="sr-only">Open user menu</span>
              <div class="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                <span class="text-sm font-medium text-foreground">U</span>
              </div>
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="sm:hidden">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
              (click)="toggleMobileMenu()"
              type="button"
            >
              <span class="sr-only">
                {{ isMobileMenuOpen() ? 'Close main menu' : 'Open main menu' }}
              </span>
              @if (!isMobileMenuOpen()) {
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              } @else {
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      @if (isMobileMenuOpen()) {
        <div class="sm:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
            <nav sc-nav>
              <div class="space-y-1">
                <a
                  class="block px-3 py-2 text-base font-medium"
                  (click)="closeMobileMenu()"
                  sc-nav-link
                  routerLink="/home"
                  routerLinkActive="active-page"
                >
                  Home
                </a>
                <a
                  class="block px-3 py-2 text-base font-medium"
                  (click)="closeMobileMenu()"
                  sc-nav-link
                  routerLink="/about"
                  routerLinkActive="active-page"
                >
                  About
                </a>
                <a
                  class="block px-3 py-2 text-base font-medium"
                  (click)="closeMobileMenu()"
                  sc-nav-link
                  href="#"
                >
                  Content
                </a>
                <a
                  class="block px-3 py-2 text-base font-medium"
                  (click)="closeMobileMenu()"
                  sc-nav-link
                  href="#"
                >
                  Media
                </a>
                <a
                  class="block px-3 py-2 text-base font-medium"
                  (click)="closeMobileMenu()"
                  sc-nav-link
                  href="#"
                >
                  Settings
                </a>
              </div>
            </nav>

            <!-- Mobile search -->
            <div class="px-3 py-2 border-t border-border mt-2 pt-4">
              <button
                class="w-full justify-start text-sm text-muted-foreground mb-4"
                (click)="openSearchDialog(); closeMobileMenu()"
                sc-button
                variant="outline"
              >
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search...
              </button>
            </div>

            <!-- Mobile theme toggler -->
            <div class="px-3 py-2 border-t border-border pt-4">
              <sc-theme-toggler />
            </div>
          </div>
        </div>
      }
    </div>

    <!-- Search Dialog -->
    @if (isSearchOpen()) {
      <div class="fixed inset-0 z-50" sc-dialog>
        <div class="fixed inset-0 bg-black/50" (click)="closeSearchDialog()"></div>
        <div
          class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg"
          sc-dialog-content
        >
          <sc-command-input placeholder="Type a command or search..." />
          <sc-command-list>
            <sc-command-empty>No results found.</sc-command-empty>
            <sc-command-item (click)="selectResult('home')">
              <span>🏠 Home</span>
            </sc-command-item>
            <sc-command-item (click)="selectResult('about')">
              <span>ℹ️ About</span>
            </sc-command-item>
            <sc-command-item (click)="selectResult('content')">
              <span>📝 Content</span>
            </sc-command-item>
            <sc-command-item (click)="selectResult('media')">
              <span>🖼️ Media</span>
            </sc-command-item>
            <sc-command-item (click)="selectResult('settings')">
              <span>⚙️ Settings</span>
            </sc-command-item>
          </sc-command-list>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class CmsNavigation {
  isMobileMenuOpen = signal(false);
  isSearchOpen = signal(false);
  searchQuery = '';

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  openSearchDialog() {
    this.isSearchOpen.set(true);
    this.searchQuery = '';
  }

  closeSearchDialog() {
    this.isSearchOpen.set(false);
    this.searchQuery = '';
  }

  selectResult(result: string) {
    console.log('Selected:', result);
    this.closeSearchDialog();
    // Add navigation logic here based on result
    // For example: this.router.navigate([`/${result}`]);
  }
}
