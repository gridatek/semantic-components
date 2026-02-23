import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScFileUpload,
  ScFileUploadDropzone,
  ScFileUploadFile,
} from '@semantic-components/ui';
import { SiFileUpIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-single-file-upload-demo',
  imports: [ScFileUpload, ScFileUploadDropzone, SiFileUpIcon],
  template: `
    <div class="max-w-lg">
      <div scFileUpload [(files)]="file">
        <div scFileUploadDropzone class="p-6">
          <div class="flex flex-col items-center gap-2 text-center">
            <svg siFileUpIcon class="size-8 text-muted-foreground"></svg>
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
  readonly file = signal<ScFileUploadFile[]>([]);
}
