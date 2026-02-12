import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScFileUpload,
  ScFileUploadDropzone,
  ScFileUploadList,
  ScFileUploadItem,
  ScFileUploadItemPreview,
  ScFileUploadItemName,
  ScFileUploadItemSize,
  ScFileUploadItemDelete,
  ScFileUploadItemProgress,
  FileUploadFile,
} from '@semantic-components/ui-lab';

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
    ScFileUploadItemProgress,
  ],
  template: `
    <div class="max-w-lg">
      <div
        sc-file-upload
        [multiple]="true"
        [(files)]="files"
        (filesSelected)="simulateUpload($event)"
      >
        <div sc-file-upload-dropzone class="p-8">
          <div class="flex flex-col items-center gap-2 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-10 text-muted-foreground"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <div class="space-y-1">
              <p class="text-sm font-medium">Upload with progress</p>
              <p class="text-xs text-muted-foreground">
                Files will show upload progress
              </p>
            </div>
          </div>
        </div>

        @if (files().length > 0) {
          <div sc-file-upload-list>
            @for (file of files(); track file.id) {
              <div sc-file-upload-item [file]="file">
                <div sc-file-upload-item-preview [file]="file">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="size-5 text-muted-foreground"
                  >
                    <path
                      d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                    />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0 space-y-1">
                  <div class="flex items-center justify-between">
                    <div sc-file-upload-item-name>{{ file.file.name }}</div>
                    <div sc-file-upload-item-size [file]="file"></div>
                  </div>
                  @if (file.status === 'uploading') {
                    <div sc-file-upload-item-progress [file]="file"></div>
                  }
                  @if (file.status === 'complete') {
                    <p class="text-xs text-green-600">Upload complete</p>
                  }
                </div>
                <button sc-file-upload-item-delete [fileId]="file.id"></button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressFileUploadDemo {
  readonly files = signal<FileUploadFile[]>([]);

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
}
