import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ProgressFileUploadDemo } from './progress-file-upload-demo';

@Component({
  selector: 'app-progress-file-upload-demo-container',
  imports: [DemoContainer, ProgressFileUploadDemo],
  template: `
    <app-demo-container
      title="With Progress"
      demoUrl="/demos/file-upload/progress-file-upload-demo"
      [code]="code"
    >
      <app-progress-file-upload-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressFileUploadDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScFileUpload,
  ScFileUploadDropzone,
  ScFileUploadFile,
  ScFileUploadInput,
  ScFileUploadItem,
  ScFileUploadItemDelete,
  ScFileUploadItemName,
  ScFileUploadItemPreview,
  ScFileUploadItemProgress,
  ScFileUploadItemSize,
  ScFileUploadList,
  ScProgress,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-progress-file-upload-demo',
  imports: [
    ScFileUpload,
    ScFileUploadDropzone,
    ScFileUploadList,
    ScFileUploadItem,
    ScFileUploadItemPreview,
    ScFileUploadItemName,
    ScFileUploadItemSize,
    ScFileUploadItemDelete,
    ScFileUploadInput,
    ScFileUploadItemProgress,
    ScProgress,
    SiFileIcon,
    SiUploadIcon,
    SiXIcon,
  ],
  template: \`
    <div class="max-w-lg">
      <div
        scFileUpload
        [multiple]="true"
        [(files)]="files"
        (filesSelected)="simulateUpload($event)"
      >
        <div scFileUploadDropzone class="p-8">
          <input scFileUploadInput aria-label="Upload files" />
          <div class="flex flex-col items-center gap-2 text-center">
            <svg siUploadIcon class="text-muted-foreground size-10"></svg>
            <div class="space-y-1">
              <p class="text-sm font-medium">Upload with progress</p>
              <p class="text-muted-foreground text-xs">
                Files will show upload progress
              </p>
            </div>
          </div>
        </div>

        @if (files().length > 0) {
          <div scFileUploadList>
            @for (file of files(); track file.id) {
              <div scFileUploadItem [file]="file">
                <div scFileUploadItemPreview [file]="file">
                  <svg siFileIcon class="text-muted-foreground size-5"></svg>
                </div>
                <div class="min-w-0 flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <div scFileUploadItemName>{{ file.file.name }}</div>
                    <div scFileUploadItemSize [file]="file"></div>
                  </div>
                  @if (file.status === 'uploading') {
                    <div scFileUploadItemProgress [file]="file">
                      <div
                        scProgress
                        [value]="file.progress ?? 0"
                        aria-label="Upload progress"
                      ></div>
                    </div>
                  }
                  @if (file.status === 'complete') {
                    <p class="text-xs text-green-600">Upload complete</p>
                  }
                </div>
                <button scFileUploadItemDelete [fileId]="file.id">
                  <svg siXIcon></svg>
                  <span class="sr-only">Remove file</span>
                </button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressFileUploadDemo {
  readonly files = signal<ScFileUploadFile[]>([]);

  simulateUpload(_selectedFiles: File[]): void {
    const currentFiles = this.files();
    const pendingFiles = currentFiles.filter((f) => f.status === 'pending');

    for (const file of pendingFiles) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          this.files.update((files) =>
            files.map((f) =>
              f.id === file.id
                ? { ...f, progress: 100, status: 'complete' as const }
                : f,
            ),
          );
        } else {
          this.files.update((files) =>
            files.map((f) =>
              f.id === file.id
                ? { ...f, progress, status: 'uploading' as const }
                : f,
            ),
          );
        }
      }, 200);
    }
  }
}`;
}
