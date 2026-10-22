import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  form,
  maxLength,
  minLength,
} from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';
import {
  ScTagsInputNext,
  ScTagsInputNextControl,
  ScTagsInputNextItem,
  ScTagsInputNextItemRemove,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** A [formField]: one to five keywords, from the schema — its maxLength also stops a sixth going in; its errors once it is touched. */
@Component({
  selector: 'app-form-tags-input-next-demo',
  imports: [
    FormField,
    FormRoot,
    ScTagsInputNext,
    ScTagsInputNextControl,
    ScTagsInputNextItem,
    ScTagsInputNextItemRemove,
    ScButton,
    ScField,
    ScFieldErrors,
    ScLabel,
    SiXIcon,
  ],
  template: `
    <form [formRoot]="articleForm" class="grid w-full max-w-md gap-4">
      <div scField>
        <label scLabel>Keywords</label>
        <div scTagsInputNext [formField]="articleForm.keywords">
          @for (keyword of model().keywords; track $index) {
            <span scTagsInputNextItem>
              <span>{{ keyword }}</span>
              <button scTagsInputNextItemRemove>
                <svg siXIcon></svg>
                <span class="sr-only">Remove {{ keyword }}</span>
              </button>
            </span>
          }
          <input scTagsInputNextControl placeholder="Add a keyword" />
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-end">Publish</button>
      @if (published()) {
        <p class="bg-muted rounded-md p-4 text-sm" role="status">
          Published with {{ published() }}.
        </p>
      }
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTagsInputNextDemo {
  readonly model = signal({ keywords: [] as string[] });
  readonly published = signal('');
  readonly articleForm = form(
    this.model,
    (s) => {
      minLength(s.keywords, 1, { message: 'Add at least one keyword.' });
      maxLength(s.keywords, 5, { message: 'Five keywords at most.' });
    },
    {
      submission: {
        action: async () =>
          this.published.set(this.model().keywords.join(', ')),
      },
    },
  );
}
