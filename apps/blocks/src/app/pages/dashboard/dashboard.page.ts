import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">Acme Inc</span>
                  <span class="text-sidebar-foreground/70 truncate text-xs">
                    Enterprise
                  </span>
                </div>
              </a>
            </li>
          </ul>
          <input scSidebarInput type="search" placeholder="Search..." />
        </div>

        <div scSidebarBody>
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Platform</div>
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
                    <svg siLayoutDashboardIcon class="size-4"></svg>
                    <span>Dashboard</span>
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
                    <svg siUsersIcon class="size-4"></svg>
                    <span>Users</span>
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
                    <svg siSettingsIcon class="size-4"></svg>
                    <span>Settings</span>
                  </a>
                  <button scSidebarMenuAction [showOnHover]="true">
                    <svg siEllipsisVerticalIcon class="size-4"></svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div scSidebarSeparator></div>

          <div scSidebarGroup>
            <div scSidebarGroupLabel>Projects</div>
            <button scSidebarGroupAction>
              <svg siPlusIcon class="size-4"></svg>
            </button>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siFileIcon class="size-4"></svg>
                    <span>Design Engineering</span>
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
                        <span>Overview</span>
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
                        <span>Components</span>
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
                        <span>Templates</span>
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
                    <svg siFileIcon class="size-4"></svg>
                    <span>Sales & Marketing</span>
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
                    <svg siFileIcon class="size-4"></svg>
                    <span>Travel</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div scSidebarSeparator></div>

          <div scSidebarGroup>
            <div scSidebarGroupLabel>Loading Example</div>
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
            <div scSidebarGroupLabel>Resources</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siBookIcon class="size-4"></svg>
                    <span>Documentation</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siCircleQuestionMarkIcon class="size-4"></svg>
                    <span>Help Center</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siMessageSquareIcon class="size-4"></svg>
                    <span>Feedback</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siSquarePenIcon class="size-4"></svg>
                    <span>Changelog</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div scSidebarSeparator></div>

          <div scSidebarGroup>
            <div scSidebarGroupLabel>Integrations</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siGithubIcon class="size-4"></svg>
                    <span>GitHub</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siMailIcon class="size-4"></svg>
                    <span>Email</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siPhoneIcon class="size-4"></svg>
                    <span>Slack</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siGlobeIcon class="size-4"></svg>
                    <span>Website</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siPlusIcon class="size-4"></svg>
                    <span>Jira</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siCloudIcon class="size-4"></svg>
                    <span>Cloud Storage</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div scSidebarSeparator></div>

          <div scSidebarGroup>
            <div scSidebarGroupLabel>Account</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siUserIcon class="size-4"></svg>
                    <span>Profile</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siLockIcon class="size-4"></svg>
                    <span>Security</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siBellIcon class="size-4"></svg>
                    <span>Notifications</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siCreditCardIcon class="size-4"></svg>
                    <span>Billing</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg siWalletIcon class="size-4"></svg>
                    <span>Subscription</span>
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
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">John Doe</span>
                  <span class="text-sidebar-foreground/70 truncate text-xs">
                    john&#64;example.com
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <button scSidebarRail></button>
      </div>

      <main scSidebarInset>
        <header
          class="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4"
        >
          <button scSidebarTrigger>
            <svg siPanelLeftIcon class="size-4"></svg>
            <span class="sr-only">Toggle Sidebar</span>
          </button>
          <div class="flex-1">
            <h1 class="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>

        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div
              class="bg-muted/50 flex aspect-video items-center justify-center rounded-xl"
            >
              <p class="text-muted-foreground">Chart 1</p>
            </div>
            <div
              class="bg-muted/50 flex aspect-video items-center justify-center rounded-xl"
            >
              <p class="text-muted-foreground">Chart 2</p>
            </div>
            <div
              class="bg-muted/50 flex aspect-video items-center justify-center rounded-xl"
            >
              <p class="text-muted-foreground">Chart 3</p>
            </div>
          </div>
          <div
            class="bg-muted/50 min-h-screen flex-1 rounded-xl p-8 md:min-h-min"
          >
            <div class="space-y-4">
              <h2 class="text-2xl font-bold">Welcome to the Sidebar Demo</h2>
              <p class="text-muted-foreground">
                This is a comprehensive sidebar component built with Angular. It
                features:
              </p>
              <ul class="text-muted-foreground list-inside list-disc space-y-2">
                <li>Collapsible sidebar with icon-only mode</li>
                <li>Keyboard shortcut (Cmd/Ctrl + B) to toggle</li>
                <li>Mobile-responsive with sheet drawer</li>
                <li>State persistence via cookies</li>
                <li>Multiple variants (sidebar, floating, inset)</li>
                <li>Nested menu items with submenus</li>
                <li>Group sections with labels</li>
              </ul>
              <div class="bg-card rounded-lg border p-4">
                <h3 class="mb-2 font-semibold">Try these features:</h3>
                <ol class="list-inside list-decimal space-y-1 text-sm">
                  <li>
                    Press Cmd+B (Mac) or Ctrl+B (Windows) to toggle the sidebar
                  </li>
                  <li>
                    Click the rail on the right edge of the sidebar to toggle
                  </li>
                  <li>
                    Resize your browser to see mobile mode with sheet drawer
                  </li>
                  <li>Refresh the page - your sidebar state is preserved!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPage {}
