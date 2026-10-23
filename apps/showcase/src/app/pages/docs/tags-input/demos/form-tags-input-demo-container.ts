import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormTagsInputDemo } from './form-tags-input-demo';

@Component({
  selector: 'app-form-tags-input-demo-container',
  imports: [DemoContainer, FormTagsInputDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/tags-input/form-tags-input-demo"
    >
      <app-form-tags-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTagsInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  form,
  maxLength,
  minLength,
} from '@angular/forms/signals';
import { ScButton, ScField, ScFieldErrors, ScLabel, ScTagsInput, ScTagsInputControl, ScTagsInputItem, ScTagsInputItemRemove } from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** A [formField]: one to five keywords, from the schema — its maxLength also stops a sixth going in; its errors once it is touched. */
@Component({
  selector: 'app-form-tags-input-demo',
  imports: [
    FormField,
    FormRoot,
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemRemove,
    ScButton,
    ScField,
    ScFieldErrors,
    ScLabel,
    SiXIcon,
  ],
  template: \`
    <form [formRoot]="articleForm" class="grid w-full max-w-md gap-4">
      <div scField>
        <label scLabel>Keywords</label>
        <div scTagsInput [formField]="articleForm.keywords">
          @for (keyword of model().keywords; track $index) {
            <span scTagsInputItem>
              <span>{{ keyword }}</span>
              <button scTagsInputItemRemove>
                <svg siXIcon></svg>
                <span class="sr-only">Remove {{ keyword }}</span>
              </button>
            </span>
          }
          <input scTagsInputControl placeholder="Add a keyword" />
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTagsInputDemo {
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
}`;
}
