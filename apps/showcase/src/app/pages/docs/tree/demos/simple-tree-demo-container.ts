import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SimpleTreeDemo } from './simple-tree-demo';

@Component({
  selector: 'app-simple-tree-demo-container',
  imports: [DemoContainer, SimpleTreeDemo],
  template: `
    <app-demo-container
      title="Simple"
      demoUrl="/demos/tree/simple-tree-demo"
      [code]="code"
    >
      <app-simple-tree-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SimpleTreeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-4">
      <ul
        scTree
        multi
        [(value)]="selected"
        aria-label="Produce"
        class="rounded-lg border p-4"
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
      <div class="bg-muted rounded-md p-4 text-sm">
        Selected: {{ selected().join(', ') || 'none' }}
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SimpleTreeDemo {
  readonly selected = signal<string[]>(['apple']);
}`;
}
