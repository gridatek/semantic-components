import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScFileUpload,
  ScFileUploadFile,
  ScFileUploadInput,
  ScFileUploadItem,
  ScFileUploadItemDelete,
  ScFileUploadItemName,
  ScFileUploadItemPreview,
  ScFileUploadItemSize,
  ScFileUploadList,
  ScFileUploadTrigger,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-file-upload-demo',
  imports: [
    ScFileUpload,
    ScFileUploadTrigger,
    ScFileUploadList,
    ScFileUploadItem,
    ScFileUploadItemPreview,
    ScFileUploadItemName,
    ScFileUploadItemSize,
    ScFileUploadItemDelete,
    ScFileUploadInput,
    SiFileIcon,
    SiUploadIcon,
    SiXIcon,
  ],
  template: `
    <div class="max-w-lg">
      <div scFileUpload [multiple]="true" [(files)]="files">
        <button scFileUploadTrigger>
          <input scFileUploadInput aria-label="Upload files" />
          <svg siUploadIcon class="size-4"></svg>
          Upload Files
        </button>

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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFileUploadDemo {
  readonly files = signal<ScFileUploadFile[]>([]);
}
