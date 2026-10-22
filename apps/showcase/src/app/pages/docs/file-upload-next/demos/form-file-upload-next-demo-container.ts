import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormFileUploadNextDemo } from './form-file-upload-next-demo';

@Component({
  selector: 'app-form-file-upload-next-demo-container',
  imports: [DemoContainer, FormFileUploadNextDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/file-upload-next/form-file-upload-next-demo"
    >
      <app-form-file-upload-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormFileUploadNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  form,
  minLength,
  validate,
} from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScFileUploadNext,
  ScFileUploadNextDropzone,
  ScFileUploadNextInput,
  ScFileUploadNextItem,
  ScFileUploadNextItemName,
  ScFileUploadNextItemPreview,
  ScFileUploadNextItemRemove,
  ScFileUploadNextItemSize,
  ScFileUploadNextList,
  ScFileUploadNextTrigger,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A [formField]: at least one file, and 5 MB in all, checked by the form’s schema; the errors shown once it is touched. */
@Component({
  selector: 'app-form-file-upload-next-demo',
  imports: [
    FormField,
    FormRoot,
    ScFileUploadNext,
    ScFileUploadNextInput,
    ScFileUploadNextTrigger,
    ScFileUploadNextDropzone,
    ScFileUploadNextList,
    ScFileUploadNextItem,
    ScFileUploadNextItemPreview,
    ScFileUploadNextItemName,
    ScFileUploadNextItemSize,
    ScFileUploadNextItemRemove,
    ScButton,
    ScField,
    ScFieldErrors,
    SiUploadIcon,
    SiFileIcon,
    SiXIcon,
  ],
  template: \`
    <form [formRoot]="applicationForm" class="grid w-full max-w-md gap-4">
      <div scField>
        <div
          scFileUploadNext
          #upload="scFileUploadNext"
          multiple
          [formField]="applicationForm.documents"
        >
          <input scFileUploadNextInput />
          <div scFileUploadNextDropzone>
            <svg siUploadIcon class="size-6"></svg>
            <p>Your CV and cover letter</p>
            <button scFileUploadNextTrigger size="sm">Browse files</button>
          </div>
          <ul scFileUploadNextList aria-label="Chosen documents">
            @for (file of upload.value(); track file) {
              <li scFileUploadNextItem [file]="file">
                <span scFileUploadNextItemPreview><svg siFileIcon></svg></span>
                <span scFileUploadNextItemName>{{ file.name }}</span>
                <span scFileUploadNextItemSize></span>
                <button scFileUploadNextItemRemove>
                  <svg siXIcon></svg>
                  <span class="sr-only">Remove {{ file.name }}</span>
                </button>
              </li>
            }
          </ul>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-end">
        Send application
      </button>
      @if (sent()) {
        <p class="bg-muted rounded-md p-4 text-sm" role="status">
          Sent: {{ sent() }}
        </p>
      }
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormFileUploadNextDemo {
  readonly model = signal({ documents: [] as File[] });
  readonly sent = signal('');
  readonly applicationForm = form(
    this.model,
    (s) => {
      minLength(s.documents, 1, { message: 'Add at least one document.' });
      validate(s.documents, ({ value }) =>
        value().reduce((total, file) => total + file.size, 0) > 5_000_000
          ? { kind: 'tooLarge', message: 'At most 5 MB in all.' }
          : null,
      );
    },
    {
      submission: {
        action: async () =>
          this.sent.set(
            this.model()
              .documents.map((file) => file.name)
              .join(', '),
          ),
      },
    },
  );
}`;
}
