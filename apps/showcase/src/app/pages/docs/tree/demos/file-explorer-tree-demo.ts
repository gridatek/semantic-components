import {
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
  ],
  template: `
    <div class="max-w-sm rounded-lg border p-4">
      <ul sc-tree #tree="scTree">
        <li sc-tree-item [parent]="tree.tree" value="src" [expanded]="true">
          <button sc-tree-item-trigger>
            <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
            <svg sc-tree-item-icon si-folder-icon class="text-blue-500"></svg>
            <span>src</span>
          </button>
          <ul sc-tree-item-group>
            <li sc-tree-item [parent]="tree.tree" value="app" [expanded]="true">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <svg
                  sc-tree-item-icon
                  si-folder-icon
                  class="text-blue-500"
                ></svg>
                <span>app</span>
              </button>
              <ul sc-tree-item-group>
                <li sc-tree-item [parent]="tree.tree" value="components">
                  <button sc-tree-item-trigger>
                    <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                    <svg
                      sc-tree-item-icon
                      si-folder-icon
                      class="text-blue-500"
                    ></svg>
                    <span>components</span>
                  </button>
                  <ul sc-tree-item-group>
                    <li sc-tree-item [parent]="tree.tree" value="button.ts">
                      <button sc-tree-item-trigger>
                        <svg
                          sc-tree-item-trigger-icon
                          si-chevron-right-icon
                        ></svg>
                        <svg
                          sc-tree-item-icon
                          si-file-icon
                          class="text-green-500"
                        ></svg>
                        <span>button.ts</span>
                      </button>
                    </li>
                    <li sc-tree-item [parent]="tree.tree" value="input.ts">
                      <button sc-tree-item-trigger>
                        <svg
                          sc-tree-item-trigger-icon
                          si-chevron-right-icon
                        ></svg>
                        <svg
                          sc-tree-item-icon
                          si-file-icon
                          class="text-green-500"
                        ></svg>
                        <span>input.ts</span>
                      </button>
                    </li>
                  </ul>
                </li>
                <li sc-tree-item [parent]="tree.tree" value="app.ts">
                  <button sc-tree-item-trigger>
                    <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                    <svg
                      sc-tree-item-icon
                      si-file-icon
                      class="text-green-500"
                    ></svg>
                    <span>app.ts</span>
                  </button>
                </li>
                <li sc-tree-item [parent]="tree.tree" value="app.routes.ts">
                  <button sc-tree-item-trigger>
                    <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                    <svg
                      sc-tree-item-icon
                      si-file-icon
                      class="text-green-500"
                    ></svg>
                    <span>app.routes.ts</span>
                  </button>
                </li>
              </ul>
            </li>
            <li sc-tree-item [parent]="tree.tree" value="assets">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <svg
                  sc-tree-item-icon
                  si-folder-icon
                  class="text-blue-500"
                ></svg>
                <span>assets</span>
              </button>
              <ul sc-tree-item-group>
                <li sc-tree-item [parent]="tree.tree" value="logo.png">
                  <button sc-tree-item-trigger>
                    <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                    <svg
                      sc-tree-item-icon
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-purple-500"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    <span>logo.png</span>
                  </button>
                </li>
              </ul>
            </li>
            <li sc-tree-item [parent]="tree.tree" value="main.ts">
              <button sc-tree-item-trigger>
                <svg sc-tree-item-trigger-icon si-chevron-right-icon></svg>
                <svg
                  sc-tree-item-icon
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-green-500"
                >
                  <path
                    d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                  />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                </svg>
                <span>main.ts</span>
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
export class FileExplorerTreeDemo {}
