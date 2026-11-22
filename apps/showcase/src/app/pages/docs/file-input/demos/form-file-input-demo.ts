import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  ScFieldDescription,
  ScFieldErrors,
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputItemSize,
  ScFileInputList,
  ScFileInputTrigger,
  ScLabel,
} from '@semantic-components/ui';
import {
  SiFileIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A [formField]: at least one file (an empty list is not empty to required(), so minLength) and 10 MB in all, from the schema; the label opens the picker. */
@Component({
  selector: 'app-form-file-input-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputItemSize,
    ScFileInputList,
    ScFileInputTrigger,
    ScLabel,
    SiFileIcon,
    SiUploadIcon,
    SiXIcon,
  ],
  template: `
    <form [formRoot]="claimForm" class="grid w-full max-w-md gap-3">
      <div scField>
        <label scLabel>Proof of address</label>
        <div
          scFileInput
          #files="scFileInput"
          multiple
          accept="image/*, .pdf"
          [formField]="claimForm.proofs"
        >
          <div scFileInputDropzone>
            <svg siUploadIcon></svg>
            <p>Drop files here</p>
            <button scFileInputTrigger size="sm">Browse files</button>
          </div>
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
        <p scFieldDescription>A bill or a statement: images or PDFs.</p>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Send</button>
      @if (sent()) {
        <p class="text-sm" role="status">{{ sent() }}</p>
      }
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormFileInputDemo {
  private readonly model = signal<{ proofs: File[] }>({ proofs: [] });
  private readonly sent = signal('');
  private readonly claimForm = form(
    this.model,
    (s) => {
      minLength(s.proofs, 1, { message: 'Add a proof of address.' });
      validate(s.proofs, ({ value }) =>
        value().reduce((total, file) => total + file.size, 0) > 10_000_000
          ? { kind: 'total', message: 'At most 10 MB in all.' }
          : null,
      );
    },
    {
      submission: {
        action: async () =>
          this.sent.set(`Sent ${this.model().proofs.length} file(s).`),
      },
    },
  );
}
