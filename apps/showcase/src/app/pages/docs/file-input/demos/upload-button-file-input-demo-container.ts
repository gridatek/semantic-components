import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UploadButtonFileInputDemo } from './upload-button-file-input-demo';

@Component({
  selector: 'app-upload-button-file-input-demo-container',
  imports: [DemoContainer, UploadButtonFileInputDemo],
  template: `
    <app-demo-container
      title="Upload button"
      [code]="code"
      demoUrl="/demos/file-input/upload-button-file-input-demo"
    >
      <app-upload-button-file-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class UploadButtonFileInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScFileInput, ScFileInputTrigger } from '@semantic-components/ui';
import { SiUploadIcon } from '@semantic-icons/lucide-icons';

/** Only a trigger — no dropzone, no list: one file, its name beside it. */
@Component({
  selector: 'app-upload-button-file-input-demo',
  imports: [ScFileInput, ScFileInputTrigger, SiUploadIcon],
  template: \`
    <div scFileInput #files="scFileInput" class="flex-row items-center">
      <button scFileInputTrigger>
        <svg siUploadIcon></svg>
        Upload resume
      </button>
      <span class="text-muted-foreground text-sm" data-testid="picked">
        {{ files.value()[0]?.name ?? 'No file chosen' }}
      </span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class UploadButtonFileInputDemo {}`;
}
