import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ScButton,
  ScLink,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
  ScNavbar,
  ScNavbarActions,
  ScNavbarBrand,
  ScNavbarGroup,
  ScNavbarMobileLink,
  ScNavbarMobileMenu,
  ScNavbarMobilePortal,
  ScNavbarMobileTrigger,
  ScNavbarProvider,
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuPortal,
  ScNavigationMenuTrigger,
  ScNavigationMenuTriggerIcon,
  cn,
} from '@semantic-components/ui';
import { ScI18n } from '@semantic-components/ui/i18n';
import {
  SiChevronDownIcon,
  SiLanguagesIcon,
  SiMenuIcon,
  SiMountainIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiLanguagesIcon,
    ScNavbar,
    ScNavbarProvider,
    ScNavbarBrand,
    ScNavbarGroup,
    ScNavbarActions,
    ScNavbarMobileTrigger,
    ScNavbarMobilePortal,
    ScNavbarMobileMenu,
    ScNavbarMobileLink,
    ScLink,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuPortal,
    ScNavigationMenuTrigger,
    SiMenuIcon,
    SiXIcon,
    SiMountainIcon,
    SiChevronDownIcon,
    ScNavigationMenuTriggerIcon,
  ],
  template: `
    <div scNavbarProvider>
      <nav scNavbar>
        <div scNavbarGroup>
          <a scNavbarBrand routerLink="/">
            <svg siMountainIcon></svg>
            <span>Brand</span>
          </a>

          <nav scNavigationMenu class="hidden md:flex">
            <ul scNavigationMenuList>
              <li scNavigationMenuItem>
                <button scNavigationMenuTrigger>
                  <ng-container i18n="@@navbar.pages">Pages</ng-container>
                  <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
                </button>
                <ng-template scNavigationMenuPortal>
                  <div scNavigationMenuContent>
                    <ul
                      class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2"
                    >
                      <li>
                        <a scNavigationMenuLink routerLink="/dashboard">
                          <div
                            class="text-sm leading-none font-medium"
                            i18n="@@navbar.dashboard"
                          >
                            Dashboard
                          </div>
                          <p
                            class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                            i18n="@@navbar.dashboard.description"
                          >
                            Sidebar layout with navigation
                          </p>
                        </a>
                      </li>
                      <li>
                        <a scNavigationMenuLink routerLink="/settings">
                          <div
                            class="text-sm leading-none font-medium"
                            i18n="@@navbar.settings"
                          >
                            Settings
                          </div>
                          <p
                            class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                            i18n="@@navbar.settings.description"
                          >
                            Account and profile management
                          </p>
                        </a>
                      </li>
                      <li>
                        <a scNavigationMenuLink routerLink="/gallery">
                          <div
                            class="text-sm leading-none font-medium"
                            i18n="@@navbar.gallery"
                          >
                            Gallery
                          </div>
                          <p
                            class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                            i18n="@@navbar.gallery.description"
                          >
                            Component showcase reference
                          </p>
                        </a>
                      </li>
                      <li>
                        <a scNavigationMenuLink routerLink="/data-table">
                          <div
                            class="text-sm leading-none font-medium"
                            i18n="@@navbar.dataTable"
                          >
                            Data Table
                          </div>
                          <p
                            class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                            i18n="@@navbar.dataTable.description"
                          >
                            Advanced table with sorting and filtering
                          </p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </ng-template>
              </li>

              <li scNavigationMenuItem>
                <a
                  scNavigationMenuLink
                  routerLink="/pricing"
                  i18n="@@navbar.pricing"
                >
                  Pricing
                </a>
              </li>

              <li scNavigationMenuItem>
                <a scNavigationMenuLink routerLink="/blog" i18n="@@navbar.blog">
                  Blog
                </a>
              </li>

              <li scNavigationMenuItem>
                <a
                  scNavigationMenuLink
                  routerLink="/contact"
                  i18n="@@navbar.contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div scNavbarActions>
          <div scMenuProvider align="end">
            <button scButton scMenuTrigger variant="ghost" size="sm">
              <svg siLanguagesIcon></svg>
              <span class="sr-only" i18n="@@navbar.language">Language</span>
              <span [attr.lang]="i18n.locale.id">{{ i18n.locale.label }}</span>
            </button>
            <ng-template scMenuPortal>
              <div scMenu (itemSelected)="i18n.setLocale($event)">
                <ng-template scMenuContent>
                  @for (locale of i18n.locales; track locale.id) {
                    <div scMenuItem [value]="locale.id" [attr.lang]="locale.id">
                      {{ locale.label }}
                    </div>
                  }
                </ng-template>
              </div>
            </ng-template>
          </div>
          <a
            scLink
            variant="ghost"
            routerLink="/login"
            class="hidden md:inline-flex"
            i18n="@@navbar.signIn"
          >
            Sign In
          </a>
          <a
            scLink
            routerLink="/signup"
            class="hidden md:inline-flex"
            i18n="@@navbar.getStarted"
          >
            Get Started
          </a>
          <button scNavbarMobileTrigger #trigger="scNavbarMobileTrigger">
            @if (trigger.isMobileMenuOpen()) {
              <svg siXIcon></svg>
            } @else {
              <svg siMenuIcon></svg>
            }
            @if (trigger.isMobileMenuOpen()) {
              <span class="sr-only" i18n="@@navbar.closeMenu">Close menu</span>
            } @else {
              <span class="sr-only" i18n="@@navbar.openMenu">Open menu</span>
            }
          </button>
        </div>
      </nav>

      <ng-template scNavbarMobilePortal>
        <div
          scNavbarMobileMenu
          aria-label="Mobile navigation"
          i18n-aria-label="@@navbar.mobileNavigation"
        >
          <a
            scNavbarMobileLink
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            #mobileHomeRla="routerLinkActive"
            [active]="mobileHomeRla.isActive"
            i18n="@@navbar.home"
          >
            Home
          </a>
          <a
            scNavbarMobileLink
            routerLink="/pricing"
            routerLinkActive="active"
            #mobilePricingRla="routerLinkActive"
            [active]="mobilePricingRla.isActive"
            i18n="@@navbar.pricing"
          >
            Pricing
          </a>
          <a
            scNavbarMobileLink
            routerLink="/blog"
            routerLinkActive="active"
            #mobileBlogRla="routerLinkActive"
            [active]="mobileBlogRla.isActive"
            i18n="@@navbar.blog"
          >
            Blog
          </a>
          <a
            scNavbarMobileLink
            routerLink="/contact"
            routerLinkActive="active"
            #mobileContactRla="routerLinkActive"
            [active]="mobileContactRla.isActive"
            i18n="@@navbar.contact"
          >
            Contact
          </a>
          <hr class="border-border my-2" />
          <a
            scNavbarMobileLink
            routerLink="/dashboard"
            routerLinkActive="active"
            #mobileDashboardRla="routerLinkActive"
            [active]="mobileDashboardRla.isActive"
            i18n="@@navbar.dashboard"
          >
            Dashboard
          </a>
          <a
            scNavbarMobileLink
            routerLink="/settings"
            routerLinkActive="active"
            #mobileSettingsRla="routerLinkActive"
            [active]="mobileSettingsRla.isActive"
            i18n="@@navbar.settings"
          >
            Settings
          </a>
          <a
            scNavbarMobileLink
            routerLink="/gallery"
            routerLinkActive="active"
            #mobileGalleryRla="routerLinkActive"
            [active]="mobileGalleryRla.isActive"
            i18n="@@navbar.gallery"
          >
            Gallery
          </a>
          <a
            scNavbarMobileLink
            routerLink="/data-table"
            routerLinkActive="active"
            #mobileDataTableRla="routerLinkActive"
            [active]="mobileDataTableRla.isActive"
            i18n="@@navbar.dataTable"
          >
            Data Table
          </a>
          <hr class="border-border my-2" />
          <a
            scLink
            variant="ghost"
            routerLink="/login"
            class="w-full"
            i18n="@@navbar.signIn"
          >
            Sign In
          </a>
          <a
            scLink
            routerLink="/signup"
            class="w-full"
            i18n="@@navbar.getStarted"
          >
            Get Started
          </a>
        </div>
      </ng-template>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class Navbar {
  protected readonly i18n = inject(ScI18n);
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
