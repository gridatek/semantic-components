import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
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
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Uploading is yours, and so is its progress — here, kept per File and shown with the lib’s progress bar. */
@Component({
  selector: 'app-progress-file-upload-demo',
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
    ScButton,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
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
            <div class="grid min-w-0 flex-1 gap-1.5">
              <span scFileUploadItemName>{{ file.name }}</span>
              @if (progress().get(file); as done) {
                <div
                  scProgress
                  [value]="done"
                  [attr.aria-label]="'Uploading ' + file.name"
                >
                  <div scProgressTrack><div scProgressRange></div></div>
                </div>
              }
            </div>
            <span scFileUploadItemSize></span>
            <button scFileUploadItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ file.name }}</span>
            </button>
          </li>
        }
      </ul>
      <button
        scButton
        class="self-end"
        [disabled]="!upload.value().length"
        (click)="send(upload.value())"
      >
        Upload
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ProgressFileUploadDemo {
  /** Each file's share sent, 0–100: yours, not the lib's. */
  readonly progress = signal(new Map<File, number>());

  /** A pretend upload: every file, a tenth more each 200 ms. */
  send(files: File[]): void {
    const timer = setInterval(() => {
      const next = new Map(this.progress());
      for (const file of files)
        next.set(file, Math.min(100, (next.get(file) ?? 0) + 10));
      this.progress.set(next);
      if (files.every((file) => next.get(file) === 100)) clearInterval(timer);
    }, 200);
  }
}
