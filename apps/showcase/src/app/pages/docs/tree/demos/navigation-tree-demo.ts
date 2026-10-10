import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTree,
  ScTreeItem,
  ScTreeItemGroup,
  ScTreeItemIcon,
  ScTreeItemTrigger,
  ScTreeItemTriggerIcon,
} from '@semantic-components/ui-lab';
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
    <div class="max-w-sm rounded-lg border p-4">
      <ul scTree>
        <li scTreeItem value="getting-started" [expanded]="true">
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <svg scTreeItemIcon siHouseIcon></svg>
            <span>Getting Started</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem value="introduction">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Introduction</span>
              </button>
            </li>
            <li scTreeItem value="installation">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Installation</span>
              </button>
            </li>
            <li scTreeItem value="configuration">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Configuration</span>
              </button>
            </li>
          </ul>
        </li>
        <li scTreeItem value="components">
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <svg scTreeItemIcon siBookOpenIcon></svg>
            <span>Components</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem value="button">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Button</span>
              </button>
            </li>
            <li scTreeItem value="input">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Input</span>
              </button>
            </li>
            <li scTreeItem value="select">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Select</span>
              </button>
            </li>
          </ul>
        </li>
        <li scTreeItem value="api-reference">
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <svg scTreeItemIcon siSettingsIcon></svg>
            <span>API Reference</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem value="overview">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Overview</span>
              </button>
            </li>
            <li scTreeItem value="hooks">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Hooks</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NavigationTreeDemo {}
