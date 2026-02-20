import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
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
} from '@semantic-components/ui-lab';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  ],
  template: `
    <div scSidebarProvider class="min-h-svh">
      <div scSidebar side="left" variant="sidebar" collapsible="icon">
        <div scSidebarHeader>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton size="lg">
                <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                >
                  <svg
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
                      d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m-9-9 6-6m-6 6 6 6m-6-6h14"
                    />
                  </svg>
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">Acme Inc</span>
                  <span class="truncate text-xs text-sidebar-foreground/70">
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
                    <svg
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
                      <rect width="7" height="9" x="3" y="3" rx="1" />
                      <rect width="7" height="5" x="14" y="3" rx="1" />
                      <rect width="7" height="9" x="14" y="12" rx="1" />
                      <rect width="7" height="5" x="3" y="16" rx="1" />
                    </svg>
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
                    <svg
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
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
                    <svg
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
                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>Settings</span>
                  </a>
                  <button scSidebarMenuAction [showOnHover]="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div scSidebarSeparator></div>

          <div scSidebarGroup>
            <div scSidebarGroupLabel>Projects</div>
            <button scSidebarGroupAction>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </button>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                        d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                      />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    </svg>
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
                    <svg
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
                        d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                      />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    </svg>
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
                    <svg
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
                        d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                      />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    </svg>
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
                    <svg
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
                        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
                      />
                    </svg>
                    <span>Documentation</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                    <span>Help Center</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      />
                    </svg>
                    <span>Feedback</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                      <path d="M12 20h9" />
                      <path
                        d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"
                      />
                    </svg>
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
                    <svg
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
                        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"
                      />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>Email</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      />
                    </svg>
                    <span>Slack</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" x2="22" y1="12" y2="12" />
                      <path
                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                      />
                    </svg>
                    <span>Website</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                    <span>Jira</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                      />
                    </svg>
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
                    <svg
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Profile</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Security</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                    <span>Notifications</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    <span>Billing</span>
                  </a>
                </li>
                <li scSidebarMenuItem>
                  <a scSidebarMenuButton>
                    <svg
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
                      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                    </svg>
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
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground"
                >
                  <svg
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
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">John Doe</span>
                  <span class="truncate text-xs text-sidebar-foreground/70">
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
          class="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4"
        >
          <button scSidebarTrigger>
            <svg
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
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
            <span class="sr-only">Toggle Sidebar</span>
          </button>
          <div class="flex-1">
            <h1 class="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>

        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div
              class="aspect-video rounded-xl bg-muted/50 flex items-center justify-center"
            >
              <p class="text-muted-foreground">Chart 1</p>
            </div>
            <div
              class="aspect-video rounded-xl bg-muted/50 flex items-center justify-center"
            >
              <p class="text-muted-foreground">Chart 2</p>
            </div>
            <div
              class="aspect-video rounded-xl bg-muted/50 flex items-center justify-center"
            >
              <p class="text-muted-foreground">Chart 3</p>
            </div>
          </div>
          <div
            class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-8"
          >
            <div class="space-y-4">
              <h2 class="text-2xl font-bold">Welcome to the Sidebar Demo</h2>
              <p class="text-muted-foreground">
                This is a comprehensive sidebar component built with Angular. It
                features:
              </p>
              <ul class="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Collapsible sidebar with icon-only mode</li>
                <li>Keyboard shortcut (Cmd/Ctrl + B) to toggle</li>
                <li>Mobile-responsive with sheet drawer</li>
                <li>State persistence via cookies</li>
                <li>Multiple variants (sidebar, floating, inset)</li>
                <li>Nested menu items with submenus</li>
                <li>Group sections with labels</li>
              </ul>
              <div class="rounded-lg border p-4 bg-card">
                <h3 class="font-semibold mb-2">Try these features:</h3>
                <ol class="list-decimal list-inside space-y-1 text-sm">
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
