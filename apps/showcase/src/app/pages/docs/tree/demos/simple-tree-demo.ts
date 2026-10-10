import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTree,
  ScTreeItem,
  ScTreeItemGroup,
  ScTreeItemTrigger,
  ScTreeItemTriggerIcon,
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
      <ul scTree>
        <li scTreeItem value="fruits" [expanded]="true">
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <span>Fruits</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem value="apple">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Apple</span>
              </button>
            </li>
            <li scTreeItem value="banana">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Banana</span>
              </button>
            </li>
            <li scTreeItem value="orange">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Orange</span>
              </button>
            </li>
          </ul>
        </li>
        <li scTreeItem value="vegetables">
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <span>Vegetables</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem value="carrot">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Carrot</span>
              </button>
            </li>
            <li scTreeItem value="broccoli">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Broccoli</span>
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
export class SimpleTreeDemo {}
