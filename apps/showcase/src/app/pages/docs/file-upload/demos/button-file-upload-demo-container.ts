import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonFileUploadDemo } from './button-file-upload-demo';

@Component({
  selector: 'app-button-file-upload-demo-container',
  imports: [DemoContainer, ButtonFileUploadDemo],
  template: `
    <app-demo-container title="Button Trigger" [code]="code">
      <app-button-file-upload-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFileUploadDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScFileUpload,
  ScFileUploadTrigger,
  ScFileUploadList,
  ScFileUploadItem,
  ScFileUploadItemPreview,
  ScFileUploadItemName,
  ScFileUploadItemSize,
  ScFileUploadItemDelete,
  ScFileUploadFile,
} from '@semantic-components/ui';
import { SiFileIcon, SiUploadIcon, SiXIcon } from '@semantic-icons/lucide-icons';

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
    SiFileIcon,
    SiUploadIcon,
    SiXIcon,
  ],
  template: \`
    <div class="max-w-lg">
      <div scFileUpload [multiple]="true" [(files)]="files">
        <button scFileUploadTrigger>
          <svg siUploadIcon class="size-4"></svg>
          Upload Files
        </button>

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
export class ButtonFileUploadDemo {
  readonly files = signal<ScFileUploadFile[]>([]);
}`;
}
