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
  FileUploadFile,
} from '@semantic-components/ui-lab';

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
  ],
  template: \`
    <div class="max-w-lg">
      <div sc-file-upload [multiple]="true" [(files)]="files">
        <button sc-file-upload-trigger>
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
            class="size-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          Upload Files
        </button>

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
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFileUploadDemo {
  readonly files = signal<FileUploadFile[]>([]);
}`;
}
