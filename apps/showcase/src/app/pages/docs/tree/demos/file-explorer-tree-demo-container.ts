import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FileExplorerTreeDemo } from './file-explorer-tree-demo';

@Component({
  selector: 'app-file-explorer-tree-demo-container',
  imports: [DemoContainer, FileExplorerTreeDemo],
  template: `
    <app-demo-container
      title="File Explorer"
      demoUrl="/demos/tree/file-explorer-tree-demo"
      [code]="code"
    >
      <app-file-explorer-tree-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerTreeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTree,
  ScTreeItem,
  ScTreeItemGroup,
  ScTreeItemIcon,
  ScTreeItemTrigger,
  ScTreeItemTriggerIcon,
} from '@semantic-components/ui-lab';
import {
  SiChevronRightIcon,
  SiFileIcon,
  SiFolderIcon,
  SiImageIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-file-explorer-tree-demo',
  imports: [
    ScTree,
    ScTreeItem,
    ScTreeItemTrigger,
    ScTreeItemTriggerIcon,
    ScTreeItemGroup,
    ScTreeItemIcon,
    SiChevronRightIcon,
    SiFolderIcon,
    SiFileIcon,
    SiImageIcon,
  ],
  template: \`
    <div class="max-w-sm rounded-lg border p-4">
      <ul scTree #tree="scTree">
        <li scTreeItem [parent]="tree.tree" value="src" [expanded]="true">
          <button scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <svg scTreeItemIcon siFolderIcon class="text-blue-500"></svg>
            <span>src</span>
          </button>
          <ul scTreeItemGroup>
            <li scTreeItem [parent]="tree.tree" value="app" [expanded]="true">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <svg scTreeItemIcon siFolderIcon class="text-blue-500"></svg>
                <span>app</span>
              </button>
              <ul scTreeItemGroup>
                <li scTreeItem [parent]="tree.tree" value="components">
                  <button scTreeItemTrigger>
                    <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                    <svg
                      scTreeItemIcon
                      siFolderIcon
                      class="text-blue-500"
                    ></svg>
                    <span>components</span>
                  </button>
                  <ul scTreeItemGroup>
                    <li scTreeItem [parent]="tree.tree" value="button.ts">
                      <button scTreeItemTrigger>
                        <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                        <svg
                          scTreeItemIcon
                          siFileIcon
                          class="text-green-500"
                        ></svg>
                        <span>button.ts</span>
                      </button>
                    </li>
                    <li scTreeItem [parent]="tree.tree" value="input.ts">
                      <button scTreeItemTrigger>
                        <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                        <svg
                          scTreeItemIcon
                          siFileIcon
                          class="text-green-500"
                        ></svg>
                        <span>input.ts</span>
                      </button>
                    </li>
                  </ul>
                </li>
                <li scTreeItem [parent]="tree.tree" value="app.ts">
                  <button scTreeItemTrigger>
                    <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                    <svg scTreeItemIcon siFileIcon class="text-green-500"></svg>
                    <span>app.ts</span>
                  </button>
                </li>
                <li scTreeItem [parent]="tree.tree" value="app.routes.ts">
                  <button scTreeItemTrigger>
                    <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                    <svg scTreeItemIcon siFileIcon class="text-green-500"></svg>
                    <span>app.routes.ts</span>
                  </button>
                </li>
              </ul>
            </li>
            <li scTreeItem [parent]="tree.tree" value="assets">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <svg scTreeItemIcon siFolderIcon class="text-blue-500"></svg>
                <span>assets</span>
              </button>
              <ul scTreeItemGroup>
                <li scTreeItem [parent]="tree.tree" value="logo.png">
                  <button scTreeItemTrigger>
                    <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                    <svg
                      scTreeItemIcon
                      siImageIcon
                      class="text-purple-500"
                    ></svg>
                    <span>logo.png</span>
                  </button>
                </li>
              </ul>
            </li>
            <li scTreeItem [parent]="tree.tree" value="main.ts">
              <button scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <svg scTreeItemIcon siFileIcon class="text-green-500"></svg>
                <span>main.ts</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileExplorerTreeDemo {}`;
}
