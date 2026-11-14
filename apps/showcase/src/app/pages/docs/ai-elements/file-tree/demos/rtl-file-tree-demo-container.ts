import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlFileTreeDemo } from './rtl-file-tree-demo';

@Component({
  selector: 'app-rtl-file-tree-demo-container',
  imports: [DemoContainer, RtlFileTreeDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-file-tree-demo"
      [code]="code"
    >
      <app-rtl-file-tree-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlFileTreeDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
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

/** Right to left: indented from the right, the closed chevron pointing left. */
@Component({
  selector: 'app-rtl-file-tree-demo',
  imports: [
    Dir,
    ScButton,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronRightIcon,
    SiFileIcon,
    SiFolderIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full max-w-xs flex-col py-6 text-sm">
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
          المكوّنات
        </button>
        <div scCollapsiblePanel>
          <div class="ms-4 flex flex-col">
            <button
              scButton
              variant="ghost"
              size="sm"
              class="bg-accent text-accent-foreground w-full justify-start font-normal"
              aria-current="true"
            >
              <svg siFileIcon></svg>
              button.tsx
            </button>
            <button
              scButton
              variant="ghost"
              size="sm"
              class="w-full justify-start font-normal"
            >
              <svg siFileIcon></svg>
              login-form.tsx
            </button>
          </div>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlFileTreeDemo {}`;
}
