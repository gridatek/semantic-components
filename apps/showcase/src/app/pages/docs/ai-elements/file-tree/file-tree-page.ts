import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { FileTreeUsageDemoContainer } from './demos/file-tree-usage-demo-container';
import { RtlFileTreeDemoContainer } from './demos/rtl-file-tree-demo-container';

/** shadcn's File Tree pattern: the files the agent changed, as folders. */
@Component({
  selector: 'app-file-tree-page',
  imports: [
    Anatomy,
    FileTreeUsageDemoContainer,
    RouterLink,
    RtlFileTreeDemoContainer,
    ScTypeset,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>File Tree</h1>
        <p class="text-muted-foreground">
          The files the agent changed, shown as folders you can open.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-file-tree-usage-demo-container />
        <p>
          A folder is a
          <a scLink routerLink="/docs/components/collapsible">Collapsible</a>
          on a ghost
          <a scLink routerLink="/docs/components/button">Button</a>; a file is a
          button, the selected one marked with
          <code scTypeset>aria-current</code>. For a single file the agent read
          or edited, use a
          <a scLink routerLink="/docs/ai-elements/tool">Tool</a> line instead. A
          tree to browse with the arrow keys is the
          <a scLink routerLink="/docs/components/tree">Tree</a>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The nodes render themselves: an
          <code scTypeset>ng-template</code>
          that outputs itself for a folder&apos;s children.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-rtl-file-tree-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          See the
          <a scLink routerLink="/docs/components/collapsible">Collapsible</a>
          and the <a scLink routerLink="/docs/components/button">Button</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FileTreePage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScCollapsible, ScCollapsibleTrigger, ScCollapsiblePanel, ScButton,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<ng-template #tree let-node>',
      "  @if (node.type === 'folder') {",
      '    <div scCollapsible [open]="true">',
      '      <button scButton scCollapsibleTrigger variant="ghost" size="sm">',
      '        <svg siChevronRightIcon class="in-data-panel-open:rotate-90"></svg>',
      '        <svg siFolderIcon></svg>',
      '        {{ node.name }}',
      '      </button>',
      '      <div scCollapsiblePanel>',
      '        <div class="ms-4 flex flex-col">',
      '          @for (child of node.children; track child.path) {',
      '            <ng-container [ngTemplateOutlet]="tree"',
      '              [ngTemplateOutletContext]="{ $implicit: child }" />',
      '          }',
      '        </div>',
      '      </div>',
      '    </div>',
      '  } @else {',
      '    <button scButton variant="ghost" size="sm" (click)="select(node.path)">',
      '      <svg siFileIcon></svg>',
      '      {{ node.name }}',
      '    </button>',
      '  }',
      '</ng-template>',
    ].join('\n'),
  };
}
