import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScFileUpload,
  ScFileUploadDropzone,
  FileUploadFile,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-single-file-upload-demo',
  imports: [ScFileUpload, ScFileUploadDropzone],
  template: `
    <div class="max-w-lg">
      <div sc-file-upload [(files)]="file">
        <div sc-file-upload-dropzone class="p-6">
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
              class="size-8 text-muted-foreground"
            >
              <path
                d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
              />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M12 12v6" />
              <path d="m15 15-3-3-3 3" />
            </svg>
            <p class="text-sm text-muted-foreground">
              {{
                file().length > 0
                  ? file()[0].file.name
                  : 'Click or drag to upload'
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFileUploadDemo {
  readonly file = signal<FileUploadFile[]>([]);
}
