import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SingleFileUploadDemo } from './single-file-upload-demo';

@Component({
  selector: 'app-single-file-upload-demo-container',
  imports: [DemoContainer, SingleFileUploadDemo],
  template: `
    <app-demo-container
      title="Single File"
      demoUrl="/demos/file-upload/single-file-upload-demo"
      [code]="code"
    >
      <app-single-file-upload-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFileUploadDemoContainer {
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
} from '@semantic-components/ui';
import { SiFileUpIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-single-file-upload-demo',
  imports: [
    ScFileUpload,
    ScFileUploadDropzone,
    ScFileUploadInput,
    SiFileUpIcon,
  ],
  template: \`
    <div class="max-w-lg">
      <div scFileUpload [(files)]="file">
        <div scFileUploadDropzone class="p-6">
          <input scFileUploadInput aria-label="Upload file" />
          <div class="flex flex-col items-center gap-2 text-center">
            <svg siFileUpIcon class="text-muted-foreground size-8"></svg>
            <p class="text-muted-foreground text-sm">
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFileUploadDemo {
  readonly file = signal<ScFileUploadFile[]>([]);
}`;
}
