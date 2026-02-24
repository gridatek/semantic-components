import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DropzoneFileUploadDemo } from './dropzone-file-upload-demo';

@Component({
  selector: 'app-dropzone-file-upload-demo-container',
  imports: [DemoContainer, DropzoneFileUploadDemo],
  template: `
    <app-demo-container title="Dropzone" [code]="code">
      <app-dropzone-file-upload-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzoneFileUploadDemoContainer {
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
  ScFileUploadFile,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-dropzone-file-upload-demo',
  imports: [
    ScFileUpload,
    ScFileUploadDropzone,
    ScFileUploadList,
    ScFileUploadItem,
    ScFileUploadItemPreview,
    ScFileUploadItemName,
    ScFileUploadItemSize,
    ScFileUploadItemDelete,
    SiFileIcon,
    SiUploadIcon,
    SiXIcon,
  ],
  template: \`
    <div class="max-w-lg">
      <div scFileUpload [multiple]="true" [(files)]="files">
        <div scFileUploadDropzone class="p-8">
          <div class="flex flex-col items-center gap-2 text-center">
            <svg siUploadIcon class="size-10 text-muted-foreground"></svg>
            <div class="space-y-1">
              <p class="text-sm font-medium">Drag and drop files here</p>
              <p class="text-xs text-muted-foreground">or click to browse</p>
            </div>
          </div>
        </div>

        @if (files().length > 0) {
          <div scFileUploadList>
            @for (file of files(); track file.id) {
              <div scFileUploadItem [file]="file">
                <div scFileUploadItemPreview [file]="file">
                  <svg siFileIcon class="size-5 text-muted-foreground"></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div scFileUploadItemName>{{ file.file.name }}</div>
                  <div scFileUploadItemSize [file]="file"></div>
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzoneFileUploadDemo {
  readonly files = signal<ScFileUploadFile[]>([]);
}`;
}
