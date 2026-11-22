import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ValidationFileInputDemo } from './validation-file-input-demo';

@Component({
  selector: 'app-validation-file-input-demo-container',
  imports: [DemoContainer, ValidationFileInputDemo],
  template: `
    <app-demo-container
      title="Validation"
      [code]="code"
      demoUrl="/demos/file-input/validation-file-input-demo"
    >
      <app-validation-file-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ValidationFileInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputItemSize,
  ScFileInputList,
  ScFileInputTrigger,
  type ScFileInputValidate,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** validate: your rule, a reason to keep a file out — here a file already chosen, in the list or in the same drop. */
@Component({
  selector: 'app-validation-file-input-demo',
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
      [validate]="noDuplicates"
      [(value)]="chosen"
      class="w-full max-w-md"
    >
      <div scFileInputDropzone>
        <svg siUploadIcon></svg>
        <p>Each file once</p>
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
export class ValidationFileInputDemo {
  private readonly chosen = signal<File[]>([]);
  private readonly noDuplicates: ScFileInputValidate = (file, { accepted }) =>
    [...this.chosen(), ...accepted].some((other) => other.name === file.name)
      ? 'duplicate'
      : null;

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
