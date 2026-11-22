import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputItemSize,
  ScFileInputList,
  ScFileInputTrigger,
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Uploading is yours, and so is its progress — here kept per File and shown with the progress bar. */
@Component({
  selector: 'app-uploading-file-input-demo',
  imports: [
    ScButton,
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputItemSize,
    ScFileInputList,
    ScFileInputTrigger,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
    SiFileIcon,
    SiUploadIcon,
    SiXIcon,
  ],
  template: `
    <div scFileInput #files="scFileInput" multiple class="w-full max-w-md">
      <div scFileInputDropzone>
        <svg siUploadIcon></svg>
        <p>Drop files here</p>
        <button scFileInputTrigger size="sm">Browse files</button>
      </div>
      <ul scFileInputList aria-label="Chosen files">
        @for (file of files.value(); track file) {
          <li scFileInputItem [file]="file">
            <span scFileInputItemPreview><svg siFileIcon></svg></span>
            <div class="grid min-w-0 flex-1 gap-1.5">
              <span class="truncate">{{ file.name }}</span>
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
            <span scFileInputItemSize></span>
            <button scFileInputItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ file.name }}</span>
            </button>
          </li>
        }
      </ul>
      <button
        scButton
        class="self-end"
        [disabled]="!files.value().length"
        (click)="send(files.value())"
      >
        Upload
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class UploadingFileInputDemo {
  /** Each file's share sent, 0–100: yours, not the library's. */
  private readonly progress = signal(new Map<File, number>());

  /** A pretend upload: every file, a tenth more each 200 ms. */
  private send(files: File[]): void {
    const timer = setInterval(() => {
      const next = new Map(this.progress());
      for (const file of files)
        next.set(file, Math.min(100, (next.get(file) ?? 0) + 10));
      this.progress.set(next);
      if (files.every((file) => next.get(file) === 100)) clearInterval(timer);
    }, 200);
  }
}
