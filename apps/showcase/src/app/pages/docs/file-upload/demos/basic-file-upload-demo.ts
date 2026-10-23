import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFileUpload,
  ScFileUploadDropzone,
  ScFileUploadInput,
  ScFileUploadItem,
  ScFileUploadItemName,
  ScFileUploadItemPreview,
  ScFileUploadItemRemove,
  ScFileUploadItemSize,
  ScFileUploadList,
  ScFileUploadTrigger,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Files dropped on the zone, or picked — a click on it, or its button by keyboard. They are only chosen: the value is a File[], yours to upload. */
@Component({
  selector: 'app-basic-file-upload-demo',
  imports: [
    ScFileUpload,
    ScFileUploadInput,
    ScFileUploadTrigger,
    ScFileUploadDropzone,
    ScFileUploadList,
    ScFileUploadItem,
    ScFileUploadItemPreview,
    ScFileUploadItemName,
    ScFileUploadItemSize,
    ScFileUploadItemRemove,
    SiUploadIcon,
    SiFileIcon,
    SiXIcon,
  ],
  template: `
    <div scFileUpload #upload="scFileUpload" multiple class="w-full max-w-md">
      <input scFileUploadInput />
      <div scFileUploadDropzone>
        <svg siUploadIcon></svg>
        <p>Drop files here</p>
        <button scFileUploadTrigger size="sm">Browse files</button>
      </div>
      <ul scFileUploadList aria-label="Chosen files">
        @for (file of upload.value(); track file) {
          <li scFileUploadItem [file]="file">
            <span scFileUploadItemPreview><svg siFileIcon></svg></span>
            <span scFileUploadItemName>{{ file.name }}</span>
            <span scFileUploadItemSize></span>
            <button scFileUploadItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ file.name }}</span>
            </button>
          </li>
        }
      </ul>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicFileUploadDemo {}
