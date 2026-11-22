import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OneFileFileInputDemo } from './one-file-file-input-demo';

@Component({
  selector: 'app-one-file-file-input-demo-container',
  imports: [DemoContainer, OneFileFileInputDemo],
  template: `
    <app-demo-container
      title="One file"
      [code]="code"
      demoUrl="/demos/file-input/one-file-file-input-demo"
    >
      <app-one-file-file-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OneFileFileInputDemoContainer {
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
  SiFileTextIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Without multiple: one file — a new one replaces it; the trigger says so. */
@Component({
  selector: 'app-one-file-file-input-demo',
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
    SiFileTextIcon,
    SiXIcon,
  ],
  template: \`
    <div scFileInput #files="scFileInput" accept=".pdf" class="w-full max-w-md">
      <div scFileInputDropzone>
        <svg siFileTextIcon></svg>
        <p>One PDF</p>
        <button scFileInputTrigger size="sm">
          {{ files.value().length ? 'Replace the PDF' : 'Choose a PDF' }}
        </button>
      </div>
      <ul scFileInputList aria-label="Chosen file">
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
export class OneFileFileInputDemo {}`;
}
