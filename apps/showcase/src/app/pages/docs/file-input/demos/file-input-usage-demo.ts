import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputItemSize,
  ScFileInputList,
  ScFileInputStatus,
  ScFileInputTrigger,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Files dropped, pasted or picked: a dropzone with its trigger, the list (arrows between files, Delete removes one), what changed announced. */
@Component({
  selector: 'app-file-input-usage-demo',
  imports: [
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputItemSize,
    ScFileInputList,
    ScFileInputStatus,
    ScFileInputTrigger,
    SiFileIcon,
    SiUploadIcon,
    SiXIcon,
  ],
  template: `
    <div scFileInput #files="scFileInput" multiple class="w-full max-w-md">
      <div scFileInputDropzone>
        <svg siUploadIcon></svg>
        <p>Drop or paste files here</p>
        <button scFileInputTrigger size="sm">Browse files</button>
      </div>
      <ul scFileInputList aria-label="Chosen files">
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
      <div scFileInputStatus>
        @if (files.lastChange(); as change) {
          @for (file of change.added; track file) {
            {{ file.name }} added.
          }
          @for (file of change.removed; track file) {
            {{ file.name }} removed.
          }
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FileInputUsageDemo {}
