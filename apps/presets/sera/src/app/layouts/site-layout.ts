import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  ScLink,
  ScNavbar,
  ScNavbarActions,
  ScNavbarBrand,
  ScNavbarLink,
  ScNavbarMenu,
  ScNavbarMenuLink,
  ScNavbarNav,
  ScNavbarToggle,
  ScSeparator,
} from '@semantic-components/ui';
import { SiMenuIcon, SiXIcon } from '@semantic-icons/lucide-icons';
import { ThemeMenu } from './theme-menu';

/**
 * The Sera website: a header — the mark, the pages, the theme, a menu on a
 * phone — the page, a footer.
 */
@Component({
  selector: 'app-site-layout',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ScLink,
    ScNavbar,
    ScNavbarActions,
    ScNavbarBrand,
    ScNavbarLink,
    ScNavbarMenu,
    ScNavbarMenuLink,
    ScNavbarNav,
    ScNavbarToggle,
    ScSeparator,
    SiMenuIcon,
    SiXIcon,
    ThemeMenu,
  ],
  template: `
    <header
      scNavbar
      #navbar="scNavbar"
      sticky
      aria-label="Sera"
      class="px-(--page-gutter) md:px-(--page-gutter)"
    >
      <a scNavbarBrand routerLink="/" class="gap-2">
        <span
          class="bg-primary text-primary-foreground font-heading flex size-7 items-center justify-center text-base"
          aria-hidden="true"
          >S</span
        >
        <span class="font-heading text-lg tracking-wide uppercase">Sera</span>
      </a>

      <nav scNavbarNav aria-label="Main">
        @for (page of pages; track page.path) {
          <a
            scNavbarLink
            [routerLink]="page.path"
            routerLinkActive
            #rla="routerLinkActive"
            [active]="rla.isActive"
          >
            {{ page.label }}
          </a>
        }
      </nav>

      <div scNavbarActions>
        <app-theme-menu />
      </div>

      <button scNavbarToggle>
        @if (navbar.open()) {
          <svg siXIcon></svg>
          <span class="sr-only">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only">Open menu</span>
        }
      </button>

      <div scNavbarMenu>
        <nav aria-label="Main">
          @for (page of pages; track page.path) {
            <a
              scNavbarMenuLink
              [routerLink]="page.path"
              routerLinkActive
              #menuRla="routerLinkActive"
              [active]="menuRla.isActive"
            >
              {{ page.label }}
            </a>
          }
        </nav>
      </div>
    </header>

    <main class="min-h-[70vh]">
      <router-outlet />
    </main>

    <footer class="bg-background border-t">
      <div
        class="flex w-full flex-col gap-8 px-(--page-gutter) py-12 md:flex-row md:justify-between"
      >
        <div class="flex max-w-sm flex-col gap-2">
          <p class="font-heading text-lg tracking-wide uppercase">Sera</p>
          <p class="text-muted-foreground text-sm">
            An editorial workspace: audience analytics, an article directory
            with its editor, a media library.
          </p>
        </div>
        <nav aria-label="Footer" class="flex flex-col gap-2 text-sm">
          <a scLink class="w-fit" routerLink="/">Introducing Sera</a>
          @for (page of pages; track page.path) {
            <a scLink class="w-fit" [routerLink]="page.path">{{
              page.label
            }}</a>
          }
        </nav>
      </div>
      <div scSeparator></div>
      <p class="text-muted-foreground w-full px-(--page-gutter) py-6 text-xs">
        Design: shadcn/ui's Sera (MIT). Components: Semantic Components.
      </p>
    </footer>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class SiteLayout {
  protected readonly pages = [
    { path: '/dashboard', label: 'Audience Analytics' },
    { path: '/articles', label: 'Article Directory' },
    { path: '/media', label: 'Media Library' },
  ];
}
