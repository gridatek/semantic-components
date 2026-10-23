import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormFileUploadDemo } from './form-file-upload-demo';

@Component({
  selector: 'app-form-file-upload-demo-container',
  imports: [DemoContainer, FormFileUploadDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/file-upload/form-file-upload-demo"
    >
      <app-form-file-upload-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormFileUploadDemoContainer {
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
  ScFileUpload,
  ScFileUploadDropzone,
  ScFileUploadInput,
  ScFileUploadItem,
  ScFileUploadItemName,
  ScFileUploadItemPreview,
  ScFileUploadItemRemove,
  ScFileUploadItemSize,
  ScFileUploadList,
  ScFileUploadTrigger,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A [formField]: at least one file, and 5 MB in all, checked by the form’s schema; the errors shown once it is touched. */
@Component({
  selector: 'app-form-file-upload-demo',
  imports: [
    FormField,
    FormRoot,
    ScFileUpload,
    ScFileUploadInput,
    ScFileUploadTrigger,
    ScFileUploadDropzone,
    ScFileUploadList,
    ScFileUploadItem,
    ScFileUploadItemPreview,
    ScFileUploadItemName,
    ScFileUploadItemSize,
    ScFileUploadItemRemove,
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
          scFileUpload
          #upload="scFileUpload"
          multiple
          [formField]="applicationForm.documents"
        >
          <input scFileUploadInput />
          <div scFileUploadDropzone>
            <svg siUploadIcon></svg>
            <p>Your CV and cover letter</p>
            <button scFileUploadTrigger size="sm">Browse files</button>
          </div>
          <ul scFileUploadList aria-label="Chosen documents">
            @for (file of upload.value(); track file) {
              <li scFileUploadItem [file]="file">
                <span scFileUploadItemPreview><svg siFileIcon></svg></span>
                <span scFileUploadItemName>{{ file.name }}</span>
                <span scFileUploadItemSize></span>
                <button scFileUploadItemRemove>
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
export class FormFileUploadDemo {
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
