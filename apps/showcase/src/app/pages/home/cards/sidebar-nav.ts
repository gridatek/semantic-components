import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScSidebar,
  ScSidebarContent,
  ScSidebarGroup,
  ScSidebarGroupContent,
  ScSidebarGroupLabel,
  ScSidebarMenu,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarProvider,
} from '@semantic-components/ui';
import {
  SiActivityIcon,
  SiArrowLeftRightIcon,
  SiBellIcon,
  SiBookOpenIcon,
  SiCalendarIcon,
  SiChartColumnIcon,
  SiChartLineIcon,
  SiChartPieIcon,
  SiCircleQuestionMarkIcon,
  SiCreditCardIcon,
  SiFileTextIcon,
  SiGlobeIcon,
  SiLandmarkIcon,
  SiMessageSquareIcon,
  SiPaletteIcon,
  SiShieldIcon,
  SiTargetIcon,
  SiTrendingUpIcon,
  SiUserIcon,
  SiWalletIcon,
} from '@semantic-icons/lucide-icons';

/** Four sidebar menus, each in a card: the Sidebar's parts outside an app shell (collapsible none). */
@Component({
  selector: 'app-home-sidebar-nav',
  imports: [
    ScCard,
    ScSidebar,
    ScSidebarContent,
    ScSidebarGroup,
    ScSidebarGroupContent,
    ScSidebarGroupLabel,
    ScSidebarMenu,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarProvider,
    SiChartLineIcon,
    SiArrowLeftRightIcon,
    SiTrendingUpIcon,
    SiLandmarkIcon,
    SiChartPieIcon,
    SiFileTextIcon,
    SiWalletIcon,
    SiChartColumnIcon,
    SiTargetIcon,
    SiCalendarIcon,
    SiCircleQuestionMarkIcon,
    SiBookOpenIcon,
    SiMessageSquareIcon,
    SiActivityIcon,
    SiGlobeIcon,
    SiUserIcon,
    SiCreditCardIcon,
    SiBellIcon,
    SiShieldIcon,
    SiPaletteIcon,
  ],
  template: `
    <div class="grid w-full grid-cols-2 gap-4 xl:gap-6">
      <div
        scCard
        class="w-full overflow-hidden py-0 xl:col-start-1 xl:row-start-2"
      >
        <div scSidebarProvider [storageKey]="null" class="min-h-0">
          <div scSidebar collapsible="none" class="w-full bg-transparent">
            <div scSidebarContent class="gap-0 overflow-hidden">
              <div scSidebarGroup>
                <div scSidebarGroupLabel>Overview</div>
                <div scSidebarGroupContent>
                  <ul scSidebarMenu class="gap-1">
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton [active]="true">
                        <svg siChartLineIcon></svg>
                        <span>Analytics</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siArrowLeftRightIcon></svg>
                        <span>Transactions</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siTrendingUpIcon></svg>
                        <span>Investments</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siLandmarkIcon></svg>
                        <span>Accounts</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siChartPieIcon></svg>
                        <span>Spending</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        scCard
        class="w-full overflow-hidden py-0 xl:col-start-1 xl:row-start-1"
      >
        <div scSidebarProvider [storageKey]="null" class="min-h-0">
          <div scSidebar collapsible="none" class="w-full bg-transparent">
            <div scSidebarContent class="gap-0 overflow-hidden">
              <div scSidebarGroup>
                <div scSidebarGroupLabel>Planning</div>
                <div scSidebarGroupContent>
                  <ul scSidebarMenu class="gap-1">
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siFileTextIcon></svg>
                        <span>Documents</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siWalletIcon></svg>
                        <span>Budget</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siChartColumnIcon></svg>
                        <span>Reports</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siTargetIcon></svg>
                        <span>Goals</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siCalendarIcon></svg>
                        <span>Calendar</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        scCard
        class="w-full overflow-hidden py-0 xl:col-start-2 xl:row-start-1"
      >
        <div scSidebarProvider [storageKey]="null" class="min-h-0">
          <div scSidebar collapsible="none" class="w-full bg-transparent">
            <div scSidebarContent class="gap-0 overflow-hidden">
              <div scSidebarGroup>
                <div scSidebarGroupLabel>Support</div>
                <div scSidebarGroupContent>
                  <ul scSidebarMenu class="gap-1">
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siCircleQuestionMarkIcon></svg>
                        <span>Help Center</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siBookOpenIcon></svg>
                        <span>Docs</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siMessageSquareIcon></svg>
                        <span>Contact Us</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siActivityIcon></svg>
                        <span>Status</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siGlobeIcon></svg>
                        <span>Community</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        scCard
        class="w-full overflow-hidden py-0 xl:col-start-2 xl:row-start-2"
      >
        <div scSidebarProvider [storageKey]="null" class="min-h-0">
          <div scSidebar collapsible="none" class="w-full bg-transparent">
            <div scSidebarContent class="gap-0 overflow-hidden">
              <div scSidebarGroup>
                <div scSidebarGroupLabel>Account</div>
                <div scSidebarGroupContent>
                  <ul scSidebarMenu class="gap-1">
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siUserIcon></svg>
                        <span>Profile</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton [active]="true">
                        <svg siCreditCardIcon></svg>
                        <span>Billing</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siBellIcon></svg>
                        <span>Notifications</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siShieldIcon></svg>
                        <span>Security</span>
                      </button>
                    </li>
                    <li scSidebarMenuItem>
                      <button scSidebarMenuButton>
                        <svg siPaletteIcon></svg>
                        <span>Appearance</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HomeSidebarNav {}
