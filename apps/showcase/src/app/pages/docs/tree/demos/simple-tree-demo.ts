import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScTree,
  ScTreeItem,
  ScTreeItemGroup,
  ScTreeItemTrigger,
  ScTreeItemTriggerIcon,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-simple-tree-demo',
  imports: [
    ScFrame,
    ScTree,
    ScTreeItem,
    ScTreeItemTrigger,
    ScTreeItemTriggerIcon,
    ScTreeItemGroup,
    SiChevronRightIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-4">
      <ul
        scTree
        multi
        [(value)]="selected"
        aria-label="Produce"
        scFrame
        class="p-4"
      >
        <li scTreeItem value="fruits" [expanded]="true">
          <div scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <span>Fruits</span>
          </div>
          <ul scTreeItemGroup>
            <li scTreeItem value="apple">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Apple</span>
              </div>
            </li>
            <li scTreeItem value="banana">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Banana</span>
              </div>
            </li>
            <li scTreeItem value="orange">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Orange</span>
              </div>
            </li>
          </ul>
        </li>
        <li scTreeItem value="vegetables">
          <div scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <span>Vegetables</span>
          </div>
          <ul scTreeItemGroup>
            <li scTreeItem value="carrot">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Carrot</span>
              </div>
            </li>
            <li scTreeItem value="broccoli">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Broccoli</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div scFrame class="bg-muted p-4 text-sm">
        Selected: {{ selected().join(', ') || 'none' }}
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SimpleTreeDemo {
  private readonly selected = signal<string[]>(['apple']);
}
