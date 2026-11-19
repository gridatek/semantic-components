import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  ScHeader,
  ScHeaderMobileMenu,
  ScHeaderMobileMenuToggle,
  ScLink,
  ScNavigationMenu,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
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
    ScHeader,
    ScNavigationMenu,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScHeaderMobileMenu,
    ScHeaderMobileMenuToggle,
    ScSeparator,
    SiMenuIcon,
    SiXIcon,
    ThemeMenu,
  ],
  template: `
    <header
      scHeader
      #header="scHeader"
      sticky
      aria-label="Sera"
      class="px-(--page-gutter) md:px-(--page-gutter)"
    >
      <a class="flex items-center" routerLink="/">
        <span
          class="bg-primary text-primary-foreground font-heading flex h-8 items-center px-3 text-lg tracking-wide uppercase"
          >Sera</span
        >
      </a>

      <nav scNavigationMenu aria-label="Main">
        <ul scNavigationMenuList>
          @for (page of pages; track page.path) {
            <li scNavigationMenuItem>
              <a
                scNavigationMenuLink
                [routerLink]="page.path"
                routerLinkActive
                #rla="routerLinkActive"
                [active]="rla.isActive"
              >
                {{ page.label }}
              </a>
            </li>
          }
        </ul>
      </nav>

      <div class="ms-auto flex items-center gap-2">
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

      <ng-template scHeaderMobileMenu>
        <nav aria-label="Main">
          @for (page of pages; track page.path) {
            <a
              scNavigationMenuLink
              [routerLink]="page.path"
              routerLinkActive
              #menuRla="routerLinkActive"
              [active]="menuRla.isActive"
            >
              {{ page.label }}
            </a>
          }
        </nav>
      </ng-template>
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
  private readonly pages = [
    { path: '/dashboard', label: 'Audience Analytics' },
    { path: '/articles', label: 'Article Directory' },
    { path: '/media', label: 'Media Library' },
  ];
}
