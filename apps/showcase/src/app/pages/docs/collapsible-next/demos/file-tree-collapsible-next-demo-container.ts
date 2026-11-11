import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FileTreeCollapsibleNextDemo } from './file-tree-collapsible-next-demo';

@Component({
  selector: 'app-file-tree-collapsible-next-demo-container',
  imports: [DemoContainer, FileTreeCollapsibleNextDemo],
  template: `
    <app-demo-container
      title="File tree"
      demoUrl="/demos/collapsible-next/file-tree-collapsible-next-demo"
      [code]="code"
    >
      <app-file-tree-collapsible-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FileTreeCollapsibleNextDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardHeader,
  ScCardTitle,
  ScCollapsibleNext,
  ScCollapsibleNextPanel,
  ScCollapsibleNextTrigger,
  ScLink,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiFileIcon,
  SiFolderIcon,
} from '@semantic-icons/lucide-icons';

/** A file, or a folder with its items. */
interface ScFileTreeItem {
  name: string;
  items?: ScFileTreeItem[];
}

/** Collapsibles in collapsibles: a folder each, its chevron turned when open. */
@Component({
  selector: 'app-file-tree-collapsible-next-demo',
  imports: [
    NgTemplateOutlet,
    ScButton,
    ScCard,
    ScCardContent,
    ScCardHeader,
    ScCardTitle,
    ScCollapsibleNext,
    ScCollapsibleNextPanel,
    ScCollapsibleNextTrigger,
    ScLink,
    SiChevronRightIcon,
    SiFileIcon,
    SiFolderIcon,
  ],
  template: \`
    <div scCard class="w-full max-w-64 gap-2">
      <div scCardHeader>
        <h3 scCardTitle>Explorer</h3>
      </div>
      <div scCardContent>
        <div class="flex flex-col gap-1">
          @for (item of tree; track item.name) {
            <ng-container
              [ngTemplateOutlet]="node"
              [ngTemplateOutletContext]="{ $implicit: item }"
            />
          }
        </div>
      </div>
    </div>
    <ng-template #node let-item>
      @if (item.items) {
        <div scCollapsibleNext>
          <button
            scButton
            scCollapsibleNextTrigger
            variant="ghost"
            size="sm"
            class="w-full justify-start"
          >
            <svg
              siChevronRightIcon
              class="transition-transform in-data-panel-open:rotate-90 rtl:-scale-x-100"
            ></svg>
            <svg siFolderIcon></svg>
            {{ item.name }}
          </button>
          <div scCollapsibleNextPanel class="ms-5 mt-1">
            <div class="flex flex-col gap-1">
              @for (child of item.items; track child.name) {
                <ng-container
                  [ngTemplateOutlet]="node"
                  [ngTemplateOutletContext]="{ $implicit: child }"
                />
              }
            </div>
          </div>
        </div>
      } @else {
        <a
          scLink
          href="#"
          size="sm"
          class="text-foreground w-full justify-start gap-2"
        >
          <svg siFileIcon></svg>
          <span>{{ item.name }}</span>
        </a>
      }
    </ng-template>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FileTreeCollapsibleNextDemo {
  protected readonly tree: ScFileTreeItem[] = [
    {
      name: 'components',
      items: [
        {
          name: 'ui',
          items: [
            { name: 'button.tsx' },
            { name: 'card.tsx' },
            { name: 'dialog.tsx' },
            { name: 'input.tsx' },
          ],
        },
        { name: 'login-form.tsx' },
        { name: 'register-form.tsx' },
      ],
    },
    { name: 'lib', items: [{ name: 'utils.ts' }, { name: 'cn.ts' }] },
    { name: 'hooks', items: [{ name: 'use-media-query.ts' }] },
    { name: 'app.tsx' },
    { name: 'package.json' },
    { name: 'README.md' },
  ];
}`;
}
