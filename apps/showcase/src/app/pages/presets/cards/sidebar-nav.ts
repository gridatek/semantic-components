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
  ScSidebarSeparator,
} from '@semantic-components/ui';
import {
  SiActivityIcon,
  SiArrowLeftRightIcon,
  SiBellIcon,
  SiBookOpenIcon,
  SiBuilding2Icon,
  SiChartPieIcon,
  SiCircleQuestionMarkIcon,
  SiCreditCardIcon,
  SiFileChartColumnIcon,
  SiFileTextIcon,
  SiLayoutDashboardIcon,
  SiMessageSquareIcon,
  SiPaintbrushIcon,
  SiShieldIcon,
  SiTargetIcon,
  SiTrendingUpIcon,
  SiUserIcon,
  SiWalletIcon,
} from '@semantic-icons/lucide-icons';

interface ScNavGroup {
  label: string;
  items: { icon: string; label: string; active?: boolean }[];
}

/** Two cards, each a sidebar of two groups (collapsible none, no app shell). */
@Component({
  selector: 'app-preview-sidebar-nav',
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
    ScSidebarSeparator,
    SiActivityIcon,
    SiArrowLeftRightIcon,
    SiBellIcon,
    SiBookOpenIcon,
    SiBuilding2Icon,
    SiChartPieIcon,
    SiCircleQuestionMarkIcon,
    SiCreditCardIcon,
    SiFileChartColumnIcon,
    SiFileTextIcon,
    SiLayoutDashboardIcon,
    SiMessageSquareIcon,
    SiPaintbrushIcon,
    SiShieldIcon,
    SiTargetIcon,
    SiTrendingUpIcon,
    SiUserIcon,
    SiWalletIcon,
  ],
  template: `
    <div class="grid grid-cols-2 items-start gap-6">
      @for (card of cards; track $index) {
        <div scCard class="overflow-hidden py-0">
          <div scSidebarProvider [storageKey]="null" class="min-h-0">
            <div scSidebar collapsible="none" class="w-full bg-transparent">
              <div scSidebarContent class="gap-0">
                @for (group of card; track group.label; let first = $first) {
                  @if (!first) {
                    <div scSidebarSeparator class="w-auto"></div>
                  }
                  <div scSidebarGroup [class]="first ? 'pb-1' : 'pt-1'">
                    <div scSidebarGroupLabel>{{ group.label }}</div>
                    <div scSidebarGroupContent>
                      <ul scSidebarMenu>
                        @for (item of group.items; track item.label) {
                          <li scSidebarMenuItem>
                            <button
                              scSidebarMenuButton
                              [active]="!!item.active"
                            >
                              @switch (item.icon) {
                                @case ('dashboard') {
                                  <svg siLayoutDashboardIcon></svg>
                                }
                                @case ('transactions') {
                                  <svg siArrowLeftRightIcon></svg>
                                }
                                @case ('investments') {
                                  <svg siTrendingUpIcon></svg>
                                }
                                @case ('accounts') {
                                  <svg siBuilding2Icon></svg>
                                }
                                @case ('spending') {
                                  <svg siChartPieIcon></svg>
                                }
                                @case ('goals') {
                                  <svg siTargetIcon></svg>
                                }
                                @case ('budget') {
                                  <svg siWalletIcon></svg>
                                }
                                @case ('reports') {
                                  <svg siFileChartColumnIcon></svg>
                                }
                                @case ('documents') {
                                  <svg siFileTextIcon></svg>
                                }
                                @case ('profile') {
                                  <svg siUserIcon></svg>
                                }
                                @case ('billing') {
                                  <svg siCreditCardIcon></svg>
                                }
                                @case ('notifications') {
                                  <svg siBellIcon></svg>
                                }
                                @case ('security') {
                                  <svg siShieldIcon></svg>
                                }
                                @case ('appearance') {
                                  <svg siPaintbrushIcon></svg>
                                }
                                @case ('help') {
                                  <svg siCircleQuestionMarkIcon></svg>
                                }
                                @case ('contact') {
                                  <svg siMessageSquareIcon></svg>
                                }
                                @case ('docs') {
                                  <svg siBookOpenIcon></svg>
                                }
                                @default {
                                  <svg siActivityIcon></svg>
                                }
                              }
                              <span>{{ item.label }}</span>
                            </button>
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewSidebarNav {
  protected readonly cards: ScNavGroup[][] = [
    [
      {
        label: 'Overview',
        items: [
          { icon: 'dashboard', label: 'Dashboard', active: true },
          { icon: 'transactions', label: 'Transactions' },
          { icon: 'investments', label: 'Investments' },
          { icon: 'accounts', label: 'Accounts' },
          { icon: 'spending', label: 'Spending' },
        ],
      },
      {
        label: 'Planning',
        items: [
          { icon: 'goals', label: 'Goals' },
          { icon: 'budget', label: 'Budget' },
          { icon: 'reports', label: 'Reports' },
          { icon: 'documents', label: 'Documents' },
        ],
      },
    ],
    [
      {
        label: 'Account',
        items: [
          { icon: 'profile', label: 'Profile' },
          { icon: 'billing', label: 'Billing', active: true },
          { icon: 'notifications', label: 'Notifications' },
          { icon: 'security', label: 'Security' },
          { icon: 'appearance', label: 'Appearance' },
        ],
      },
      {
        label: 'Support',
        items: [
          { icon: 'help', label: 'Help Center' },
          { icon: 'contact', label: 'Contact Us' },
          { icon: 'docs', label: 'Documentation' },
          { icon: 'status', label: 'Status' },
        ],
      },
    ],
  ];
}
