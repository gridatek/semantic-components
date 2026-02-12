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
} from '@semantic-components/ui-lab';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-simple-tree-demo',
  imports: [
    ScTree,
    ScTreeItem,
    ScTreeItemTrigger,
    ScTreeItemTriggerIcon,
    ScTreeItemGroup,
    SiChevronRightIcon,
  ],
  template: `
    <div class="max-w-sm rounded-lg border p-4">
      <ul sc-tree #tree="scTree">
        <li sc-tree-item [parent]="tree.tree" value="fruits" [expanded]="true">
          <button sc-tree-item-trigger>
            <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
            <span>Fruits</span>
          </button>
          <ul sc-tree-item-group>
            <li sc-tree-item [parent]="tree.tree" value="apple">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Apple</span>
              </button>
            </li>
            <li sc-tree-item [parent]="tree.tree" value="banana">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Banana</span>
              </button>
            </li>
            <li sc-tree-item [parent]="tree.tree" value="orange">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Orange</span>
              </button>
            </li>
          </ul>
        </li>
        <li sc-tree-item [parent]="tree.tree" value="vegetables">
          <button sc-tree-item-trigger>
            <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
            <span>Vegetables</span>
          </button>
          <ul sc-tree-item-group>
            <li sc-tree-item [parent]="tree.tree" value="carrot">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Carrot</span>
              </button>
            </li>
            <li sc-tree-item [parent]="tree.tree" value="broccoli">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <span>Broccoli</span>
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
export class SimpleTreeDemo {}
