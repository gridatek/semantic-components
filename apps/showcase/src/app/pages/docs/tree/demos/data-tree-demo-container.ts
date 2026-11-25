import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DataTreeDemo } from './data-tree-demo';

@Component({
  selector: 'app-data-tree-demo-container',
  imports: [DemoContainer, DataTreeDemo],
  template: `
    <app-demo-container
      title="Items as Data"
      demoUrl="/demos/tree/data-tree-demo"
      [code]="code"
    >
      <app-data-tree-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DataTreeDemoContainer {
  private readonly code = `import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  SiFolderOpenIcon,
} from '@semantic-icons/lucide-icons';

interface FileNode {
  path: string;
  name: string;
  children?: FileNode[];
}

const FILES: FileNode[] = [
  {
    path: 'app',
    name: 'app',
    children: [
      { path: 'app/layout.tsx', name: 'layout.tsx' },
      { path: 'app/page.tsx', name: 'page.tsx' },
      { path: 'app/globals.css', name: 'globals.css' },
    ],
  },
  {
    path: 'components',
    name: 'components',
    children: [
      {
        path: 'components/ui',
        name: 'ui',
        children: [
          { path: 'components/ui/button.tsx', name: 'button.tsx' },
          { path: 'components/ui/card.tsx', name: 'card.tsx' },
        ],
      },
      { path: 'components/header.tsx', name: 'header.tsx' },
    ],
  },
  { path: 'components.json', name: 'components.json' },
  { path: 'package.json', name: 'package.json' },
  { path: 'README.md', name: 'README.md' },
];

/** Items from data: one template of yours, stamped for each level (ngTemplateOutletInjector="outlet": the children find their parent). Files are selected; folders only open ([selectable]="false"). */
@Component({
  selector: 'app-data-tree-demo',
  imports: [
    NgTemplateOutlet,
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
    SiFolderOpenIcon,
  ],
  template: \`
    <div scFrame class="w-64 p-2">
      <ul
        scTree
        aria-label="Project files"
        [(expanded)]="expanded"
        [(value)]="selected"
      >
        <ng-container
          [ngTemplateOutlet]="branch"
          [ngTemplateOutletContext]="{ $implicit: files }"
          ngTemplateOutletInjector="outlet"
        />
      </ul>
    </div>

    <ng-template #branch let-nodes>
      @for (node of nodes; track node.path) {
        <li
          scTreeItem
          #item="scTreeItem"
          [value]="node.path"
          [selectable]="!node.children"
        >
          <div scTreeItemLabel>
            <span scTreeItemIndicator><svg siChevronRightIcon></svg></span>
            @if (node.children) {
              @if (item.expanded()) {
                <svg siFolderOpenIcon></svg>
              } @else {
                <svg siFolderIcon></svg>
              }
            } @else {
              <svg siFileIcon></svg>
            }
            {{ node.name }}
          </div>
          @if (node.children) {
            <ul scTreeGroup>
              <ng-template scTreeGroupContent>
                <ng-container
                  [ngTemplateOutlet]="branch"
                  [ngTemplateOutletContext]="{ $implicit: node.children }"
                  ngTemplateOutletInjector="outlet"
                />
              </ng-template>
            </ul>
          }
        </li>
      }
    </ng-template>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DataTreeDemo {
  private readonly files = FILES;
  private readonly expanded = signal(['app']);
  private readonly selected = signal(['app/page.tsx']);
}`;
}
