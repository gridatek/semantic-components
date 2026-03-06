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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzoneFileUploadDemoContainer {
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
  ScFileUploadItem,
  ScFileUploadItemDelete,
  ScFileUploadItemName,
  ScFileUploadItemPreview,
  ScFileUploadItemSize,
  ScFileUploadList,
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
            <svg siUploadIcon class="text-muted-foreground size-10"></svg>
            <div class="space-y-1">
              <p class="text-sm font-medium">Drag and drop files here</p>
              <p class="text-muted-foreground text-xs">or click to browse</p>
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
                <div class="min-w-0 flex-1">
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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzoneFileUploadDemo {
  readonly files = signal<ScFileUploadFile[]>([]);
}`;
}
