import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicFileUploadNextDemo } from './basic-file-upload-next-demo';

@Component({
  selector: 'app-basic-file-upload-next-demo-container',
  imports: [DemoContainer, BasicFileUploadNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/file-upload-next/basic-file-upload-next-demo"
    >
      <app-basic-file-upload-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicFileUploadNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFileUploadNext,
  ScFileUploadNextDropzone,
  ScFileUploadNextInput,
  ScFileUploadNextItem,
  ScFileUploadNextItemName,
  ScFileUploadNextItemPreview,
  ScFileUploadNextItemRemove,
  ScFileUploadNextItemSize,
  ScFileUploadNextList,
  ScFileUploadNextTrigger,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Files dropped on the zone, or picked — a click on it, or its button by keyboard. They are only chosen: the value is a File[], yours to upload. */
@Component({
  selector: 'app-basic-file-upload-next-demo',
  imports: [
    ScFileUploadNext,
    ScFileUploadNextInput,
    ScFileUploadNextTrigger,
    ScFileUploadNextDropzone,
    ScFileUploadNextList,
    ScFileUploadNextItem,
    ScFileUploadNextItemPreview,
    ScFileUploadNextItemName,
    ScFileUploadNextItemSize,
    ScFileUploadNextItemRemove,
    SiUploadIcon,
    SiFileIcon,
    SiXIcon,
  ],
  template: \`
    <div
      scFileUploadNext
      #upload="scFileUploadNext"
      multiple
      class="w-full max-w-md"
    >
      <input scFileUploadNextInput />
      <div scFileUploadNextDropzone>
        <svg siUploadIcon class="size-6"></svg>
        <p>Drop files here</p>
        <button scFileUploadNextTrigger size="sm">Browse files</button>
      </div>
      <ul scFileUploadNextList aria-label="Chosen files">
        @for (file of upload.value(); track file) {
          <li scFileUploadNextItem [file]="file">
            <span scFileUploadNextItemPreview><svg siFileIcon></svg></span>
            <span scFileUploadNextItemName>{{ file.name }}</span>
            <span scFileUploadNextItemSize></span>
            <button scFileUploadNextItemRemove>
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
export class BasicFileUploadNextDemo {}`;
}
