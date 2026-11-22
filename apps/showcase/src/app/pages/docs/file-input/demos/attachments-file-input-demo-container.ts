import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AttachmentsFileInputDemo } from './attachments-file-input-demo';

@Component({
  selector: 'app-attachments-file-input-demo-container',
  imports: [DemoContainer, AttachmentsFileInputDemo],
  template: `
    <app-demo-container
      title="Attachments"
      [code]="code"
      demoUrl="/demos/file-input/attachments-file-input-demo"
    >
      <app-attachments-file-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AttachmentsFileInputDemoContainer {
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
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiPaperclipIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A message with attachments: the textarea is in the dropzone — files dropped or pasted into it are attached, text pasted stays text. */
@Component({
  selector: 'app-attachments-file-input-demo',
  imports: [
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputItemSize,
    ScFileInputList,
    ScFileInputTrigger,
    ScTextarea,
    SiFileIcon,
    SiPaperclipIcon,
    SiXIcon,
  ],
  template: \`
    <div scFileInput #files="scFileInput" multiple class="w-full max-w-md">
      <div
        scFileInputDropzone
        class="items-stretch gap-0 border border-solid p-0 text-start"
      >
        <textarea
          scTextarea
          aria-label="Message"
          placeholder="Write, or paste a screenshot…"
          class="border-0 shadow-none focus-visible:ring-0"
        ></textarea>
        <div class="flex justify-end p-1">
          <button scFileInputTrigger variant="ghost" size="icon-sm">
            <svg siPaperclipIcon></svg>
            <span class="sr-only">Attach files</span>
          </button>
        </div>
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
export class AttachmentsFileInputDemo {}`;
}
