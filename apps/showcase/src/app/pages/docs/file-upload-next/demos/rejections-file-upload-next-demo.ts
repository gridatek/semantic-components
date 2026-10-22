import { Component, ViewEncapsulation } from '@angular/core';
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

/** Images only, 1 MB at most, three at most: those that break a rule are kept out, and said — in your words — from rejections(). */
@Component({
  selector: 'app-rejections-file-upload-next-demo',
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
  template: `
    <div
      scFileUploadNext
      #upload="scFileUploadNext"
      multiple
      accept="image/*"
      [maxSize]="1000000"
      [maxFiles]="3"
      class="w-full max-w-md"
    >
      <input scFileUploadNextInput />
      <div scFileUploadNextDropzone>
        <svg siUploadIcon class="size-6"></svg>
        <p>Up to 3 images, 1 MB each</p>
        <button scFileUploadNextTrigger size="sm">Browse images</button>
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
      <ul scFileUploadNextList aria-label="Chosen images">
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
export class RejectionsFileUploadNextDemo {}
