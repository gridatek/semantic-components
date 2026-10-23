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

/** Images only, 1 MB at most, three at most: those that break a rule are kept out, and said — in your words — from rejections(). */
@Component({
  selector: 'app-rejections-file-upload-demo',
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
    <div
      scFileUpload
      #upload="scFileUpload"
      multiple
      accept="image/*"
      [maxSize]="1000000"
      [maxFiles]="3"
      class="w-full max-w-md"
    >
      <input scFileUploadInput />
      <div scFileUploadDropzone>
        <svg siUploadIcon></svg>
        <p>Up to 3 images, 1 MB each</p>
        <button scFileUploadTrigger size="sm">Browse images</button>
      </div>
      <ul class="text-destructive grid gap-1 text-sm" aria-live="polite">
        @for (rejection of upload.rejections(); track rejection.file) {
          <li>
            {{ rejection.file.name }}:
            @switch (rejection.reason) {
              @case ('type') {
                not an image.
              }
              @case ('size') {
                larger than 1 MB.
              }
              @case ('count') {
                three images at most.
              }
            }
          </li>
        }
      </ul>
      <ul scFileUploadList aria-label="Chosen images">
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
export class RejectionsFileUploadDemo {}
