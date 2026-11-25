import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScTree,
  ScTreeGroup,
  ScTreeGroupContent,
  ScTreeItem,
  ScTreeItemIndicator,
  ScTreeItemLabel,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiFileIcon,
  SiFolderIcon,
} from '@semantic-icons/lucide-icons';

/** Nested parts: a branch holds a group of items; every row its indicator, so the names line up. */
@Component({
  selector: 'app-tree-usage-demo',
  imports: [
    ScFrame,
    ScTree,
    ScTreeGroup,
    ScTreeGroupContent,
    ScTreeItem,
    ScTreeItemIndicator,
    ScTreeItemLabel,
    SiChevronRightIcon,
    SiFileIcon,
    SiFolderIcon,
  ],
  template: `
    <div scFrame class="w-64 p-2">
      <ul scTree aria-label="Project files">
        <li scTreeItem value="src">
          <div scTreeItemLabel>
            <span scTreeItemIndicator><svg siChevronRightIcon></svg></span>
            <svg siFolderIcon></svg>
            src
          </div>
          <ul scTreeGroup>
            <ng-template scTreeGroupContent>
              <li scTreeItem value="src/index.ts">
                <div scTreeItemLabel>
                  <span scTreeItemIndicator>
                    <svg siChevronRightIcon></svg>
                  </span>
                  <svg siFileIcon></svg>
                  index.ts
                </div>
              </li>
              <li scTreeItem value="src/utils.ts">
                <div scTreeItemLabel>
                  <span scTreeItemIndicator>
                    <svg siChevronRightIcon></svg>
                  </span>
                  <svg siFileIcon></svg>
                  utils.ts
                </div>
              </li>
            </ng-template>
          </ul>
        </li>
        <li scTreeItem value="package.json">
          <div scTreeItemLabel>
            <span scTreeItemIndicator><svg siChevronRightIcon></svg></span>
            <svg siFileIcon></svg>
            package.json
          </div>
        </li>
      </ul>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TreeUsageDemo {}
