import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CameraFileInputDemo } from './camera-file-input-demo';

@Component({
  selector: 'app-camera-file-input-demo-container',
  imports: [DemoContainer, CameraFileInputDemo],
  template: `
    <app-demo-container
      title="Camera"
      [code]="code"
      demoUrl="/demos/file-input/camera-file-input-demo"
    >
      <app-camera-file-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CameraFileInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFileInput,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputItemSize,
  ScFileInputList,
  ScFileInputTrigger,
} from '@semantic-components/ui';
import {
  SiCameraIcon,
  SiFileIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** capture="environment": on a phone, the back camera; on a computer, the usual picker. */
@Component({
  selector: 'app-camera-file-input-demo',
  imports: [
    ScFileInput,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputItemSize,
    ScFileInputList,
    ScFileInputTrigger,
    SiCameraIcon,
    SiFileIcon,
    SiXIcon,
  ],
  template: \`
    <div
      scFileInput
      #files="scFileInput"
      accept="image/*"
      capture="environment"
      class="w-full max-w-md"
    >
      <button scFileInputTrigger class="self-start">
        <svg siCameraIcon></svg>
        Take a photo
      </button>
      <ul scFileInputList aria-label="Photo">
        @for (file of files.value(); track file) {
          <li scFileInputItem [file]="file">
            <span scFileInputItemPreview><svg siFileIcon></svg></span>
            <span class="min-w-0 flex-1 truncate">{{ file.name }}</span>
            <span scFileInputItemSize></span>
            <button scFileInputItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ file.name }}</span>
            </button>
          </li>
        }
      </ul>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CameraFileInputDemo {}`;
}
