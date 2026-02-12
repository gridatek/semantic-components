import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ImageFileUploadDemo } from './image-file-upload-demo';

@Component({
  selector: 'app-image-file-upload-demo-container',
  imports: [DemoContainer, ImageFileUploadDemo],
  template: `
    <app-demo-container title="Image Upload" [code]="code">
      <app-image-file-upload-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFileUploadDemoContainer {
  readonly code = `import {
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
  FileUploadFile,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-image-file-upload-demo',
  imports: [
    ScFileUpload,
    ScFileUploadDropzone,
    ScFileUploadList,
    ScFileUploadItem,
    ScFileUploadItemPreview,
    ScFileUploadItemName,
    ScFileUploadItemSize,
    ScFileUploadItemDelete,
  ],
  template: \`
    <div class="max-w-lg">
      <div
        sc-file-upload
        [multiple]="true"
        accept="image/*"
        [maxSize]="5242880"
        [(files)]="files"
        (error)="onError($event)"
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
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <div class="space-y-1">
              <p class="text-sm font-medium">Upload images</p>
              <p class="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        @if (files().length > 0) {
          <div sc-file-upload-list>
            @for (file of files(); track file.id) {
              <div sc-file-upload-item [file]="file">
                <div
                  sc-file-upload-item-preview
                  [file]="file"
                  class="size-12 rounded-md"
                ></div>
                <div class="flex-1 min-w-0">
                  <div sc-file-upload-item-name>{{ file.file.name }}</div>
                  <div sc-file-upload-item-size [file]="file"></div>
                </div>
                <button sc-file-upload-item-delete [fileId]="file.id"></button>
              </div>
            }
          </div>
        }
      </div>
      @if (errorMessage()) {
        <div class="mt-2 text-sm text-destructive">{{ errorMessage() }}</div>
      }
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFileUploadDemo {
  readonly files = signal<FileUploadFile[]>([]);
  readonly errorMessage = signal<string>('');

  onError(message: string): void {
    this.errorMessage.set(message);
    setTimeout(() => this.errorMessage.set(''), 3000);
  }
}`;
}
