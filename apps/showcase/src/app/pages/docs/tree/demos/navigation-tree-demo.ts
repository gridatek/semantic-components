import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTree,
  ScTreeItem,
  ScTreeItemGroup,
  ScTreeItemIcon,
  ScTreeItemTrigger,
  ScTreeItemTriggerIcon,
} from '@semantic-components/ui';
import {
  SiBookOpenIcon,
  SiChevronRightIcon,
  SiHouseIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-navigation-tree-demo',
  imports: [
    ScTree,
    ScTreeItem,
    ScTreeItemTrigger,
    ScTreeItemTriggerIcon,
    ScTreeItemGroup,
    ScTreeItemIcon,
    SiChevronRightIcon,
    SiHouseIcon,
    SiBookOpenIcon,
    SiSettingsIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-4">
      <ul
        scTree
        nav
        [(value)]="current"
        aria-label="Documentation"
        class="rounded-lg border p-4"
      >
        <li scTreeItem value="getting-started" [expanded]="true">
          <div scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <svg scTreeItemIcon siHouseIcon></svg>
            <span>Getting Started</span>
          </div>
          <ul scTreeItemGroup>
            <li scTreeItem value="introduction">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Introduction</span>
              </div>
            </li>
            <li scTreeItem value="installation">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Installation</span>
              </div>
            </li>
            <li scTreeItem value="configuration">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Configuration</span>
              </div>
            </li>
          </ul>
        </li>
        <li scTreeItem value="components">
          <div scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <svg scTreeItemIcon siBookOpenIcon></svg>
            <span>Components</span>
          </div>
          <ul scTreeItemGroup>
            <li scTreeItem value="button">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Button</span>
              </div>
            </li>
            <li scTreeItem value="input">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Input</span>
              </div>
            </li>
            <li scTreeItem value="select">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Select</span>
              </div>
            </li>
          </ul>
        </li>
        <li scTreeItem value="api-reference">
          <div scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <svg scTreeItemIcon siSettingsIcon></svg>
            <span>API Reference</span>
          </div>
          <ul scTreeItemGroup>
            <li scTreeItem value="overview">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Overview</span>
              </div>
            </li>
            <li scTreeItem value="hooks">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Hooks</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div class="bg-muted rounded-md p-4 text-sm">
        Current page: {{ current()[0] ?? 'none' }}
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NavigationTreeDemo {
  readonly current = signal<string[]>(['installation']);
}
