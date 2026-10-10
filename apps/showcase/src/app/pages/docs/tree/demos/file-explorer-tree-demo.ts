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
  template: `
    <div class="max-w-sm rounded-lg border p-4">
      <ul scTree aria-label="Project files">
        <li scTreeItem value="src" [expanded]="true">
          <div scTreeItemTrigger>
            <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
            <svg scTreeItemIcon siFolderIcon class="text-blue-500"></svg>
            <span>src</span>
          </div>
          <ul scTreeItemGroup>
            <li scTreeItem value="app" [expanded]="true">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <svg scTreeItemIcon siFolderIcon class="text-blue-500"></svg>
                <span>app</span>
              </div>
              <ul scTreeItemGroup>
                <li scTreeItem value="components">
                  <div scTreeItemTrigger>
                    <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                    <svg
                      scTreeItemIcon
                      siFolderIcon
                      class="text-blue-500"
                    ></svg>
                    <span>components</span>
                  </div>
                  <ul scTreeItemGroup>
                    <li scTreeItem value="button.ts">
                      <div scTreeItemTrigger>
                        <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                        <svg
                          scTreeItemIcon
                          siFileIcon
                          class="text-green-500"
                        ></svg>
                        <span>button.ts</span>
                      </div>
                    </li>
                    <li scTreeItem value="input.ts">
                      <div scTreeItemTrigger>
                        <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                        <svg
                          scTreeItemIcon
                          siFileIcon
                          class="text-green-500"
                        ></svg>
                        <span>input.ts</span>
                      </div>
                    </li>
                  </ul>
                </li>
                <li scTreeItem value="app.ts">
                  <div scTreeItemTrigger>
                    <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                    <svg scTreeItemIcon siFileIcon class="text-green-500"></svg>
                    <span>app.ts</span>
                  </div>
                </li>
                <li scTreeItem value="app.routes.ts">
                  <div scTreeItemTrigger>
                    <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                    <svg scTreeItemIcon siFileIcon class="text-green-500"></svg>
                    <span>app.routes.ts</span>
                  </div>
                </li>
              </ul>
            </li>
            <li scTreeItem value="assets">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <svg scTreeItemIcon siFolderIcon class="text-blue-500"></svg>
                <span>assets</span>
              </div>
              <ul scTreeItemGroup>
                <li scTreeItem value="logo.png">
                  <div scTreeItemTrigger>
                    <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                    <svg
                      scTreeItemIcon
                      siImageIcon
                      class="text-purple-500"
                    ></svg>
                    <span>logo.png</span>
                  </div>
                </li>
              </ul>
            </li>
            <li scTreeItem value="main.ts">
              <div scTreeItemTrigger>
                <svg scTreeItemTriggerIcon siChevronRightIcon></svg>
                <svg scTreeItemIcon siFileIcon class="text-green-500"></svg>
                <span>main.ts</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FileExplorerTreeDemo {}
