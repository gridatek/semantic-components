import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
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
  SiBookOpenIcon,
  SiCircleAlertIcon,
  SiCircleUserRoundIcon,
  SiFileTextIcon,
  SiKeyRoundIcon,
  SiLayoutDashboardIcon,
  SiLogInIcon,
  SiNotebookPenIcon,
  SiShieldCheckIcon,
  SiSmileIcon,
  SiTableIcon,
  SiTicketIcon,
  SiUserPlusIcon,
  SiWrenchIcon,
} from '@semantic-icons/lucide-icons';
import { AppHeader } from './app-header';
import { NAV } from './nav';

/**
 * The app's frame: the sidebar (shadcndashboard's sections), the header and
 * the page; the attribution its license asks for in the footer.
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
    SiBookOpenIcon,
    SiCircleAlertIcon,
    SiCircleUserRoundIcon,
    SiFileTextIcon,
    SiKeyRoundIcon,
    SiLayoutDashboardIcon,
    SiLogInIcon,
    SiNotebookPenIcon,
    SiShieldCheckIcon,
    SiSmileIcon,
    SiTableIcon,
    SiTicketIcon,
    SiUserPlusIcon,
    SiWrenchIcon,
    AppHeader,
  ],
  template: `
    <div scSidebarProvider class="min-h-svh">
      <aside scSidebar collapsible="icon" aria-label="Sidebar">
        <div scSidebarHeader>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton size="lg" routerLink="/">
                <span
                  class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <svg siLayoutDashboardIcon></svg>
                </span>
                <span class="grid flex-1 text-start text-sm leading-tight">
                  <span class="truncate font-semibold">Dashboard</span>
                  <span class="text-sidebar-foreground/70 truncate text-xs">
                    Semantic Components
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
        <nav scSidebarContent aria-label="Main">
          @for (section of nav; track section.heading) {
            <div scSidebarGroup>
              <div scSidebarGroupLabel>{{ section.heading }}</div>
              <div scSidebarGroupContent>
                <ul scSidebarMenu>
                  @for (link of section.links; track link.url) {
                    <li scSidebarMenuItem>
                      <a
                        scSidebarMenuButton
                        [routerLink]="link.url"
                        routerLinkActive
                        [routerLinkActiveOptions]="{ exact: link.url === '/' }"
                        #rla="routerLinkActive"
                        [active]="rla.isActive && !link.children"
                      >
                        @switch (link.icon) {
                          @case ('dashboard') {
                            <svg siLayoutDashboardIcon></svg>
                          }
                          @case ('table') {
                            <svg siTableIcon></svg>
                          }
                          @case ('form') {
                            <svg siFileTextIcon></svg>
                          }
                          @case ('profile') {
                            <svg siCircleUserRoundIcon></svg>
                          }
                          @case ('notes') {
                            <svg siNotebookPenIcon></svg>
                          }
                          @case ('blog') {
                            <svg siBookOpenIcon></svg>
                          }
                          @case ('tickets') {
                            <svg siTicketIcon></svg>
                          }
                          @case ('icons') {
                            <svg siSmileIcon></svg>
                          }
                          @case ('error') {
                            <svg siCircleAlertIcon></svg>
                          }
                          @case ('login') {
                            <svg siLogInIcon></svg>
                          }
                          @case ('register') {
                            <svg siUserPlusIcon></svg>
                          }
                          @case ('forgot') {
                            <svg siKeyRoundIcon></svg>
                          }
                          @case ('two-steps') {
                            <svg siShieldCheckIcon></svg>
                          }
                          @case ('maintenance') {
                            <svg siWrenchIcon></svg>
                          }
                        }
                        <span>{{ link.label }}</span>
                      </a>
                      @if (link.children; as children) {
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
                      }
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </nav>
        <div scSidebarFooter>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton size="lg" routerLink="/pages/user-profile">
                <span scAvatar class="size-8 rounded-lg">
                  <img scAvatarImage src="images/profile/user-1.png" alt="" />
                  <span scAvatarFallback class="rounded-lg">MA</span>
                </span>
                <span class="grid flex-1 text-start text-sm leading-tight">
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
  protected readonly nav = NAV;
}
