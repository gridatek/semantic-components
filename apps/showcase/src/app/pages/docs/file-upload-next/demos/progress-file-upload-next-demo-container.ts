import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ProgressFileUploadNextDemo } from './progress-file-upload-next-demo';

@Component({
  selector: 'app-progress-file-upload-next-demo-container',
  imports: [DemoContainer, ProgressFileUploadNextDemo],
  template: `
    <app-demo-container
      title="Upload progress"
      [code]="code"
      demoUrl="/demos/file-upload-next/progress-file-upload-next-demo"
    >
      <app-progress-file-upload-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ProgressFileUploadNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
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
  ScProgress,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Uploading is yours, and so is its progress — here, kept per File and shown with the lib’s progress bar. */
@Component({
  selector: 'app-progress-file-upload-next-demo',
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
    ScButton,
    ScProgress,
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
            <div class="grid min-w-0 flex-1 gap-1.5">
              <span scFileUploadNextItemName>{{ file.name }}</span>
              @if (progress().get(file); as done) {
                <div
                  scProgress
                  [value]="done"
                  [attr.aria-label]="'Uploading ' + file.name"
                ></div>
              }
            </div>
            <span scFileUploadNextItemSize></span>
            <button scFileUploadNextItemRemove>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ProgressFileUploadNextDemo {
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
}`;
}
