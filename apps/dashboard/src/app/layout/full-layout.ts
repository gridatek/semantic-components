import { Component, ViewEncapsulation, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
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
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiLayoutDashboardIcon,
} from '@semantic-icons/lucide-icons';
import { filter, map } from 'rxjs';
import { AppHeader } from './app-header';
import { NAV, type NavLink } from './nav';
import { SidebarIcon } from './nav-icon';

/**
 * The app's frame: the sidebar (shadcndashboard's sections, a group's pages
 * folded under it), the header and the page; the attribution its license
 * asks for in the footer.
 */
@Component({
  selector: 'app-full-layout',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
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
    SiChevronDownIcon,
    SiLayoutDashboardIcon,
    AppHeader,
    SidebarIcon,
  ],
  template: `
    <div scSidebarProvider class="min-h-svh">
      <aside i18n-aria-label scSidebar collapsible="icon" aria-label="Sidebar">
        <div scSidebarHeader>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton size="lg" routerLink="/">
                <span
                  class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <svg siLayoutDashboardIcon></svg>
                </span>
                <span i18n class="grid flex-1 text-start text-sm leading-tight">
                  <span class="truncate font-semibold">Dashboard</span>
                  <span class="text-sidebar-foreground/70 truncate text-xs">
                    Semantic Components
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
        <nav i18n-aria-label scSidebarContent aria-label="Main">
          @for (section of nav; track section.heading) {
            <div scSidebarGroup>
              <div scSidebarGroupLabel>{{ section.heading }}</div>
              <div scSidebarGroupContent>
                <ul scSidebarMenu>
                  @for (link of section.links; track link.label) {
                    @if (link.children; as children) {
                      <li
                        scSidebarMenuItem
                        scCollapsible
                        [open]="isOpen(link, url())"
                      >
                        <button scSidebarMenuButton scCollapsibleTrigger>
                          <app-nav-icon [name]="link.icon" />
                          <span>{{ link.label }}</span>
                          <svg
                            siChevronDownIcon
                            class="ms-auto transition-transform in-aria-expanded:rotate-180"
                          ></svg>
                        </button>
                        <div scCollapsiblePanel>
                          <ul scSidebarMenuSub>
                            @for (child of children; track child.url) {
                              <li scSidebarMenuSubItem>
                                <a
                                  scSidebarMenuSubButton
                                  [routerLink]="child.url"
                                  routerLinkActive
                                  #childRla="routerLinkActive"
                                  [active]="childRla.isActive"
                                >
                                  <span>{{ child.label }}</span>
                                </a>
                              </li>
                            }
                          </ul>
                        </div>
                      </li>
                    } @else {
                      <li scSidebarMenuItem>
                        <a
                          scSidebarMenuButton
                          [routerLink]="link.url"
                          routerLinkActive
                          [routerLinkActiveOptions]="{
                            exact: link.url === '/',
                          }"
                          #rla="routerLinkActive"
                          [active]="rla.isActive"
                        >
                          <app-nav-icon [name]="link.icon" />
                          <span>{{ link.label }}</span>
                        </a>
                      </li>
                    }
                  }
                </ul>
              </div>
            </div>
          }
        </nav>
        <div scSidebarFooter>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a
                scSidebarMenuButton
                size="lg"
                routerLink="/apps/user-profile/profile"
              >
                <span scAvatar class="size-8 rounded-lg">
                  <img scAvatarImage src="images/profile/user-1.png" alt="" />
                  <span scAvatarFallback class="rounded-lg">MA</span>
                </span>
                <span i18n class="grid flex-1 text-start text-sm leading-tight">
                  <span class="truncate font-medium">Mathew Anderson</span>
                  <span class="text-sidebar-foreground/70 truncate text-xs">
                    mathew.anderson&#64;gmail.com
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
        <button scSidebarRail></button>
      </aside>
      <main scSidebarInset class="min-w-0">
        <app-header />
        <div class="flex flex-1 flex-col gap-4 p-4 md:p-6">
          <router-outlet />
        </div>
        <footer
          i18n
          class="text-muted-foreground border-t px-4 py-4 text-sm md:px-6"
        >
          Screens and data from
          <a
            class="text-foreground underline underline-offset-4"
            href="https://github.com/shadcndashboard/shadcndashboard"
            >shadcndashboard</a
          >
          (MIT). Components:
          <a
            class="text-foreground underline underline-offset-4"
            href="https://github.com/gridatek/semantic-components"
            >Semantic Components</a
          >.
        </footer>
      </main>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class FullLayout {
  private readonly router = inject(Router);
  private readonly nav = NAV;
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** A group is open on its own pages. */
  private isOpen(link: NavLink, url: string): boolean {
    const path = url.split(/[?#]/)[0];
    if (link.base && path.startsWith(link.base)) return true;
    return (link.children ?? []).some((child) => child.url === path);
  }
}
