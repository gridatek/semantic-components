import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTreeDemoContainer {
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
    <div class="max-w-sm rounded-lg border p-4">
      <ul scTree #tree="scTree">
        <li scTreeItem [parent]="tree.tree" value="fruits" [expanded]="true">
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <span>Fruits</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem [parent]="tree.tree" value="apple">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Apple</span>
              </button>
            </li>
            <li scTreeItem [parent]="tree.tree" value="banana">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Banana</span>
              </button>
            </li>
            <li scTreeItem [parent]="tree.tree" value="orange">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Orange</span>
              </button>
            </li>
          </ul>
        </li>
        <li scTreeItem [parent]="tree.tree" value="vegetables">
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <span>Vegetables</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem [parent]="tree.tree" value="carrot">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Carrot</span>
              </button>
            </li>
            <li scTreeItem [parent]="tree.tree" value="broccoli">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <span>Broccoli</span>
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
export class SimpleTreeDemo {}`;
}
