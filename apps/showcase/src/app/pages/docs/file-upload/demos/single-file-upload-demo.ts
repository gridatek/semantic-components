import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFileUpload,
  ScFileUploadInput,
  ScFileUploadItem,
  ScFileUploadItemName,
  ScFileUploadItemPreview,
  ScFileUploadItemRemove,
  ScFileUploadItemSize,
  ScFileUploadList,
  ScFileUploadTrigger,
} from '@semantic-components/ui';
import { SiFileIcon, SiImageIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** One image, from a button: without multiple, a new one replaces it. Images get a thumbnail. */
@Component({
  selector: 'app-single-file-upload-demo',
  imports: [
    ScFileUpload,
    ScFileUploadInput,
    ScFileUploadTrigger,
    ScFileUploadList,
    ScFileUploadItem,
    ScFileUploadItemPreview,
    ScFileUploadItemName,
    ScFileUploadItemSize,
    ScFileUploadItemRemove,
    SiImageIcon,
    SiFileIcon,
    SiXIcon,
  ],
  template: `
    <div
      scFileUpload
      #upload="scFileUpload"
      accept="image/*"
      class="w-full max-w-sm"
    >
      <input scFileUploadInput />
      <button scFileUploadTrigger class="self-start">
        <svg siImageIcon></svg>
        Choose a photo
      </button>
      <ul scFileUploadList aria-label="Chosen photo">
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
export class SingleFileUploadDemo {}
