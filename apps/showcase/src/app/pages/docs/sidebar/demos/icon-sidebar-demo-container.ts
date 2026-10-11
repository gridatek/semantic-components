import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-icon-sidebar-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Collapse to Icons"
      demoUrl="/demos/sidebar/icon-sidebar-demo"
      framed
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconSidebarDemoContainer {
  readonly code = `﻿import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSidebar,
  ScSidebarBody,
  ScSidebarGroup,
  ScSidebarGroupContent,
  ScSidebarGroupLabel,
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarProvider,
  ScSidebarRail,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import {
  SiChartBarIcon,
  SiFolderIcon,
  SiLayoutDashboardIcon,
  SiPanelLeftIcon,
  SiSettingsIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-icon-sidebar-demo',
  imports: [
    ScSidebar,
    ScSidebarBody,
    ScSidebarGroup,
    ScSidebarGroupContent,
    ScSidebarGroupLabel,
    ScSidebarInset,
    ScSidebarMenu,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarProvider,
    ScSidebarRail,
    ScSidebarTrigger,
    SiChartBarIcon,
    SiFolderIcon,
    SiLayoutDashboardIcon,
    SiPanelLeftIcon,
    SiSettingsIcon,
    SiUsersIcon,
  ],
  template: \`
    <div scSidebarProvider [storageKey]="null">
      <div scSidebar variant="inset" collapsible="icon" aria-label="Workspace navigation">
        <div scSidebarBody>
          <div scSidebarGroup>
            <div scSidebarGroupLabel>Workspace</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                @for (item of items; track item.id) {
                  <li scSidebarMenuItem>
                    <button
                      scSidebarMenuButton
                      [tooltip]="item.label"
                      [isActive]="active() === item.id"
                      (click)="active.set(item.id)"
                    >
                      @switch (item.id) {
                        @case ('dashboard') {
                          <svg siLayoutDashboardIcon></svg>
                        }
                        @case ('projects') {
                          <svg siFolderIcon></svg>
                        }
                        @case ('team') {
                          <svg siUsersIcon></svg>
                        }
                        @case ('reports') {
                          <svg siChartBarIcon></svg>
                        }
                        @case ('settings') {
                          <svg siSettingsIcon></svg>
                        }
                      }
                      <span>{{ item.label }}</span>
                    </button>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
        <button scSidebarRail></button>
      </div>

      <main scSidebarInset aria-label="Icon example content">
        <header class="flex h-14 shrink-0 items-center gap-2 px-4">
          <button scSidebarTrigger aria-label="Toggle sidebar">
            <svg siPanelLeftIcon></svg>
          </button>
          <h2 class="text-sm font-medium">Collapse to icons</h2>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <p class="text-muted-foreground text-sm">
            Press the trigger, click the rail or use Ctrl/âŒ˜ + B. Collapsed
            items keep their names and show a tooltip.
          </p>
          <div class="bg-muted/50 min-h-64 flex-1 rounded-xl"></div>
        </div>
      </main>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class IconSidebarDemo {
  readonly items = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'team', label: 'Team' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
  ];

  readonly active = signal('dashboard');
}`;
}
