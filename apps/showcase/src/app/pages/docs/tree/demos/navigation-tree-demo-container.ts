import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NavigationTreeDemo } from './navigation-tree-demo';

@Component({
  selector: 'app-navigation-tree-demo-container',
  imports: [DemoContainer, NavigationTreeDemo],
  template: `
    <app-demo-container
      title="Navigation"
      demoUrl="/demos/tree/navigation-tree-demo"
      [code]="code"
    >
      <app-navigation-tree-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTreeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTree,
  ScTreeItem,
  ScTreeItemTrigger,
  ScTreeItemTriggerIcon,
  ScTreeItemGroup,
  ScTreeItemIcon,
} from '@semantic-components/ui-lab';
import {
  SiChevronRightIcon,
  SiHomeIcon,
  SiBookOpenIcon,
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
    SiHomeIcon,
    SiBookOpenIcon,
    SiSettingsIcon,
  ],
  template: \`
    <div class="max-w-sm rounded-lg border p-4">
      <ul scTree #tree="scTree">
        <li
          scTreeItem
          [parent]="tree.tree"
          value="getting-started"
          [expanded]="true"
        >
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
            <svg scTreeItemIcon si-home-icon></svg>
            <span>Getting Started</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem [parent]="tree.tree" value="introduction">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
                <span>Introduction</span>
              </button>
            </li>
            <li scTreeItem [parent]="tree.tree" value="installation">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
                <span>Installation</span>
              </button>
            </li>
            <li scTreeItem [parent]="tree.tree" value="configuration">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
                <span>Configuration</span>
              </button>
            </li>
          </ul>
        </li>
        <li scTreeItem [parent]="tree.tree" value="components">
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
            <svg scTreeItemIcon si-book-open-icon></svg>
            <span>Components</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem [parent]="tree.tree" value="button">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
                <span>Button</span>
              </button>
            </li>
            <li scTreeItem [parent]="tree.tree" value="input">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
                <span>Input</span>
              </button>
            </li>
            <li scTreeItem [parent]="tree.tree" value="select">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
                <span>Select</span>
              </button>
            </li>
          </ul>
        </li>
        <li scTreeItem [parent]="tree.tree" value="api-reference">
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
            <svg scTreeItemIcon si-settings-icon></svg>
            <span>API Reference</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem [parent]="tree.tree" value="overview">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
                <span>Overview</span>
              </button>
            </li>
            <li scTreeItem [parent]="tree.tree" value="hooks">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon si-chevron-right-icon></svg>
                <span>Hooks</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTreeDemo {}`;
}
