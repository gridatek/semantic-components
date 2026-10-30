import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ScLink,
  ScNavbar,
  ScNavbarActions,
  ScNavbarBrand,
  ScNavbarMenu,
  ScNavbarMenuLink,
  ScNavbarNav,
  ScNavbarToggle,
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuTrigger,
  ScNavigationMenuTriggerIcon,
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  cn,
} from '@semantic-components/ui';
import { ScI18n } from '@semantic-components/ui/i18n';
import {
  SiCheckIcon,
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
    ScSelect,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiLanguagesIcon,
    ScNavbar,
    ScNavbarActions,
    ScNavbarBrand,
    ScNavbarMenu,
    ScNavbarMenuLink,
    ScNavbarNav,
    ScNavbarToggle,
    ScLink,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuTrigger,
    SiMenuIcon,
    SiXIcon,
    SiMountainIcon,
    SiChevronDownIcon,
    ScNavigationMenuTriggerIcon,
  ],
  template: `
    <header scNavbar #navbar="scNavbar">
      <a scNavbarBrand routerLink="/">
        <svg siMountainIcon></svg>
        <span>Brand</span>
      </a>

      <nav
        scNavigationMenu
        scNavbarNav
        aria-label="Main"
        i18n-aria-label="@@navbar.main"
      >
        <ul scNavigationMenuList>
          <li scNavigationMenuItem>
            <button scNavigationMenuTrigger>
              <ng-container i18n="@@navbar.pages">Pages</ng-container>
              <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
            </button>
            <div scNavigationMenuContent>
              <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <li>
                  <a
                    scNavigationMenuLink
                    class="flex-col items-start gap-1"
                    routerLink="/dashboard"
                  >
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
                  <a
                    scNavigationMenuLink
                    class="flex-col items-start gap-1"
                    routerLink="/settings"
                  >
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
                  <a
                    scNavigationMenuLink
                    class="flex-col items-start gap-1"
                    routerLink="/gallery"
                  >
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
                  <a
                    scNavigationMenuLink
                    class="flex-col items-start gap-1"
                    routerLink="/data-table"
                  >
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
                <li>
                  <a
                    scNavigationMenuLink
                    class="flex-col items-start gap-1"
                    routerLink="/chat"
                  >
                    <div
                      class="text-sm leading-none font-medium"
                      i18n="@@navbar.chat"
                    >
                      Chat
                    </div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                      i18n="@@navbar.chat.description"
                    >
                      An assistant's steps and streamed replies
                    </p>
                  </a>
                </li>
              </ul>
            </div>
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

      <div scNavbarActions>
        <div
          scSelect
          [value]="i18n.locale.id"
          (valueChange)="i18n.setLocale($event)"
        >
          <div
            scSelectTrigger
            class="w-32"
            aria-label="Language"
            i18n-aria-label="@@navbar.language"
          >
            <svg siLanguagesIcon></svg>
            <span scSelectValue [attr.lang]="i18n.locale.id">
              {{ i18n.locale.label }}
            </span>
            <svg scSelectIcon siChevronDownIcon></svg>
          </div>
          <ng-template scSelectPortal>
            <div scSelectPopup>
              <div scSelectList>
                @for (locale of i18n.locales; track locale.id) {
                  <div
                    scSelectItem
                    [value]="locale.id"
                    [label]="locale.label"
                    [attr.lang]="locale.id"
                  >
                    <span scSelectItemText>{{ locale.label }}</span>
                    <span scSelectItemIndicator><svg siCheckIcon></svg></span>
                  </div>
                }
              </div>
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
      </div>

      <button scNavbarToggle>
        @if (navbar.open()) {
          <svg siXIcon></svg>
          <span class="sr-only" i18n="@@navbar.closeMenu">Close menu</span>
        } @else {
          <svg siMenuIcon></svg>
          <span class="sr-only" i18n="@@navbar.openMenu">Open menu</span>
        }
      </button>

      <div scNavbarMenu>
        <nav aria-label="Main" i18n-aria-label="@@navbar.main">
          <a
            scNavbarMenuLink
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
            scNavbarMenuLink
            routerLink="/pricing"
            routerLinkActive="active"
            #mobilePricingRla="routerLinkActive"
            [active]="mobilePricingRla.isActive"
            i18n="@@navbar.pricing"
          >
            Pricing
          </a>
          <a
            scNavbarMenuLink
            routerLink="/blog"
            routerLinkActive="active"
            #mobileBlogRla="routerLinkActive"
            [active]="mobileBlogRla.isActive"
            i18n="@@navbar.blog"
          >
            Blog
          </a>
          <a
            scNavbarMenuLink
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
            scNavbarMenuLink
            routerLink="/dashboard"
            routerLinkActive="active"
            #mobileDashboardRla="routerLinkActive"
            [active]="mobileDashboardRla.isActive"
            i18n="@@navbar.dashboard"
          >
            Dashboard
          </a>
          <a
            scNavbarMenuLink
            routerLink="/settings"
            routerLinkActive="active"
            #mobileSettingsRla="routerLinkActive"
            [active]="mobileSettingsRla.isActive"
            i18n="@@navbar.settings"
          >
            Settings
          </a>
          <a
            scNavbarMenuLink
            routerLink="/gallery"
            routerLinkActive="active"
            #mobileGalleryRla="routerLinkActive"
            [active]="mobileGalleryRla.isActive"
            i18n="@@navbar.gallery"
          >
            Gallery
          </a>
          <a
            scNavbarMenuLink
            routerLink="/data-table"
            routerLinkActive="active"
            #mobileDataTableRla="routerLinkActive"
            [active]="mobileDataTableRla.isActive"
            i18n="@@navbar.dataTable"
          >
            Data Table
          </a>
          <a
            scNavbarMenuLink
            routerLink="/chat"
            routerLinkActive="active"
            #mobileChatRla="routerLinkActive"
            [active]="mobileChatRla.isActive"
            i18n="@@navbar.chat"
          >
            Chat
          </a>
        </nav>
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
    </header>
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
