import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFileUploadNext,
  ScFileUploadNextInput,
  ScFileUploadNextItem,
  ScFileUploadNextItemName,
  ScFileUploadNextItemPreview,
  ScFileUploadNextItemRemove,
  ScFileUploadNextItemSize,
  ScFileUploadNextList,
  ScFileUploadNextTrigger,
} from '@semantic-components/ui';
import { SiFileIcon, SiImageIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** One image, from a button: without multiple, a new one replaces it. Images get a thumbnail. */
@Component({
  selector: 'app-single-file-upload-next-demo',
  imports: [
    ScFileUploadNext,
    ScFileUploadNextInput,
    ScFileUploadNextTrigger,
    ScFileUploadNextList,
    ScFileUploadNextItem,
    ScFileUploadNextItemPreview,
    ScFileUploadNextItemName,
    ScFileUploadNextItemSize,
    ScFileUploadNextItemRemove,
    SiImageIcon,
    SiFileIcon,
    SiXIcon,
  ],
  template: `
    <div
      scFileUploadNext
      #upload="scFileUploadNext"
      accept="image/*"
      class="w-full max-w-sm"
    >
      <input scFileUploadNextInput />
      <button scFileUploadNextTrigger class="self-start">
        <svg siImageIcon></svg>
        Choose a photo
      </button>
      <ul scFileUploadNextList aria-label="Chosen photo">
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SingleFileUploadNextDemo {}
