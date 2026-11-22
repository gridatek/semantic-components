import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitsFileInputDemo } from './limits-file-input-demo';

@Component({
  selector: 'app-limits-file-input-demo-container',
  imports: [DemoContainer, LimitsFileInputDemo],
  template: `
    <app-demo-container
      title="Limits"
      [code]="code"
      demoUrl="/demos/file-input/limits-file-input-demo"
    >
      <app-limits-file-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitsFileInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputItemSize,
  ScFileInputList,
  ScFileInputTrigger,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** maxFiles (3 in all), maxSize (5 MB), minSize (not empty): the first files that fit are taken, the rest kept out. */
@Component({
  selector: 'app-limits-file-input-demo',
  imports: [
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputItemSize,
    ScFileInputList,
    ScFileInputTrigger,
    SiFileIcon,
    SiUploadIcon,
    SiXIcon,
  ],
  template: \`
    <div
      scFileInput
      #files="scFileInput"
      multiple
      [maxFiles]="3"
      [minSize]="1"
      [maxSize]="5_000_000"
      class="w-full max-w-md"
    >
      <div scFileInputDropzone>
        <svg siUploadIcon></svg>
        <p>Up to 3 files, 5 MB each</p>
        <button scFileInputTrigger size="sm">Browse files</button>
      </div>
      @if (files.rejections().length) {
        <ul class="text-destructive grid gap-1 text-sm" data-testid="rejected">
          @for (rejection of files.rejections(); track rejection.file) {
            <li>{{ rejection.file.name }}: {{ why(rejection.reasons) }}</li>
          }
        </ul>
      }
      <ul scFileInputList aria-label="Chosen files">
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
export class LimitsFileInputDemo {
  /** Each reason, in your words. */
  private why(reasons: readonly string[]): string {
    const words: Record<string, string> = {
      'file-type': 'not an accepted type',
      'file-too-large': 'larger than 5 MB',
      'file-too-small': 'empty',
      'too-many-files': 'one file too many',
      duplicate: 'already chosen',
    };
    return reasons.map((reason) => words[reason] ?? reason).join(', ');
  }
}`;
}
