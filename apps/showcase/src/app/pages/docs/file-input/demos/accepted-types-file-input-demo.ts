import { Component, ViewEncapsulation } from '@angular/core';
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
import { SiFileIcon, SiImageIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** accept: images and PDFs — a list, MIME types, wildcards or extensions. The others are kept out, said in rejections() with every reason. */
@Component({
  selector: 'app-accepted-types-file-input-demo',
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
    SiImageIcon,
    SiXIcon,
  ],
  template: `
    <div
      scFileInput
      #files="scFileInput"
      multiple
      [accept]="accept"
      class="w-full max-w-md"
    >
      <div scFileInputDropzone>
        <svg siImageIcon></svg>
        <p>Images or PDFs</p>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AcceptedTypesFileInputDemo {
  private readonly accept = ['image/*', '.pdf'];

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
}
