import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ScSidebar,
  ScSidebarBody,
  ScSidebarFooter,
  ScSidebarGroup,
  ScSidebarGroupAction,
  ScSidebarGroupContent,
  ScSidebarGroupLabel,
  ScSidebarHeader,
  ScSidebarInput,
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuAction,
  ScSidebarMenuBadge,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarMenuSkeleton,
  ScSidebarMenuSub,
  ScSidebarMenuSubButton,
  ScSidebarMenuSubItem,
  ScSidebarProvider,
  ScSidebarRail,
  ScSidebarSeparator,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import {
  SiBellIcon,
  SiBookIcon,
  SiCircleQuestionMarkIcon,
  SiCloudIcon,
  SiCreditCardIcon,
  SiEllipsisVerticalIcon,
  SiFileIcon,
  SiGithubIcon,
  SiGlobeIcon,
  SiLayoutDashboardIcon,
  SiLockIcon,
  SiLogInIcon,
  SiMailIcon,
  SiMessageSquareIcon,
  SiPanelLeftIcon,
  SiPhoneIcon,
  SiPlusIcon,
  SiSettingsIcon,
  SiSquarePenIcon,
  SiUserIcon,
  SiUsersIcon,
  SiWalletIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-dashboard',
  imports: [
    ScSidebarProvider,
    ScSidebar,
    ScSidebarTrigger,
    ScSidebarHeader,
    ScSidebarBody,
    ScSidebarFooter,
    ScSidebarMenu,
    ScSidebarMenuItem,
    ScSidebarMenuButton,
    ScSidebarMenuSub,
    ScSidebarMenuSubItem,
    ScSidebarMenuSubButton,
    ScSidebarInset,
    ScSidebarGroup,
    ScSidebarGroupLabel,
    ScSidebarGroupContent,
    ScSidebarGroupAction,
    ScSidebarRail,
    ScSidebarSeparator,
    ScSidebarInput,
    ScSidebarMenuAction,
    ScSidebarMenuBadge,
    ScSidebarMenuSkeleton,
    RouterLink,
    RouterLinkActive,
    SiBellIcon,
    SiBookIcon,
    SiCircleQuestionMarkIcon,
    SiCloudIcon,
    SiCreditCardIcon,
    SiEllipsisVerticalIcon,
    SiFileIcon,
    SiGithubIcon,
    SiGlobeIcon,
    SiLayoutDashboardIcon,
    SiLockIcon,
    SiLogInIcon,
    SiMailIcon,
    SiMessageSquareIcon,
    SiPanelLeftIcon,
    SiPhoneIcon,
    SiPlusIcon,
    SiSettingsIcon,
    SiSquarePenIcon,
    SiUserIcon,
    SiUsersIcon,
    SiWalletIcon,
  ],
  template: `
    <div scSidebarProvider class="min-h-svh">
      <div scSidebar side="left" variant="sidebar" collapsible="icon">
        <div scSidebarHeader>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton size="lg">
                <div
                  class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <svg siLogInIcon class="size-4"></svg>
                </div>
                <div class="grid flex-1 text-start text-sm leading-tight">
                  <span class="truncate font-semibold">Acme Inc</span>
                  <span
                    class="text-sidebar-foreground/70 truncate text-xs"
                    i18n="@@dashboard.plan"
                  >
                    Enterprise
                  </span>
                </div>
              </a>
            </li>
          </ul>
          <input
            scSidebarInput
            type="search"
            placeholder="Search..."
            i18n-placeholder="@@dashboard.searchPlaceholder"
          />
        </div>

        <div scSidebarBody>
          <div scSidebarGroup>
            <div scSidebarGroupLabel i18n="@@dashboard.group.platform">
              Platform
            </div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    routerLink="/dashboard"
                    routerLinkActive
                    #dashboardRla="routerLinkActive"
                    [isActive]="dashboardRla.isActive"
                  >
                    <svg siLayoutDashboardIcon></svg>
                    <span i18n="@@dashboard.dashboard">Dashboard</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    routerLink="/users"
                    routerLinkActive
                    #usersRla="routerLinkActive"
                    [isActive]="usersRla.isActive"
                  >
                    <svg siUsersIcon></svg>
                    <span i18n="@@dashboard.users">Users</span>
                  </a>
                  <div scSidebarMenuBadge>12</div>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    routerLink="/settings"
                    routerLinkActive
                    #settingsRla="routerLinkActive"
                    [isActive]="settingsRla.isActive"
                  >
                    <svg siSettingsIcon></svg>
                    <span i18n="@@dashboard.settings">Settings</span>
                  </a>
                  <button scSidebarMenuAction [showOnHover]="true">
                    <svg siEllipsisVerticalIcon></svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div scSidebarSeparator></div>

          <div scSidebarGroup>
            <div scSidebarGroupLabel i18n="@@dashboard.group.projects">
              Projects
            </div>
            <button scSidebarGroupAction>
              <svg siPlusIcon></svg>
            </button>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siFileIcon></svg>
                    <span i18n="@@dashboard.designEngineering"
                      >Design Engineering</span
                    >
                  </a>
                  <ul scSidebarMenuSub>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/projects/overview"
                        routerLinkActive
                        #overviewRla="routerLinkActive"
                        [isActive]="overviewRla.isActive"
                      >
                        <span i18n="@@dashboard.overview">Overview</span>
                      </a>
                    </li>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/projects/components"
                        routerLinkActive
                        #componentsRla="routerLinkActive"
                        [isActive]="componentsRla.isActive"
                      >
                        <span i18n="@@dashboard.components">Components</span>
                      </a>
                    </li>
                    <li scSidebarMenuSubItem>
                      <a
                        scSidebarMenuSubButton
                        routerLink="/projects/templates"
                        routerLinkActive
                        #templatesRla="routerLinkActive"
                        [isActive]="templatesRla.isActive"
                      >
                        <span i18n="@@dashboard.templates">Templates</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    routerLink="/projects/sales"
                    routerLinkActive
                    #salesRla="routerLinkActive"
                    [isActive]="salesRla.isActive"
                  >
                    <svg siFileIcon></svg>
                    <span i18n="@@dashboard.sales">Sales & Marketing</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a
                    scSidebarMenuButton
                    routerLink="/projects/travel"
                    routerLinkActive
                    #travelRla="routerLinkActive"
                    [isActive]="travelRla.isActive"
                  >
                    <svg siFileIcon></svg>
                    <span i18n="@@dashboard.travel">Travel</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div scSidebarSeparator></div>

          <div scSidebarGroup>
            <div scSidebarGroupLabel i18n="@@dashboard.loading">
              Loading Example
            </div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <div scSidebarMenuSkeleton [showIcon]="true"></div>
                </li>
                <li scSidebarMenuItem>
                  <div scSidebarMenuSkeleton [showIcon]="true"></div>
                </li>
                <li scSidebarMenuItem>
                  <div scSidebarMenuSkeleton></div>
                </li>
              </ul>
            </div>
          </div>

          <div scSidebarSeparator></div>

          <div scSidebarGroup>
            <div scSidebarGroupLabel i18n="@@dashboard.group.resources">
              Resources
            </div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siBookIcon></svg>
                    <span i18n="@@dashboard.documentation">Documentation</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siCircleQuestionMarkIcon></svg>
                    <span i18n="@@dashboard.helpCenter">Help Center</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siMessageSquareIcon></svg>
                    <span i18n="@@dashboard.feedback">Feedback</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siSquarePenIcon></svg>
                    <span i18n="@@dashboard.changelog">Changelog</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div scSidebarSeparator></div>

          <div scSidebarGroup>
            <div scSidebarGroupLabel i18n="@@dashboard.group.integrations">
              Integrations
            </div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siGithubIcon></svg>
                    <span>GitHub</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siMailIcon></svg>
                    <span i18n="@@dashboard.email">Email</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siPhoneIcon></svg>
                    <span>Slack</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siGlobeIcon></svg>
                    <span i18n="@@dashboard.website">Website</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siPlusIcon></svg>
                    <span>Jira</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siCloudIcon></svg>
                    <span i18n="@@dashboard.cloudStorage">Cloud Storage</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div scSidebarSeparator></div>

          <div scSidebarGroup>
            <div scSidebarGroupLabel i18n="@@dashboard.group.account">
              Account
            </div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siUserIcon></svg>
                    <span i18n="@@dashboard.profile">Profile</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siLockIcon></svg>
                    <span i18n="@@dashboard.security">Security</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siBellIcon></svg>
                    <span i18n="@@dashboard.notifications">Notifications</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siCreditCardIcon></svg>
                    <span i18n="@@dashboard.billing">Billing</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siWalletIcon></svg>
                    <span i18n="@@dashboard.subscription">Subscription</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div scSidebarFooter>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton size="lg">
                <div
                  class="bg-sidebar-accent text-sidebar-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <svg siUserIcon class="size-4"></svg>
                </div>
                <div class="grid flex-1 text-start text-sm leading-tight">
                  <span class="truncate font-semibold">John Doe</span>
                  <span class="text-sidebar-foreground/70 truncate text-xs">
                    john&#64;example.com
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <button scSidebarRail>
          <span class="sr-only" i18n="@@dashboard.toggleSidebar"
            >Toggle Sidebar</span
          >
        </button>
      </div>

      <main scSidebarInset>
        <header
          class="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4"
        >
          <button scSidebarTrigger>
            <svg siPanelLeftIcon></svg>
            <span class="sr-only" i18n="@@dashboard.toggleSidebar"
              >Toggle Sidebar</span
            >
          </button>
          <div class="flex-1">
            <h1 class="text-lg font-semibold" i18n="@@dashboard.dashboard.2">
              Dashboard
            </h1>
          </div>
        </header>

        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div
              class="bg-muted/50 flex aspect-video items-center justify-center rounded-xl"
            >
              <p class="text-muted-foreground" i18n="@@dashboard.chart1">
                Chart 1
              </p>
            </div>
            <div
              class="bg-muted/50 flex aspect-video items-center justify-center rounded-xl"
            >
              <p class="text-muted-foreground" i18n="@@dashboard.chart2">
                Chart 2
              </p>
            </div>
            <div
              class="bg-muted/50 flex aspect-video items-center justify-center rounded-xl"
            >
              <p class="text-muted-foreground" i18n="@@dashboard.chart3">
                Chart 3
              </p>
            </div>
          </div>
          <div
            class="bg-muted/50 min-h-screen flex-1 rounded-xl p-8 md:min-h-min"
          >
            <div class="space-y-4">
              <h2 class="text-2xl font-bold" i18n="@@dashboard.welcome">
                Welcome to the Sidebar Demo
              </h2>
              <p class="text-muted-foreground" i18n="@@dashboard.intro">
                This is a comprehensive sidebar component built with Angular. It
                features:
              </p>
              <ul class="text-muted-foreground list-inside list-disc space-y-2">
                <li i18n="@@dashboard.feature.collapsible">
                  Collapsible sidebar with icon-only mode
                </li>
                <li i18n="@@dashboard.feature.shortcut">
                  Keyboard shortcut (Cmd/Ctrl + B) to toggle
                </li>
                <li i18n="@@dashboard.feature.mobile">
                  Mobile-responsive with sheet drawer
                </li>
                <li i18n="@@dashboard.feature.persistence">
                  State persistence via cookies
                </li>
                <li i18n="@@dashboard.feature.variants">
                  Multiple variants (sidebar, floating, inset)
                </li>
                <li i18n="@@dashboard.feature.nested">
                  Nested menu items with submenus
                </li>
                <li i18n="@@dashboard.feature.groups">
                  Group sections with labels
                </li>
              </ul>
              <div class="bg-card rounded-lg border p-4">
                <h3 class="mb-2 font-semibold" i18n="@@dashboard.try">
                  Try these features:
                </h3>
                <ol class="list-inside list-decimal space-y-1 text-sm">
                  <li i18n="@@dashboard.try.shortcut">
                    Press Cmd+B (Mac) or Ctrl+B (Windows) to toggle the sidebar
                  </li>
                  <li i18n="@@dashboard.try.rail">
                    Click the rail on the right edge of the sidebar to toggle
                  </li>
                  <li i18n="@@dashboard.try.resize">
                    Resize your browser to see mobile mode with sheet drawer
                  </li>
                  <li i18n="@@dashboard.try.refresh">
                    Refresh the page - your sidebar state is preserved!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class DashboardPage {}
