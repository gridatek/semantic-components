import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PageDropFileInputDemo } from './page-drop-file-input-demo';

@Component({
  selector: 'app-page-drop-file-input-demo-container',
  imports: [DemoContainer, PageDropFileInputDemo],
  template: `
    <app-demo-container
      title="Page-wide drop"
      [code]="code"
      demoUrl="/demos/file-input/page-drop-file-input-demo"
    >
      <app-page-drop-file-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PageDropFileInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputItemSize,
  ScFileInputList,
  ScFileInputTrigger,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** target="document": a drop anywhere on the page is taken — an overlay shows while files are dragged over it. */
@Component({
  selector: 'app-page-drop-file-input-demo',
  imports: [
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputItemSize,
    ScFileInputList,
    ScFileInputTrigger,
    SiFileIcon,
    SiUploadIcon,
    SiXIcon,
  ],
  template: \`
    <div scFileInput #files="scFileInput" multiple class="w-full max-w-md">
      <p class="text-muted-foreground text-sm">
        Drag files anywhere on this page, or
        <button scFileInputTrigger variant="link" size="sm" class="h-auto p-0">
          browse
        </button>
        .
      </p>
      <div
        scFileInputDropzone
        target="document"
        class="bg-background/90 pointer-events-none fixed inset-4 z-50 hidden rounded-2xl data-dragging:flex"
      >
        <svg siUploadIcon></svg>
        <p class="text-lg">Drop to attach</p>
      </div>
      <ul scFileInputList aria-label="Attachments">
        @for (file of files.value(); track file) {
          <li scFileInputItem [file]="file">
            <span scFileInputItemPreview><svg siFileIcon></svg></span>
            <span class="min-w-0 flex-1 truncate">{{ file.name }}</span>
            <span scFileInputItemSize></span>
            <button scFileInputItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ file.name }}</span>
            </button>
          </li>
        }
      </ul>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PageDropFileInputDemo {}`;
}
