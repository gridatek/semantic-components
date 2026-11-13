import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { FileTreeUsageDemo } from './file-tree-usage-demo';

@Component({
  selector: 'app-file-tree-usage-demo-container',
  imports: [DemoContainer, FileTreeUsageDemo],
  template: `
    <app-demo-container
      title="File Tree"
      demoUrl="/demos/ai-elements/file-tree-usage-demo"
      [code]="code"
    >
      <app-file-tree-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FileTreeUsageDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiFileIcon,
  SiFolderIcon,
} from '@semantic-icons/lucide-icons';

/** A file the agent changed, or a folder of them. */
type FileNode =
  | { type: 'file'; name: string; path: string }
  | { type: 'folder'; name: string; path: string; children: FileNode[] };

/** The files the agent changed: folders open and close, a file is selected. */
@Component({
  selector: 'app-file-tree-usage-demo',
  imports: [
    NgTemplateOutlet,
    ScButton,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronRightIcon,
    SiFileIcon,
    SiFolderIcon,
  ],
  template: \`
    <div class="flex w-full max-w-xs flex-col py-6 text-sm">
      @for (node of files; track node.path) {
        <ng-container
          [ngTemplateOutlet]="tree"
          [ngTemplateOutletContext]="{ $implicit: node }"
        />
      }
    </div>

    <ng-template #tree let-node>
      @if (node.type === 'folder') {
        <div scCollapsible [open]="true">
          <button
            scButton
            scCollapsibleTrigger
            variant="ghost"
            size="sm"
            class="w-full justify-start font-normal"
          >
            <svg
              siChevronRightIcon
              class="transition-transform in-data-panel-open:rotate-90 rtl:-scale-x-100"
            ></svg>
            <svg siFolderIcon></svg>
            {{ node.name }}
          </button>
          <div scCollapsiblePanel>
            <div class="ms-4 flex flex-col">
              @for (child of node.children; track child.path) {
                <ng-container
                  [ngTemplateOutlet]="tree"
                  [ngTemplateOutletContext]="{ $implicit: child }"
                />
              }
            </div>
          </div>
        </div>
      } @else {
        <button
          scButton
          variant="ghost"
          size="sm"
          class="w-full justify-start font-normal"
          [class.bg-accent]="selected() === node.path"
          [class.text-accent-foreground]="selected() === node.path"
          [attr.aria-current]="selected() === node.path ? 'true' : null"
          (click)="selected.set(node.path)"
        >
          <svg siFileIcon></svg>
          {{ node.name }}
        </button>
      }
    </ng-template>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FileTreeUsageDemo {
  protected readonly selected = signal('components/ui/button.tsx');
  protected readonly files: FileNode[] = [
    {
      type: 'folder',
      name: 'app',
      path: 'app',
      children: [
        { type: 'file', name: 'layout.tsx', path: 'app/layout.tsx' },
        { type: 'file', name: 'page.tsx', path: 'app/page.tsx' },
      ],
    },
    {
      type: 'folder',
      name: 'components',
      path: 'components',
      children: [
        {
          type: 'folder',
          name: 'ui',
          path: 'components/ui',
          children: [
            {
              type: 'file',
              name: 'button.tsx',
              path: 'components/ui/button.tsx',
            },
          ],
        },
        {
          type: 'file',
          name: 'login-form.tsx',
          path: 'components/login-form.tsx',
        },
      ],
    },
  ];
}`;
}
