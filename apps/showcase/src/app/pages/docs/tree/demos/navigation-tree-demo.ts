import {
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
  template: `
    <div class="max-w-sm rounded-lg border p-4">
      <ul sc-tree #tree="scTree">
        <li
          sc-tree-item
          [parent]="tree.tree"
          value="getting-started"
          [expanded]="true"
        >
          <button sc-tree-item-trigger>
            <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
            <svg sc-tree-item-icon si-home-icon></svg>
            <span>Getting Started</span>
          </button>
          <ul sc-tree-item-group>
            <li sc-tree-item [parent]="tree.tree" value="introduction">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Introduction</span>
              </button>
            </li>
            <li sc-tree-item [parent]="tree.tree" value="installation">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Installation</span>
              </button>
            </li>
            <li sc-tree-item [parent]="tree.tree" value="configuration">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Configuration</span>
              </button>
            </li>
          </ul>
        </li>
        <li sc-tree-item [parent]="tree.tree" value="components">
          <button sc-tree-item-trigger>
            <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
            <svg sc-tree-item-icon si-book-open-icon></svg>
            <span>Components</span>
          </button>
          <ul sc-tree-item-group>
            <li sc-tree-item [parent]="tree.tree" value="button">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Button</span>
              </button>
            </li>
            <li sc-tree-item [parent]="tree.tree" value="input">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Input</span>
              </button>
            </li>
            <li sc-tree-item [parent]="tree.tree" value="select">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Select</span>
              </button>
            </li>
          </ul>
        </li>
        <li sc-tree-item [parent]="tree.tree" value="api-reference">
          <button sc-tree-item-trigger>
            <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
            <svg sc-tree-item-icon si-settings-icon></svg>
            <span>API Reference</span>
          </button>
          <ul sc-tree-item-group>
            <li sc-tree-item [parent]="tree.tree" value="overview">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Overview</span>
              </button>
            </li>
            <li sc-tree-item [parent]="tree.tree" value="hooks">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Hooks</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTreeDemo {}
