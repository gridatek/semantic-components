import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScTreeNext,
  ScTreeNextGroup,
  ScTreeNextGroupContent,
  ScTreeNextItem,
  ScTreeNextItemIndicator,
  ScTreeNextItemLabel,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiFileIcon,
  SiFolderIcon,
} from '@semantic-icons/lucide-icons';

/** Nested parts: a branch holds a group of items; every row its indicator, so the names line up. */
@Component({
  selector: 'app-tree-next-usage-demo',
  imports: [
    ScFrame,
    ScTreeNext,
    ScTreeNextGroup,
    ScTreeNextGroupContent,
    ScTreeNextItem,
    ScTreeNextItemIndicator,
    ScTreeNextItemLabel,
    SiChevronRightIcon,
    SiFileIcon,
    SiFolderIcon,
  ],
  template: `
    <div scFrame class="w-64 p-2">
      <ul scTreeNext aria-label="Project files">
        <li scTreeNextItem value="src">
          <div scTreeNextItemLabel>
            <span scTreeNextItemIndicator><svg siChevronRightIcon></svg></span>
            <svg siFolderIcon></svg>
            src
          </div>
          <ul scTreeNextGroup>
            <ng-template scTreeNextGroupContent>
              <li scTreeNextItem value="src/index.ts">
                <div scTreeNextItemLabel>
                  <span scTreeNextItemIndicator>
                    <svg siChevronRightIcon></svg>
                  </span>
                  <svg siFileIcon></svg>
                  index.ts
                </div>
              </li>
              <li scTreeNextItem value="src/utils.ts">
                <div scTreeNextItemLabel>
                  <span scTreeNextItemIndicator>
                    <svg siChevronRightIcon></svg>
                  </span>
                  <svg siFileIcon></svg>
                  utils.ts
                </div>
              </li>
            </ng-template>
          </ul>
        </li>
        <li scTreeNextItem value="package.json">
          <div scTreeNextItemLabel>
            <span scTreeNextItemIndicator><svg siChevronRightIcon></svg></span>
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
export class TreeNextUsageDemo {}
